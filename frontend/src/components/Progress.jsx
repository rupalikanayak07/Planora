import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const Progress = ({ progress = [] }) => {

    if (!Array.isArray(progress) || progress.length === 0) {
        return <p className="text-xs text-gray-400">No progress yet</p>;
    }


    return (
        <div className="flex justify-center ">

            {progress.map((item) => {

                const completed = item.completed_hours ?? 0;
                const total = item.total_hours ?? 1;
                const percent = item.progress ?? 0;

                const data = [
                    { name: "Completed", value: percent },
                    { name: "Remaining", value: 100 - percent }
                ];

                //  Color based on progress
                const gradientId = `grad-${item.id}`;

                return (
                    <div key={item.id}  className="relative flex flex-col items-center ">

                        <PieChart width={150} height={150}>

                            {/*  Gradient Definition */}
                            <defs>
                                <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                                    {percent < 30 ? (
                                        <>
                                            <stop offset="0%" stopColor="#f87171" />
                                            <stop offset="100%" stopColor="#fb7185" />
                                        </>
                                    ) : percent < 70 ? (
                                        <>
                                            <stop offset="0%" stopColor="#facc15" />
                                            <stop offset="100%" stopColor="#f59e0b" />
                                        </>
                                    ) : (
                                        <>
                                            <stop offset="0%" stopColor="#34d399" />
                                            <stop offset="100%" stopColor="#10b981" />
                                        </>
                                    )}
                                </linearGradient>
                            </defs>

                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={58}
                                outerRadius={72}
                                dataKey="value"
                                startAngle={90}
                                endAngle={-270}
                                cornerRadius={18}
                            >
                                {/*  Gradient progress */}
                                <Cell fill={`url(#${gradientId})`} />
                                <Cell fill="#f1f5f9" />
                            </Pie>
                        </PieChart>

                        {/*  Center Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xl font-semibold text-gray-800">
                                {percent}%
                            </span>
                            <span className="text-[11px] text-gray-400">
                                completed
                            </span>
                        </div>

                        {/*  Info */}
                        <p className="text-xs text-gray-400 mt-2">
                            {completed} / {total} hrs
                        </p>

                    </div>
                );
            })}

        </div>
    )
}

export default Progress