import React from 'react'
import { Route, createBrowserRouter ,createRoutesFromElements ,RouterProvider } from 'react-router-dom'
import NavFoot from '../Layout/NavFoot'
import Home from '../pages/Home'

const router = createBrowserRouter(
    createRoutesFromElements(

        <Route path='/' element = {<NavFoot/>}>

           <Route path='' element = {<Home/>}>
            {/* <Route path=''> */}
        </Route>
    )
)
function Navigation() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default Navigation