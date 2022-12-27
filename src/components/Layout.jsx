import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header';
import BottomNav from './BottomNav';

const Layout = ({fetchedUser}) => {
  return (
    <>
      <Header fetchedUser={fetchedUser}/>
      <Outlet/>
      <BottomNav/>
    </>
   
  )
}

export default Layout