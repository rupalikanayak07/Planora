import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Progress from './Progress'
import StartSession from './StartSession'

const Recomendation = () => {

    const [topPlan, setTopPlan] = useState(null)
    const [otherPlans, setOtherPlans] = useState([])
    const [progress, setprogress] = useState([])
    const [openId, setOpenId] = useState(null);

    //  FETCH RECOMMENDATION
    const frecdata = async () => {
        const token = localStorage.getItem("access");
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/recommendation/', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setTopPlan(res.data.top)
            setOtherPlans(res.data.others)
        } catch (error) {
            console.log(error)
        }
    }

    //  FETCH PROGRESS
    const fetchprogress = async () => {
        const token = localStorage.getItem("access");
        try {
            const progressRes = await axios.get('http://127.0.0.1:8000/api/progress/', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setprogress(Array.isArray(progressRes.data) ? progressRes.data : [])
        } catch (error) {
            console.log(error)
        }
    }

    //  MATCH PROGRESS WITH PLAN
    const getProgress = (planId) => {
        return progress.find(p => p.id === planId)
    }

    const topProgress = getProgress(topPlan?.id)

    useEffect(() => {
        frecdata()
        fetchprogress()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fdfbff] via-[#f6f3ff] to-[#eef4ff] p-6">

            <div className="max-w-5xl mx-auto space-y-8">

                {/* 🌸 EMPTY STATE */}
                {!topPlan && (
                    <div className="text-center mt-20 text-gray-400">
                        No study plans yet 📭
                    </div>
                )}

                {/* 🔥 TOP PLAN */}
                {topPlan && (
                    <>
                        {/* HEADER */}
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-800">
                                    📚 Your Study Plan
                                </h1>
                                <p className="text-sm text-gray-400">
                                    Personalized insights for today
                                </p>
                            </div>

                            {topPlan.reasons?.includes("Deadline missed") && (
                                <span className="bg-red-50 text-red-500 px-4 py-1 rounded-full text-sm border border-red-200 shadow-sm">
                                    ⚠ Recovery Mode
                                </span>
                            )}
                        </div>

                        {/* GRID */}
                        <div className="grid md:grid-cols-3 gap-6">

                            {/* SUBJECT */}
                            <div className="col-span-2 bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-md border border-white/50">
                                <h3 className="text-lg text-gray-500 mb-2">Focus Subject</h3>
                                <p className="text-2xl font-semibold text-gray-800">
                                    {topPlan.subject}
                                </p>
                                <p className="text-sm text-gray-400 mt-1">
                                    {topPlan.topic}
                                </p>
                            </div>

                            {/* HOURS + BUTTON */}
                            <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-3xl shadow-md border border-white/60 flex flex-col justify-center items-center text-center">

                                <p className="text-xs text-gray-500 uppercase tracking-wide">
                                    Study Time
                                </p>

                                <p className="text-3xl font-bold text-gray-800 mt-2">
                                    {topPlan.hours}h
                                </p>

                                <p className="text-xs text-gray-500 mt-1">
                                    Recommended today
                                </p>

                                <div className="mt-4">
                                    <StartSession
                                        recommendation={topPlan}
                                        fetchdata={() => {
                                            frecdata();
                                            fetchprogress();
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* PROGRESS + MESSAGE */}
                        <div className="grid md:grid-cols-2 gap-6">

                            {/* PROGRESS */}
                            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-md border border-white/50">
                                <h3 className="text-sm text-gray-500 mb-3">
                                    📊 Progress Overview
                                </h3>

                                <Progress progress={progress} />
                            </div>

                            {/* MESSAGE */}
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-3xl border border-purple-100 shadow-sm flex flex-col justify-between">

                                <div>
                                    <h3 className="text-sm text-gray-500 mb-2">
                                        💬 Insight
                                    </h3>

                                    <p className="text-purple-600 italic text-sm leading-relaxed">
                                        {topPlan.message}
                                    </p>
                                </div>

                                {/* REASONS */}
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {topPlan.reasons?.map((r, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 text-xs rounded-full border bg-gray-100 text-gray-600"
                                        >
                                            {r}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* 📌 OTHER PLANS */}
              {otherPlans.length > 0 && (
  <div className="max-w-5xl mx-auto mt-14">

    {/* HEADER */}
    <h2 className="text-xl font-semibold text-gray-800 mb-4">
      📌 Continue Your Plans
    </h2>

    {/* SCROLL CONTAINER */}
    <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">

      {otherPlans.map((plan) => {
        const p = getProgress(plan.id)
        const progressValue = p?.progress || 0

        return (
          <div
            key={plan.id}
            className="min-w-[280px] max-w-[280px] snap-center 
                       bg-white/80 backdrop-blur-xl 
                       p-5 rounded-3xl 
                       border border-white/60 
                       shadow-md 
                       transition hover:shadow-xl hover:scale-[1.02]"
          >

            {/* SUBJECT */}
            <div>
              <h3 className="text-md font-semibold text-gray-800">
                {plan.subject}
              </h3>
              <p className="text-xs text-gray-400">
                {plan.topic}
              </p>
            </div>

            {/* MINI PROGRESS */}
            <div className="mt-4">
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-700"
                  style={{ width: `${progressValue}%` }}
                ></div>
              </div>

              <p className="text-[11px] text-gray-400 mt-1">
                {progressValue}% completed
              </p>
            </div>

            {/* HOURS */}
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-400">Today</span>
              <span className="text-sm font-semibold text-purple-500">
                {plan.hours}h
              </span>
            </div>

            {/* MESSAGE */}
            <div className="mt-4 bg-purple-50 border border-purple-100 p-3 rounded-xl">
              <p className="text-xs text-purple-600 italic line-clamp-2">
                {plan.message}
              </p>
            </div>

            {/* REASONS */}
            <div className="mt-3 flex flex-wrap gap-1">
              {plan.reasons?.slice(0, 2).map((r, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-1 bg-gray-100 text-gray-500 rounded-full"
                >
                  {r}
                </span>
              ))}
            </div>

            {/* ACTION */}
            <div className="mt-5 flex justify-end">
              <StartSession
                recommendation={plan}
                fetchdata={() => {
                  frecdata()
                  fetchprogress()
                }}
              />
            </div>

          </div>
        )
      })}
    </div>
  </div>
)}
            </div>
        </div>
    )
}

export default Recomendation