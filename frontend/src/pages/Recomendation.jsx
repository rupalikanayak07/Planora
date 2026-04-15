import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Recomendation = () => {
    const [recomendation, setrecomendation] = useState([])
    const [progress, setprogress] = useState([])

    const fdata = async (params) => {
        const token = localStorage.getItem("access");
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/recommendation/',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            setrecomendation(res.data)
            
            const progressRes = await axios.get('http://127.0.0.1:8000/api/progress/',
                 {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            setprogress(progressRes.data)
            
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fdata()
    }, [])

    return (
        <div>hyy

        </div>
    )
}

export default Recomendation