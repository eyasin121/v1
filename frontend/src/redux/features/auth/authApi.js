import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/user',
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: '/register',
                method: 'POST',
                body: newUser,
             }),
         
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
             }),
         
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
                
             }),
        
        }),
        getUser: builder.query({
            query: () => ({
                url: '/users',
                method: 'GET',
            }),
            refetchOnMount: true,
            invalidatesTags:["user"]
            
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'DELETE',
            }),
           
        }),
        updateUser: builder.mutation({
            query: ({userId,role}) => ({
                url: `/users/${userId}`,
                method: 'PUT',
                body: {role},
            }),
            refetchOnMount: true,
            invalidatesTags:["user"]

        
        }),

       
    })
})

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useGetUserQuery, useDeleteUserMutation, useUpdateUserMutation } = authApi
export default authApi;
