import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/Layout'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import AddStudyplan from '../components/AddStudyplan'
import Moodpopup from '../components/Moodpopup'



export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
       
    },
    {
        path: '/plan',
        element: <AddStudyplan />,
       
    },
    {
        path: '/mood',
        element: <Moodpopup />,
       
    },
])