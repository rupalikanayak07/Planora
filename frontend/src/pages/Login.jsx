import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formdata, setformdata] = useState({
        username: '',
        password: ''
    })
    const navigate= useNavigate()
    const handelinput = (e) => {
        const { name, value } = e.target
        setformdata({ ...formdata, [name]: value })
       

    }

    const handelsubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("http://127.0.0.1:8000/api/login/", formdata)
            localStorage.setItem("access", data.access)
            localStorage.setItem("refresh", data.refresh)
           
            
            setformdata({
                username: "",
                password: ''
            })
            navigate('/dashboard')
        } catch (error) {
            console.log(error)
        }


    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">

            {/* Card */}
            <div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-[360px]">

                {/* Title */}
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-2">
                    Welcome Back
                </h2>
                <p className="text-sm text-center text-gray-500 mb-6">
                    Login to continue your study journey
                </p>

                {/* Form */}
                <form className="space-y-4" onSubmit={handelsubmit}>

                    {/* username */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Username
                        </label>
                        <input onChange={handelinput} name='username' value={formdata.username}
                            type="text"
                            placeholder="Enter your username"
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Password
                        </label>
                        <input onChange={handelinput} name='password' value={formdata.password}
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                        />
                    </div>

                    {/* Forgot password */}
                    <div className="flex justify-end">
                        <span className="text-xs text-purple-500 cursor-pointer hover:underline">
                            Forgot Password?
                        </span>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-2 rounded-lg hover:opacity-90 transition duration-300"
                    >
                        Login
                    </button>
                </form>

                {/* Footer */}
                <p className="text-sm text-center text-gray-500 mt-5">
                    Don’t have an account?{" "}
                    <span className="text-purple-500 cursor-pointer hover:underline">
                       <Link to="/register"> Register</Link>
                    </span>
                </p>

            </div>
        </div>
    );
};

export default Login;