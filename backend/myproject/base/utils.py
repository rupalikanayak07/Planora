import random
import datetime 
from datetime import date
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

    best_plan = None
    highest_priority = 0
    final_data = {}

    for plan in plans:

        sessions = StudySession.objects.filter(user=user, study_plan=plan)

        total_done = sum(s.hours_studied for s in sessions)

        progress = (total_done / plan.total_hour) * 100 if plan.total_hour > 0 else 0

        days_left = (plan.deadline - today).days
        remaining_hours = plan.total_hour - total_done

        if days_left <= 0:
            continue

        #  BASE PRIORITY
        priority = remaining_hours / days_left

        #  ADD INTELLIGENCE
        if progress < 50:
            priority += 2

        if days_left < 3:
            priority += 3

        if plan.difficulty == "hard":
            priority += 2
        elif plan.difficulty == "easy":
            priority -= 1

        #  SELECT BEST PLAN
        if priority > highest_priority:
            highest_priority = priority

            hours = remaining_hours / days_left

            #  Mood adjustment
            message = "Stay consistent 💪"

            if mood == "tired":
                hours *= 0.7
                message = "Take it light today 😌"
            elif mood == "stressed":
                hours *= 0.8
                message = "Focus on one thing calmly 🌿"
            elif mood == "motivated":
                hours *= 1.3
                message = "Push your limits today 🚀"

            #  Reasons (VERY IMPRESSIVE)
            reasons = []

            if progress < 50:
                reasons.append("Low progress")

            if days_left < 3:
                reasons.append("Deadline is near")

            if plan.difficulty == "hard":
                reasons.append("High difficulty")

            best_plan = plan

            final_data = {
                "subject": plan.subject,
                "topic": plan.topic,
                "hours": round(hours, 1),
                "progress": round(progress, 1),
                "message": message,
                "reasons": reasons
            }

    return final_data