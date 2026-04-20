import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const History = () => {
    const [history, setHistory] = useState([]);

    const fetchHistory = async () => {
        const token = localStorage.getItem("access");

        try {
            const res = await axios.get("http://127.0.0.1:8000/api/history/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setHistory(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fdfbff] via-[#f6f3ff] to-[#eef4ff] p-6">

            <div className="max-w-5xl mx-auto">

                {/* 🌸 HEADER */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        📜 Study History
                    </h1>
                    <p className="text-sm text-gray-400">
                        Your completed learning journey
                    </p>
                </div>

                {/* 🧾 HISTORY LIST */}
                <div className="space-y-5">

                    {history.length === 0 && (
                        <p className="text-gray-400 text-sm text-center mt-10">
                            No completed plans yet ✨
                        </p>
                    )}

                    {history.map((item, i) => {

                        const percent = Math.round(
                            (item.completed_hours / item.total_hours) * 100
                        );

                        return (
                            <div
                                key={i}
                                className="bg-white/80 backdrop-blur-xl 
                                border border-white/60 
                                rounded-3xl p-5 
                                shadow-md 
                                transition duration-300 
                                hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)]"
                            >

                                {/* TOP ROW */}
                                <div className="flex justify-between items-start">

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {item.subject}
                                        </h3>
                                        <p className="text-xs text-gray-400">
                                            {item.topic}
                                        </p>
                                    </div>

                                    {/* COMPLETED BADGE */}
                                    <span className="text-[11px] px-3 py-1 rounded-full 
                                        bg-green-50 text-green-600 border border-green-100">
                                        ✅ Completed
                                    </span>
                                </div>

                                {/* PROGRESS BAR */}
                                <div className="mt-4">
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-700"
                                            style={{ width: `${percent}%` }}
                                        />
                                    </div>

                                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                                        <span>{item.completed_hours}h done</span>
                                        <span>{percent}%</span>
                                    </div>
                                </div>

                                {/* DETAILS */}
                                <div className="mt-4 flex justify-between items-center">

                                    <p className="text-xs text-gray-400">
                                        ⏱ {item.total_hours} hrs total
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        📅 {new Date(item.completed_at).toLocaleDateString()}
                                    </p>
                                </div>

                            </div>
                        );
                    })}

                   
                </div>

                 <button className="px-6 py-2 mt-6 text-xs rounded-full bg-pink-50 text-pink-600 border border-pink-200 hover:bg-pink-100 transition">
                        <Link to='/dashboard'> Home</Link>
                    </button>
            </div>
        </div>
    );
};

export default History;