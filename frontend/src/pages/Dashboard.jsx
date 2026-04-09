import React from 'react'

const Dashboard = () => {
    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-6">

                {/* Header */}
                <h1 className="text-2xl font-semibold mb-4">
                    Welcome back 
                </h1>

                {/* Grid */}
                <div className="grid grid-cols-2 gap-5">

                    <div className="bg-white p-5 rounded-2xl shadow">
                        <h2>Today's Plan</h2>
                        <p>DSA - Arrays</p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow">
                        <h2>Progress</h2>
                        <p>60%</p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow">
                        <h2>Study Time</h2>
                        <p>2 hrs</p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow">
                        <h2>Mood Suggestion</h2>
                        <p>Do light study</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard