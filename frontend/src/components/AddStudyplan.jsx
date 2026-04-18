import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddStudyplan = () => {

    const navigate=useNavigate()
    const [formdata, setformdata] = useState({
        subject: "",
        topic: "",
        total_hour: "",
        difficulty: "",
        deadline: "",
    })
    

    const handelinput = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value })
        
    }

    const handelDifficulty = (level) => {
        setformdata({ ...formdata, difficulty: level })
    }

    // calculate days left
    const getDaysLeft = () => {
        if (!formdata.deadline) return null;
        const today = new Date();
        const selected = new Date(formdata.deadline);

        const diff = Math.ceil((selected - today) / (1000 * 60 * 60 * 24));

        return diff;
    };

    const validateForm = () => {
        if (!formdata.subject) return "Subject required";
        if (!formdata.topic) return "Topic required";
        if (!formdata.total_hour) return "Hours required";
        if (!formdata.difficulty) return "Select difficulty";
        if (!formdata.deadline) return "Deadline required";

        return null;
    };
    const handelSubmit = async (e) => {
        e.preventDefault()
        const error = validateForm();
        if (error) {
            alert(error);
            return;
        }
        try {
            const token = localStorage.getItem("access")
            const res = await axios.post("http://127.0.0.1:8000/api/studyplan/",
                formdata,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

           navigate('/dashboard')
            setformdata({
                subject: "",
                topic: "",
                total_hour: "",
                difficulty: "",
                deadline: "",

            });


        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fdfbff] via-[#f6f3ff] to-[#eef4ff] py-10 px-4">

            <div className="max-w-3xl mx-auto">

                <form onSubmit={handelSubmit} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60 p-8 space-y-8">

                    {/* 🌸 HEADER */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            📚 Create Study Plan
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">
                            Design your learning journey beautifully
                        </p>
                    </div>

                    {/* 📘 SUBJECT + TOPIC */}
                    <div className="grid md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-xs text-gray-400 uppercase tracking-wide">Subject</label>
                            <input onChange={handelinput} name='subject' value={formdata.subject}
                                type="text"
                                placeholder="eg: DBMS"
                                className="w-full mt-2 px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 
                       focus:ring-2 focus:ring-purple-300 outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 uppercase tracking-wide">Topic</label>
                            <input onChange={handelinput} name='topic' value={formdata.topic}
                                type="text"
                                placeholder="eg: Normalization"
                                className="w-full mt-2 px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 
                       focus:ring-2 focus:ring-purple-300 outline-none transition"
                            />
                        </div>
                    </div>

                    {/* ⏱ HOURS */}
                    <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wide">Total Study Hours</label>
                        <input onChange={handelinput} name='total_hour' value={formdata.total_hour}
                            type="number"
                            placeholder="eg:10"
                            className="w-full mt-2 px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 
                     focus:ring-2 focus:ring-purple-300 outline-none transition"
                        />
                    </div>

                    {/*  DIFFICULTY (BEAUTIFUL OPTIONS) */}
                    <div>
                        <label className="text-xs text-gray-400 uppercase tracking-wide">Difficulty</label>

                        <div className="grid grid-cols-3 gap-4 mt-3">

                            {/* EASY */}
                            <div
                                onClick={() => handelDifficulty("easy")}
                                className={`cursor-pointer p-4 rounded-2xl border transition
                                 ${formdata.difficulty === "easy"
                                        ? "bg-green-100 border-green-400 ring-2 ring-green-300 scale-[1.02]"
                                        : "bg-green-50 border-green-200 hover:shadow-md"
                                    }`}
                            >
                                <p className="text-sm font-semibold text-green-600">Easy</p>
                                <p className="text-xs text-gray-400 mt-1">Light workload</p>

                                {formdata.difficulty === "easy" && (
                                    <span className="text-xs text-green-600 mt-2 block">✔ Selected</span>
                                )}
                            </div>

                            {/* MEDIUM */}
                            <div
                                onClick={() => handelDifficulty("medium")}
                                className={`cursor-pointer p-4 rounded-2xl border transition
                                ${formdata.difficulty === "medium"
                                        ? "bg-yellow-100 border-yellow-400 ring-2 ring-yellow-300 scale-[1.02]"
                                        : "bg-yellow-50 border-yellow-200 hover:shadow-md"
                                    }`}
                            >
                                <p className="text-sm font-semibold text-yellow-600">Medium</p>
                                <p className="text-xs text-gray-400 mt-1">Balanced effort</p>

                                {formdata.difficulty === "medium" && (
                                    <span className="text-xs text-yellow-600 mt-2 block">✔ Selected</span>
                                )}
                            </div>

                            {/* HARD */}
                            <div
                                onClick={() => handelDifficulty("hard")}
                                className={`cursor-pointer p-4 rounded-2xl border transition
                                    ${formdata.difficulty === "hard"
                                        ? "bg-red-100 border-red-400 ring-2 ring-red-300 scale-[1.02]"
                                        : "bg-red-50 border-red-200 hover:shadow-md"
                                    }`}
                            >
                                <p className="text-sm font-semibold text-red-600">Hard</p>
                                <p className="text-xs text-gray-400 mt-1">High focus needed</p>

                                {formdata.difficulty === "hard" && (
                                    <span className="text-xs text-red-600 mt-2 block">✔ Selected</span>
                                )}
                            </div>

                        </div>
                    </div>

                    {/* 📅 DEADLINE */}
                    <div name='deadline'>
                        <label className="text-xs text-gray-400 uppercase tracking-wide">Deadline</label>
                        <input onChange={handelinput} name='deadline' value={formdata.deadline}
                            type="date"
                            className="w-full mt-2 px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 
                     focus:ring-2 focus:ring-purple-300 outline-none transition"
                        />
                        {formdata.deadline && (
                            <p className="text-xs text-purple-500 mt-1">
                                ⏳ {getDaysLeft()} days left
                            </p>
                        )}
                    </div>


                    {/* 🚀 BUTTON */}
                    <div className="flex justify-end pt-4">
                        <button className="px-6 py-2.5 rounded-xl text-sm font-semibold 
                           bg-gradient-to-r from-purple-400 to-pink-400 text-white
                           shadow-md hover:shadow-lg hover:scale-[1.03] 
                           active:scale-95 transition duration-300">
                            Save Plan
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );

}

export default AddStudyplan