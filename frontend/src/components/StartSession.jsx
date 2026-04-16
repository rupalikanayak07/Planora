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
            setTimeout(() => {
                fetchdata();
            }, 500);

            setSeconds(0);
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
        <div className='flex flex-col gap-2 pt-2'>
            {!running ? (
                <button onClick={startStudy} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-xl text-sm shadow-lg hover:shadow-xl transition">
                    Start Session
                </button>
            ) : (<button onClick={stopStudy} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-xl text-sm shadow-lg hover:shadow-xl transition">
                Stop Session
            </button>)}


            <div className="text-3xl font-bold text-purple-600 mb-4">
                ⏱ {formatTime(seconds)}
            </div>

        </div>


    )
}

export default StartSession