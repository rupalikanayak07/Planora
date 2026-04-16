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
            console.log("hello")
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

        <div className="min-h">


            {/* 💎 MAIN LUXURY CARD */}
            <div className="max-w-2xl mx-auto">

                <div className="bg-white backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8 transition hover:scale-[1.02] duration-300">

                    {/* HEADER */}
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                📚 Study Recommendation
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                AI-powered personalized plan
                            </p>
                        </div>

                        {/* STATUS BADGE */}
                        <span className="bg-red-100 text-red-600 px-3 py-1 text-xs rounded-full font-semibold">
                            ⚠ Recovery Mode
                        </span>
                    </div>

                    {/* SUBJECT */}
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800">
                            {recommendation.subject}
                        </h3>
                        <p className="text-gray-500">
                            {recommendation.topic}
                        </p>
                    </div>

                    {/* PROGRESS graph */}
                    <Progress progress={progress}/>


                    {/* HOURS */}
                    <div className="mt-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Recommended Study Time</p>
                            <p className="text-lg font-semibold text-gray-800">
                                ⏱ {recommendation.hours} hrs
                            </p>
                        </div>

                        {/* ICON CARD */}
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            📖
                        </div>
                    </div>

                    {/* MESSAGE */}
                    <div className="mt-6 bg-purple-50 border border-purple-100 p-4 rounded-2xl">
                        <p className="text-sm text-purple-700 italic">
                            {recommendation.message}
                        </p>
                    </div>

                    {/* REASONS */}
                    <div className="mt-6 flex flex-wrap gap-2">
                        {recommendation.reasons?.map((r, i) => {
                            let style =
                                "bg-gray-100 text-gray-600";

                            if (r.includes("Deadline missed")) {
                                style = "bg-red-100 text-red-600";
                            } else if (r.includes("Low progress")) {
                                style = "bg-blue-100 text-blue-600";
                            } else if (r.includes("High priority")) {
                                style = "bg-purple-100 text-purple-600";
                            }

                            return (
                                <span
                                    key={i}
                                    className={`px-3 py-1 text-xs rounded-full font-medium ${style}`}
                                >
                                    {r}
                                </span>
                            );
                        })}
                    </div>

                    {/* FOOTER */}
                    <div className="mt-8 flex justify-between items-center">
                        <p className="text-xs text-gray-400">
                            ✨ Generated based on your study behavior
                        </p>

                        <StartSession recommendation={recommendation} fetchdata={()=>{frecdata();
                            fetchprogress();
                        }} />
                    </div>

                </div>
            </div>



        </div>


    )
}

export default Recomendation