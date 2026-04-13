import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [recommendation, setrec] = useState(null)
    const [progress, setprogress] = useState([])
    const fdata = async () => {
        try {
            const token = localStorage.getItem("access");
            const suggestion = await axios.get('http://127.0.0.1:8000/api/recommendation/',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            setrec(suggestion.data)

            const prog = await axios.get('http://127.0.0.1:8000/api/progress/',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )

            setprogress(prog.data)

        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        fdata()
    }, [])

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-6">

                {/* 🔥 Recommendation Card */}
                {recommendation && (
                    <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
                        <h2 className="text-xl font-semibold text-purple-600 mb-2">
                            📚 Today's Focus
                        </h2>

                        <p className="text-lg font-medium">
                            {recommendation.subject} - {recommendation.topic}
                        </p>

                        <p className="text-sm text-gray-500">
                            Progress: {recommendation.progress}%
                        </p>

                        <p className="mt-2 text-purple-500 font-semibold">
                            ⏱ Study {recommendation.hours} hrs today
                        </p>

                        <p className="mt-2 text-gray-600 italic">
                            {recommendation.message}
                        </p>

                        {/* Reasons */}
                        <div className="mt-3">
                            {recommendation.reasons?.map((r, i) => (
                                <span key={i} className="text-xs bg-purple-100 text-purple-600 px-2 py-1 mr-2 rounded-full">
                                    {r}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* 📊 Progress Section */}
                <div className="grid md:grid-cols-2 gap-4">
                    {progress.map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-xl shadow">
                            <h3 className="font-semibold">{item.subject}</h3>
                            <p className="text-sm text-gray-500">{item.topic}</p>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-200 h-2 rounded mt-2">
                                <div
                                    className="bg-purple-500 h-2 rounded"
                                    style={{ width: `${item.progress}%` }}
                                ></div>
                            </div>

                            <p className="text-xs mt-1">{item.progress}% completed</p>
                        </div>
                    ))}
                </div>
            </div>




        </div>
    )
}

export default Dashboard