import React, { useState } from 'react';
import SearchBlog from './SearchBlog';
import { useFatchBlogsQuery } from '../../redux/features/blogs/blogsApi';

// Function to generate SEO-friendly URL
const generateSeoFriendlyUrl = (title) => {
  return encodeURIComponent(title.replace(/\s+/g, '-'));
};

const Blogs = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState({ search: '', category: '' });

  // Get data from API
  const { data: blogs = [], error, isLoading } = useFatchBlogsQuery(query);
  console.log(blogs);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => setQuery({ search, category });

  return (
    <div className='mt-16 container mx-auto'>
      <SearchBlog
        search={search}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
      />
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      <div className='mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>
        {blogs.map((blog) => {
          // Generate SEO-friendly URL for the blog title
          const seoFriendlyUrl = generateSeoFriendlyUrl(blog.title);
          return (
            <a
              href={`/blog/${seoFriendlyUrl}`}  // Use the SEO-friendly URL
              key={blog._id}
              className='shadow-md'
            >
              <img src={blog?.coverImg} alt="" className='w-full h-80' />
              <h2 className='text-xl p-4'>{blog.title}</h2>
              <p className='p-2 px-4 text-lg text-blue-300'>views: {blog.view} </p>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
