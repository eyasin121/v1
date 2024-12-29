import React from 'react'
import Blogs from '../../pages/blogs/Blogs.jsx'
import Hero from '../../components/Hero.jsx'


const Home = () => {
  return (
    <div className='bg-slate-50 text-primary container mx-auto mt-7 p-8 rounded ' >
      <Hero/>
      <Blogs/>
    </div>
  )
}

export default Home