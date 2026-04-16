import React, { useEffect, useState } from 'react'
import Recomendation from '../components/Recomendation'
import Moodpopup from '../components/Moodpopup'


const Dashboard = () => {
    // mood popup

    const [showpopup, setshowpopup] = useState(false)

    useEffect(() => {
        const lastMoodDate = localStorage.getItem('moodDate')
        const today = new Date().toDateString()

        if (lastMoodDate !== today) {
            setshowpopup(true)
        }
    }, [])

    




    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-6">

            {/* mood pop up ui */}

            {
                showpopup && (
                    <Moodpopup onClose={() => setshowpopup(false)} />
                )
            }

            <Recomendation />


        </div>




    )
}

export default Dashboard