import React from 'react'
import { ImFacebook } from "react-icons/im";
import { FaSquareXTwitter } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { SiBinance } from "react-icons/si";

const Footer = () => {
  return (
    <div className='bg-gray-800 w-full h-auto mt-8 text-white flex flex-col justify-center items-center '>
      <div>
        <a href="/"><img src="/logo.png" alt="" className='lg:h-14 lg:m-5 h-8 m-5'/></a>
        
      </div>
      <div className='flex justify-center items-center w-full gap-7  mt-2 m-2' >
      <a href="" className='ml-2 hover:text-4xl text-3xl'><ImFacebook /></a>
      <a href="" className='ml-2 hover:text-4xl text-3xl'><FaSquareXTwitter /></a>
      <a href="" className='ml-2 hover:text-4xl text-3xl'><GrInstagram /></a>
      <a href="" className='ml-2 hover:text-4xl text-3xl'><SiBinance /></a>
      </div>
      <div>
        <p className='text-center text-sm text-gray-300 mt-5 mb-1'>© 2025 1BTCNews.com All rights reserved.</p>
      </div>


    </div>
  )
}

export default Footer