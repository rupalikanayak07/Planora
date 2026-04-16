import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const Progress = () => {
    const [progress, setprogress] = useState([])
    const fdata = async (params) => {
        const token = localStorage.getItem("access");
        try {
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
        <div>

            {progress.map((item, index) => {

                const data = [
                    { name: "Completed", value: item.completed_hours },
                    { name: "Remaining", value: item.total_hours - item.completed_hours }
                ];

                //  Dynamic gradient feel
                const COLORS =
                    item.progress < 30
                        ? ["#F87171", "#f1f5f9"]   // red
                        : item.progress < 70
                            ? ["#FBBF24", "#F3F4F6"]   // yellow
                            : ["#34D399", "#F3F4F6"];  // green

                return (
                    <div
                        key={index}>
                        {/*  DONUT CHART */}
                        <div className="relative flex items-center justify-center" >

                            <PieChart width={200} height={200}>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={65}
                                    outerRadius={85}
                                    dataKey="value"
                                    paddingAngle={3}
                                >
                                    {data.map((entry, i) => (
                                        <Cell key={i} fill={COLORS[i]} />
                                    ))}
                                </Pie>
                            </PieChart>

                            {/*  CENTER TEXT */}
                            <div className="absolute flex flex-col items-center">
                                <span className="text-2xl font-bold text-gray-800">
                                    {item.progress}%
                                </span>
                                <span className="text-xs text-gray-500">
                                    completed
                                </span>
                            </div>

                        </div>

                        {/*  DETAILS */}
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">
                                ⏱ {item.completed_hours} / {item.total_hours} hrs
                            </p>
                        </div> 

                    </div>
                );
            })}

        </div>
    )
}

export default Progress