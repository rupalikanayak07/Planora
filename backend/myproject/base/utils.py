import random
import datetime 
from datetime import date, timedelta
from .models import *

def get_mood_msg(mood):

    hour= datetime.datetime.now().hour

    messages = {
        "happy": [
            "You're doing amazing! Keep the momentum 🚀",
            "Great mood = great productivity 💯",
            "Use this energy to finish strong!"
        ],

        "tired": [
            "Take a short break, then try again 💆",
            "Even 30 mins of focus is progress 👍",
            "Rest a bit, then start small"
        ],

        "stressed": [
            "Don't overthink, just start with one topic 🌱",
            "Small steps reduce stress 💡",
            "Focus on progress, not perfection"
        ],

        "motivated": [
            "This is your moment! Push harder 🔥",
            "You're unstoppable today 💪",
            "Go beyond your limits 🚀"
        ]
    }    

    if mood =='tired'and hour>=23:
        return "It's late 😴 Proper rest will help you study better tomorrow"
    
    if mood =='motivated'and hour<10:
        return "It's late 😴 Proper rest will help you study better tomorrow"
    

    return random.choice(messages.get(mood, ["Keep going!"]))






def gen_recommendation(user):

    plans = StudyPlan.objects.filter(user=user)
    today = date.today()

    mood_obj = Mood.objects.filter(user=user).order_by('-id').first()
    mood = mood_obj.mood if mood_obj else "motivated"

    all_plans = []

    for plan in plans:

        sessions = StudySession.objects.filter(user=user, study_plan=plan)
        total_done = sum(s.hours_studied for s in sessions)

        progress = (total_done / plan.total_hour) * 100 if plan.total_hour > 0 else 0
        remaining_hours = plan.total_hour - total_done
        days_left = (plan.deadline - today).days

       
        #  HANDLE MISSED DEADLINE
        # -----------------------------
        is_missed = False

        if days_left <= 0 and progress < 100:
            is_missed = True
            days_left = 2  # recovery window

        if days_left <= 0:
            continue  # skip completed or invalid

       
        #  PRIORITY CALCULATION
        # -----------------------------
        priority = remaining_hours / days_left

        if progress < 50:
            priority += 2

        if days_left < 3:
            priority += 3

        if plan.difficulty == "hard":
            priority += 2
        elif plan.difficulty == "medium":
            priority += 1
        elif plan.difficulty == "easy":
            priority -= 1

        if is_missed:
            priority += 5  # highest boost

        
        #  DAILY HOURS
       
        hours = remaining_hours / days_left

       
        #  MESSAGE (MOOD BASED)
       
        message = "Stay consistent 💪"

        if is_missed:
            message = "Deadline missed! Let's recover fast 🚀"
        elif mood == "tired":
            hours *= 0.7
            message = "Take it light today 😌"
        elif mood == "stressed":
            hours *= 0.8
            message = "Focus calmly 🌿"
        elif mood == "motivated":
            hours *= 1.3
            message = "Push your limits 🚀"

       
        # REASONS
        # -----------------------------
        reasons = []

        if is_missed:
            reasons.append("Deadline missed")
            reasons.append("High priority recovery")

        if progress < 50:
            reasons.append("Low progress")

        if days_left < 3:
            reasons.append("Deadline is near")

        if plan.difficulty == "hard":
            reasons.append("High difficulty")

       
        #  ADD TO LIST
        # ---------------------------
        all_plans.append({
            "id": plan.id,
            "subject": plan.subject,
            "topic": plan.topic,
            "progress": round(progress, 1),
            "completed_hours": round(total_done, 2),
            "total_hours": plan.total_hour,
            "hours": round(hours, 1),
            "priority": priority,
            "message": message,
            "reasons": reasons
        })

    
    #  SORT BY PRIORITY
    # -----------------------------
    sorted_plans = sorted(all_plans, key=lambda x: x["priority"], reverse=True)

    return {
        "top": sorted_plans[0] if sorted_plans else None,
        "others": sorted_plans[1:]
    }