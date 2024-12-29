import React from 'react'


const SearchBlog = ({search, handleSearchChange, handleSearch}) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch()
        }
    }
  return (
    <div className='w-full flex'>
        <input type=" text" 
        value={search}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        placeholder="Search Any Blog"
        className='py-2 px-4 mr-5 w-full rounded-md bg-[#ededed] focus:outline-none focus:border '
        />
        <button 
        onClick={handleSearch}
        className='bg-[#1e73BE] px-4 py-2 rounded-md text-white '>Search</button>
    </div>
  )
}

export default SearchBlog