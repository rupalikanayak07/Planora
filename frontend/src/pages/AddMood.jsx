import axios from 'axios';
import React, { useState } from 'react'

const AddMood = () => {

    const [mood, setMood] = useState("");
    const [note, setNote] = useState("");
    const [message, setMessage] = useState("");
    const [submittedMood, setSubmittedMood] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const res = await axios.post(
                "http://127.0.0.1:8000/api/mood/",
                { mood },
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                }
            );

            setMessage(res.data.message);
            setSubmittedMood(mood);
            setMood("");
            setNote("");

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-6">

            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

                {/* Title */}
                <h2 className="text-2xl font-semibold text-center text-purple-600 mb-6">
                    🌸 Track Your Mood
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit}>

                    {/* Mood Select */}
                    <label className="block mb-2 text-gray-600">
                        How are you feeling?
                    </label>

                    <select
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                        className="w-full p-3 rounded-lg border mb-4 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        required
                    >
                        <option value="">Select Mood</option>
                        <option value="happy">😄 Happy</option>
                        <option value="tired">😴 Tired</option>
                        <option value="stressed">😣 Stressed</option>
                        <option value="motivated">🔥 Motivated</option>
                    </select>

                    {/* Optional Note */}
                    <label className="block mb-2 text-gray-600">
                        Add a note (optional)
                    </label>

                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Write how your day feels..."
                        className="w-full p-3 rounded-lg border mb-4 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition"
                    >
                        Save Mood
                    </button>
                </form>

                {/* Result Section */}
                {submittedMood && (
                    <div className="mt-6 text-center">

                        <p className="text-gray-500">
                            Today you felt:
                        </p>

                        <p className="text-lg font-semibold text-purple-600 capitalize">
                            {submittedMood}
                        </p>

                        {/* Message */}
                        {message && (
                            <div className="mt-3 bg-purple-100 p-3 rounded-lg">
                                <p className="text-sm text-gray-700 italic">
                                    {message}
                                </p>
                            </div>
                        )}

                    </div>
                )}

            </div>
        </div>
    );
}
 

export default AddMood