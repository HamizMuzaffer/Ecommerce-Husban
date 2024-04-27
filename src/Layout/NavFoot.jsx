import React from 'react'
import Navbar from '../components/Navbar'
import Last from '../components/Last'
import { Outlet } from 'react-router-dom'
import N


function NavFoot() {
  return (
   <>
   <Navbar/>
   <Outlet/>
   <NavFoot/>
   </>
  )
}

export default NavFoot
