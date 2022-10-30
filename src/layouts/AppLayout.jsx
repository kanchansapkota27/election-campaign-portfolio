import React from 'react'
import TopNav from '../components/TopNav'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <>
    <div className='max-h-screen h-screen bg-globalbg overflow-y-auto flex flex-col font-monteserrat'>
      <div className='w-full top-0 sticky z-50'>
        <TopNav />
      </div>
        <div className='bg-bodybg h-full max-h-full'>
        <Outlet/>
        </div>
    </div>
    </>
  )
}

export default AppLayout