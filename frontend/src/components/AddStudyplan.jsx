import React from 'react'

const AddStudyplan = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-6">

            {/* 🌸 HEADER */}
            <div className="max-w-4xl mx-auto mb-6">
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/40">
                    <h1 className="text-2xl font-bold text-gray-800">
                        🌿 Study Tracker
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Track your daily focus & progress
                    </p>

                    <div className="mt-4 flex justify-between">
                        <div>
                            <p className="text-xs text-gray-400">Today</p>
                            <p className="text-lg font-semibold text-purple-600">
                                ⏱ 2.4 hrs
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-400">Sessions</p>
                            <p className="text-lg font-semibold text-pink-500">
                                🎯 3
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-400">Focus</p>
                            <p className="text-lg font-semibold text-blue-500">
                                ⚡ Good
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 💎 MAIN GRID */}
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">

                {/* ⏱ SESSION CARD */}
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/40 text-center">

                    <h2 className="text-lg font-semibold text-gray-700">
                        ⏱ Current Session
                    </h2>

                    <div className="text-4xl font-bold text-purple-600 mt-4">
                        00:45:12
                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                        Stay focused, you're doing great ✨
                    </p>

                    <button className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl shadow-md hover:scale-105 transition">
                        ▶ Start Session
                    </button>
                </div>

                {/* 📊 PROGRESS CARD */}
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/40">

                    <h2 className="text-lg font-semibold text-gray-700">
                        📊 Today's Progress
                    </h2>

                    <div className="mt-6">
                        <p className="text-sm text-gray-500">DBMS - Normalization</p>

                        <div className="w-full bg-gray-200 h-2 rounded mt-2">
                            <div className="bg-purple-500 h-2 rounded w-[60%]"></div>
                        </div>

                        <p className="text-xs mt-2 text-gray-500">
                            6 / 10 hrs completed
                        </p>
                    </div>
                </div>

                {/* 📅 SESSION HISTORY */}
                <div className="md:col-span-2 bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/40">

                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        📅 Session History
                    </h2>

                    <div className="space-y-3">

                        {/* ITEM */}
                        <div className="flex justify-between items-center bg-purple-50 p-3 rounded-xl">
                            <div>
                                <p className="text-sm font-medium text-gray-700">
                                    DBMS - Normalization
                                </p>
                                <p className="text-xs text-gray-400">
                                    Today • 10:30 AM
                                </p>
                            </div>

                            <span className="text-purple-600 font-semibold">
                                ⏱ 1.2 hrs
                            </span>
                        </div>

                        {/* ITEM */}
                        <div className="flex justify-between items-center bg-pink-50 p-3 rounded-xl">
                            <div>
                                <p className="text-sm font-medium text-gray-700">
                                    OS - Scheduling
                                </p>
                                <p className="text-xs text-gray-400">
                                    Today • 8:00 AM
                                </p>
                            </div>

                            <span className="text-pink-600 font-semibold">
                                ⏱ 0.8 hrs
                            </span>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );

}

export default AddStudyplan