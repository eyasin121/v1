import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
    reducerPath: 'blogsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api',
        credentials: 'include',
    }),
    tagTypes: ['Blog'],
    endpoints: (builder) => ({
        fatchBlogs: builder.query({
            query: ({search = '', category = '', location = ''}) => `/blog?search=${search}&category=${category}&location=${location}`,
            providesTags: ['Blog'],
        }),
        fetchBlogById: builder.query({
            query: (title) => `/blog/${title.replace(/-/g, ' ')}`,  // Replaced spaces with dashes
        }),
        fetchBlogByid: builder.query({
            query: (id) => `/blog/id/${id}`,  // Replaced spaces with dashes
        }),
        fetchRelatedBlogs: builder.query({
            query: (category) => `/blog/related/${category}`,
        }),
        postBlog: builder.mutation({
            query: (newBlog) => ({
                url: '/blog/create-post',
                method: 'POST',
                body: newBlog,
                credentials: 'include',
            }),
        }),
        updateBlog: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/blog/${id}`,
                method: 'PUT',
                body: rest,
                credentials: 'include',
            }),
            invalidatesTags: (result, error, {id}) => [{type: 'Blog', id}],
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/blog/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, {id}) => [{type: 'Blog', id}],
        }),
    }),
});

export const { 
    useFatchBlogsQuery,
    useFetchBlogByIdQuery,
    useFetchRelatedBlogsQuery,
    usePostBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation ,
    useFetchBlogByidQuery
} = blogApi;
