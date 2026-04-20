import React, { useEffect, useState } from 'react'
import Recomendation from '../components/Recomendation'
import Moodpopup from '../components/Moodpopup'
import AddStudyplan from '../components/AddStudyplan'
import Navbar from '../components/Navbar'


const Dashboard = () => {

    const [refreshNav, setRefreshNav] = useState(false);

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
        <div >

            {/* mood pop up ui */}

            {
                showpopup && (
                    <Moodpopup onClose={() => setshowpopup(false)} />
                )
            }

            <Navbar refreshTrigger={refreshNav}/>

            <Recomendation />

          
        </div>




    )
}

export default Dashboard