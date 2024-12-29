import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFetchRelatedBlogsQuery } from '../../../redux/features/blogs/blogsApi';


const RelatedBlog = () => {
    const {category } = useParams();
    const {data: blog =  [] } = useFetchRelatedBlogsQuery(category);
  return (
    <div className='bg-slate-100 m-5 p-7 rounded-md h-2/4 overflow-hidden'>
        <h3 className='text-3xl font-medium pt-8 px-8 pb-5'>Latest Blog </h3>
        <hr className='my-5 py-1 bg-[#1a1e3a] '/>
        {
            blog.length > 0 ? (<div className='space-y-4 mt-5'>
                  {
                    blog.map((blog) => (
                        <a 
                        href={`/blog/${blog.title}`}
                        key={blog._id}
                        className='flex flex-col sm:flex-row gap-4 shadow-sm '>
                           <div className='size-14 ' >
                            <img src={blog.coverImg} alt="" className='h-full w-full rounded-xl'/>
                           </div>
                           <div className='mb-2'>
                            <h4 className='font-medium text-lg text-[#216ead]'>{blog.title.substring(0, 50)}</h4>
                           </div>
                        </a>
                    ))
                  }
             </div>) :(<div className='p-8'>No related blogs found</div>)
             
        }
    </div>
  )
}

export default RelatedBlog