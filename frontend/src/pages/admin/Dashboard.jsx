import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AdminNav from './AdminNav'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const {user} = useSelector(state => state.auth);
    if(!user || user.role!== 'admin'){
        return Navigate('/login');
    }
  return (
    <div className='container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start' >
        <header className='lg:w-1/5 sm:2/5 '>
            <AdminNav/>
        </header>
        <main className='p-8 bg-slate-100 w-full m-5'>
            <Outlet/>
        </main>
    </div>
  )
}

export default Dashboard