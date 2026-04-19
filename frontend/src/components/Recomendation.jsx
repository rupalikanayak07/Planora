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

    // MATCH PROGRESS WITH PLAN
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

                {/*  EMPTY STATE */}
                {!topPlan && (
                    <div className="text-center mt-20 text-gray-400">
                        No study plans yet 📭
                    </div>
                )}


                {/*  TOP PLAN */}
                {topPlan && (
                    <div className="space-y-6">

                        {/*  HEADER */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                            <div>
                                <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
                                    📚 Your Study Plan
                                </h1>
                                <p className="text-xs sm:text-sm text-gray-400">
                                    Personalized insights for today
                                </p>
                            </div>

                            {topPlan.reasons?.includes("Deadline missed") && (
                                <span className="w-fit bg-red-50 text-red-500 px-3 py-1 rounded-full text-xs border border-red-200 shadow-sm">
                                    ⚠ Recovery Mode
                                </span>
                            )}
                        </div>

                        {/*  MAIN GRID */}
                        <div className="grid md:grid-cols-3 gap-6">

                            {/*  LEFT SECTION */}
                            <div className="md:col-span-2 space-y-5">

                                {/* SUBJECT + PROGRESS */}
                                <div className="bg-white/80 backdrop-blur-xl p-5 sm:p-6 rounded-3xl shadow-md border border-white/50">

                                    <div className="flex flex-col md:flex-row gap-5 justify-between">

                                        {/* SUBJECT */}
                                        <div>
                                            <h3 className="text-sm text-gray-500 mb-1">
                                                Focus Subject
                                            </h3>

                                            <p className="text-xl sm:text-2xl font-semibold text-gray-800">
                                                {topPlan.subject}
                                            </p>

                                            <p className="text-xs sm:text-sm text-gray-400 mt-1">
                                                {topPlan.topic}
                                            </
                                            p>
                                        </div>

                                        {/* PROGRESS */}
                                        <div className="w-full md:w-[45%] bg-white/70 p-4 rounded-2xl border border-white/60 shadow-sm">

                                            <h3 className="text-xs text-gray-500 mb-2">
                                                📊 Progress
                                            </h3>

                                            <Progress progress={topPlan ? [topPlan] : []} progressdata={progress} />
                                        </div>

                                    </div>
                                </div>

                                {/*  MESSAGE + REASONS */}
                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 sm:p-6 rounded-3xl border border-purple-100 shadow-sm space-y-4">

                                    <p className="text-purple-600 italic text-sm leading-relaxed">
                                        {topPlan.message}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {topPlan.reasons?.map((r, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 text-[11px] rounded-full border bg-white text-gray-600 shadow-sm"
                                            >
                                                {r}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            {/* 🎯 RIGHT SECTION */}
                            <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-3xl shadow-md border border-white/60 flex flex-col items-center justify-between text-center">

                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                                        Study Time
                                    </p>

                                    <p className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2">
                                        {topPlan.hours}h
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Recommended today
                                    </p>
                                </div>

                                {/* BUTTON */}
                                <div className="mt-6">
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

                    </div>
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

                            <div className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">

                                {otherPlans.map((plan) => {
                                    const p = getProgress(plan.id);
                                    const progressValue = p?.progress || 0;

                                    return (
                                        <div
                                            key={plan.id}
                                            className="min-w-[300px] max-w-[300px] snap-center 
        bg-white/80 backdrop-blur-xl 
        p-5 rounded-3xl 
        border border-white/60 
        shadow-md 
        transition duration-300 
        hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)] hover:-translate-y-1"
                                        >

                                            {/* TOP ROW */}
                                            <div className="flex justify-between items-start">

                                                <div>
                                                    <h3 className="text-[15px] font-semibold text-gray-800">
                                                        {plan.subject}
                                                    </h3>
                                                    <p className="text-[11px] text-gray-400">
                                                        {plan.topic}
                                                    </p>
                                                </div>

                                                {/* SMALL HOURS BADGE */}
                                                <span className="text-[11px] px-2 py-1 rounded-full bg-purple-50 text-purple-500 border border-purple-100">
                                                    {plan.hours}h
                                                </span>
                                            </div>

                                            {/*  PROGRESS BAR */}
                                            <div className="mt-4">
                                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-700"
                                                        style={{ width: `${progressValue}%` }}
                                                    />
                                                </div>

                                                <div className="flex justify-between mt-1 text-[10px] text-gray-400">
                                                    <span>Progress</span>
                                                    <span>{progressValue}%</span>
                                                </div>
                                            </div>

                                            {/*  MESSAGE */}
                                            <div className="mt-4 bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-2xl border border-purple-100">
                                                <p className="text-[11px] text-purple-600 italic leading-relaxed line-clamp-2">
                                                    {plan.message}
                                                </p>
                                            </div>

                                            {/*  REASONS */}
                                            <div className="mt-3 flex flex-wrap gap-1">
                                                {plan.reasons?.slice(0, 2).map((r, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-[10px] px-2 py-1 bg-white border text-gray-500 rounded-full shadow-sm"
                                                    >
                                                        {r}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* ACTION */}
                                            <div className="mt-4 flex justify-between items-center">

                                                <span className="text-[10px] text-gray-400">
                                                    Keep going 💪
                                                </span>

                                                <StartSession
                                                    recommendation={plan}
                                                    fetchdata={() => {
                                                        frecdata();
                                                        fetchprogress();
                                                    }}
                                                />
                                            </div>

                                        </div>
                                    );
                                })}

                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Recomendation