import React, { useState } from 'react'
import { TbUserPentagon } from "react-icons/tb";
import { GrUserAdmin } from "react-icons/gr";
import { FaBlog } from "react-icons/fa";
import { useSelector } from 'react-redux'
import { useFatchBlogsQuery } from '../../../redux/features/blogs/blogsApi';
import { useGetUserQuery } from '../../../redux/features/auth/authApi';


const DashBoard = () => {
    const {user} = useSelector((state) => state.auth);
    const [query, setQuery] = useState({search:'', category:''});
    const {data: blogs=[], isLoading,  error} = useFatchBlogsQuery(query);
    const {data: users=[]} = useGetUserQuery();
    const adminCount = users.filter((user) => user.role === 'admin').length;

  return (
    <>
    {
        isLoading && (<div>Loading.....</div>)
    }
    <div>
        <div>
            <h1 className='text-4xl text-[#ff2b6e] my-2'>Hi , {user?.username}</h1>
            <p className='text-xl text-[#205caa]'>Welcome to your Admin Dashboard</p>

        </div>
        <div className='flex flex-col md:flex-row justify-center items-center gap-8 pt-8'>
            <div className='bg-indigo-200 py-6 w-full rounded-md  space-y-1 flex flex-col items-center justify-center m-5'>
            <TbUserPentagon className='text-5xl text-indigo-600'/>
            <p className='text-2xl text-[#205caa]'>{users.length} Users</p>
            </div>
            <div className='bg-red-200 py-6 w-full rounded-md  space-y-1 flex flex-col items-center justify-center m-5'>
            <FaBlog className='text-5xl text-red-600'/>
            <p className='text-2xl text-[#aa2020]'>{blogs?.length} Blogs</p>
            </div>
            <div className='bg-green-200 py-6 w-full rounded-md  space-y-1 flex flex-col items-center justify-center m-5'>
            <GrUserAdmin className='text-5xl text-green-700'/>
            <p className='text-2xl text-[#23901d]'>{adminCount} Admins</p>
            </div>
            
        </div>
    </div>
    </>
  )
}

export default DashBoard