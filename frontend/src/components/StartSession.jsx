import axios from 'axios'
import React, { useEffect, useState } from 'react'

const StartSession = ({ recommendation, fetchdata }) => {
    const [seconds, setSeconds] = useState(0)
    const [running, setRunning] = useState(false)

    


    useEffect(() => {
        let interval;

        if (running) {
            interval = setInterval(() => {
                setSeconds(prev => prev + 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [running])

    const startStudy = () => {
        setSeconds(0)
        setRunning(true)
    }

    const stopStudy = async () => {
        setRunning(false)
        const finalSeconds = seconds;
        setSeconds(0);
        const hours = finalSeconds / 3600;

        try {
            const token = localStorage.getItem('access')
            await axios.post("http://127.0.0.1:8000/api/session/",
                {
                    study_plan: recommendation.id,
                    hours_studied: Number(hours.toFixed(2))
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            fetchdata()

        } catch (error) {
            console.log(error)
        }
    }

    const formatTime = (sec) => {
        const h = String(Math.floor(sec / 3600)).padStart(2, '0');
        const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
        const s = String(sec % 60).padStart(2, '0');

        return `${h}:${m}:${s}`;


    };

    return (


        <div className="bg-gradient-to-br from-white to-purple-50 border border-purple-100 rounded-3xl px-4 py-2 shadow-lg flex flex-col items-center gap-4 transition hover:shadow-xl">

            {/* 🌸 TITLE */}
            <p className="text-xs text-gray-400 uppercase tracking-widest">
                Study Session
            </p>

            {/* ⏱ TIMER */}
            <div className="relative flex items-center justify-center">

                {/* SOFT GLOW */}
                <div className="absolute w-28 h-28 bg-purple-200 rounded-full blur-2xl opacity-40"></div>

                {/* TIMER BOX */}
                <div className="relative bg-white px-6 py-4 rounded-2xl shadow-inner border border-gray-100">
                    <span className="text-3xl font-bold text-purple-700 tracking-widest">
                        {formatTime(seconds)}
                    </span>
                </div>
            </div>

            {/* 🔘 BUTTON */}
            {!running ? (
                <button
                    onClick={startStudy}
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold 
               bg-gradient-to-r from-purple-400 to-pink-400 text-white
               shadow-md hover:shadow-lg 
               hover:scale-[1.03] active:scale-95 
               transition duration-300 flex items-center justify-center gap-2"
                >
                    <span className="text-xs opacity-90">▶</span>
                    Start Focus
                </button>
            ) : (
                <button
                    onClick={stopStudy}
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold 
               bg-gradient-to-r from-rose-400 to-pink-400 text-white
               shadow-md hover:shadow-lg 
               hover:scale-[1.03] active:scale-95 
               transition duration-300 flex items-center justify-center gap-2"
                >
                    <span className="text-xs opacity-90">■</span>
                    End Session
                </button>
            )}

            {/* ✨ STATUS */}
            <p className="text-xs text-gray-400">
                {running ? "Session in progress..." : "Ready to start"}
            </p>

        </div>


    )
}

export default StartSession