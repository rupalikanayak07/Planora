import axios from 'axios';
import React, { useState } from 'react'

const Moodpopup = ({onClose}) => {

    const [selectedMood, setSelectedMood] = useState(null);
    const [loading, setLoading] = useState(false);

    const moods = [
        { name: "happy", emoji: "😄", msg: "You're in a great space—keep it flowing ✨" },
        { name: "tired", emoji: "😴", msg: "Go gentle today. Small steps matter 💙" },
        { name: "stressed", emoji: "😣", msg: "Breathe. One thing at a time 🌿" },
        { name: "motivated", emoji: "🔥", msg: "Perfect time to push forward 🚀" },
    ];

    const handleSubmit = async () => {
        if (!selectedMood) return;

        setLoading(true);
        try {
            const token = localStorage.getItem("access");

            await axios.post(
                "http://127.0.0.1:8000/api/mood/",
                { mood: selectedMood },
                 {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            localStorage.setItem("moodDate", new Date().toDateString());
            onClose && onClose();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const current = moods.find((m) => m.name === selectedMood);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/*  Soft Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-pink-100 to-blue-100 opacity-70 blur-2xl" />

            {/*  Dim Overlay */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

            {/*  Main Card */}
            <div className="relative w-full max-w-md mx-4 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/30 shadow-2xl p-8 transition-all duration-300">

                {/*  Header */}
                <div className="text-center mb-7">
                    <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
                        How are you feeling today?
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        This helps personalize your study experience
                    </p>
                </div>

                {/*  Mood Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {moods.map((m) => (
                        <button
                            key={m.name}
                            onClick={() => setSelectedMood(m.name)}
                            className={`
                group relative flex flex-col items-center justify-center 
                p-5 rounded-2xl transition-all duration-300
                ${selectedMood === m.name
                                    ? "bg-white shadow-lg scale-[1.04] ring-2 ring-purple-300"
                                    : "bg-white/60 hover:bg-white hover:shadow-md"
                                }
              `}
                        >
                            <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                                {m.emoji}
                            </span>
                            <span className="mt-2 text-sm capitalize text-gray-700">
                                {m.name}
                            </span>
                        </button>
                    ))}
                </div>

                {/*  Message Preview */}
                <div className="h-16 mb-5 flex items-center justify-center">
                    {current ? (
                        <p className="text-sm text-gray-700 italic text-center transition-opacity duration-300">
                            {current.msg}
                        </p>
                    ) : (
                        <p className="text-sm text-gray-400 text-center">
                            Select a mood to see a message
                        </p>
                    )}
                </div>

                {/*  Action Button */}
                <button
                    onClick={handleSubmit}
                    disabled={!selectedMood || loading}
                    className={`
            w-full py-3 rounded-xl font-medium tracking-wide transition-all duration-300
            ${selectedMood
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:scale-[1.02] hover:shadow-lg"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }
          `}
                >
                    {loading ? "Saving..." : "Continue"}
                </button>

                {/*  Close (optional minimal) */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg"
                >
                    ✕
                </button>
            </div>
        </div>
    );

}

export default Moodpopup