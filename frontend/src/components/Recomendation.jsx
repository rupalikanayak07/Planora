import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Progress from './Progress'
import StartSession from './StartSession'


const Recomendation = () => {
    const [recommendation, setrecomendation] = useState([])
    const [progress, setprogress] = useState([])

    const frecdata = async (params) => {
        const token = localStorage.getItem("access");
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/recommendation/',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            setrecomendation(res.data)
           
        } catch (error) {
            console.log(error)
        }
    }

    const fetchprogress = async (params) => {
        const token = localStorage.getItem("access");
        try {
            const progressRes = await axios.get('http://127.0.0.1:8000/api/progress/',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            setprogress(progressRes.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        frecdata()
        fetchprogress()
    }, [])


    return (

        <div className="min-h-screen bg-gradient-to-br from-[#fdfbff] via-[#f6f3ff] to-[#eef4ff] p-6">

            <div className="max-w-5xl mx-auto space-y-6">

                {/* 🌸 HEADER BAR */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">
                            📚 Your Study Plan
                        </h1>
                        <p className="text-sm text-gray-400">
                            Personalized insights for today
                        </p>
                    </div>

                    <span className="bg-red-50 text-red-500 px-4 py-1 rounded-full text-sm border border-red-200 shadow-sm">
                        ⚠ Recovery Mode
                    </span>
                </div>

                {/* 💎 TOP GRID */}
                <div className="grid md:grid-cols-3 gap-6">

                    {/* 📘 SUBJECT CARD */}
                    <div className="col-span-2 bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-md border border-white/50">
                        <h3 className="text-lg text-gray-500 mb-2">Focus Subject</h3>
                        <p className="text-2xl font-semibold text-gray-800">
                            {recommendation.subject}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                            {recommendation.topic}
                        </p>
                    </div>

                    {/* ⏱ HOURS CARD */}
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-3xl shadow-md border border-white/60 flex flex-col justify-center items-center text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                            Study Time
                        </p>
                        <p className="text-3xl font-bold text-gray-800 mt-2">
                            {recommendation.hours}h
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            Recommended today
                        </p>
                    </div>
                </div>

                {/* 📊 PROGRESS + MESSAGE */}
                <div className="grid md:grid-cols-2 gap-6">

                    {/* 📊 PROGRESS */}
                    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-md border border-white/50">
                        <h3 className="text-sm text-gray-500 mb-3">
                            📊 Progress Overview
                        </h3>

                        <Progress progress={progress} />
                    </div>

                    {/* 💬 MESSAGE */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-3xl border border-purple-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <h3 className="text-sm text-gray-500 mb-2">
                                💬 Insight
                            </h3>

                            <p className="text-purple-600 italic text-sm leading-relaxed">
                                {recommendation.message}
                            </p>

                            <StartSession
                                recommendation={recommendation}
                                fetchdata={() => {
                                    frecdata();
                                    fetchprogress();
                                }}
                            />

                        </div>

                        {/* REASONS */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {recommendation.reasons?.map((r, i) => {
                                let style = "bg-gray-100 text-gray-600";

                                if (r.includes("Deadline missed")) {
                                    style = "bg-red-50 text-red-500";
                                } else if (r.includes("Low progress")) {
                                    style = "bg-blue-50 text-blue-500";
                                } else if (r.includes("High priority")) {
                                    style = "bg-purple-50 text-purple-500";
                                }

                                return (
                                    <span
                                        key={i}
                                        className={`px-3 py-1 text-xs rounded-full border ${style}`}
                                    >
                                        {r}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* 🚀 ACTION BAR */}




            </div>
        </div>


    )
}

export default Recomendation