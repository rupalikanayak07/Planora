import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { routes } from '../routes/routes'
import Navbar from '../components/Navbar'

const Layout = () => {
    return (
       <div>
         <RouterProvider router={routes} />
       
       </div>
    )

}

export default Layout