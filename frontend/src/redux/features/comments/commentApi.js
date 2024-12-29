import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/comment',
    credentials: 'include',
  }),
  tagTypes: ['Comment'],

  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => '/totalComments',
      method: 'GET',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Comment', id })),
              { type: 'Comment', id: 'LIST' },
            ]
          : [{ type: 'Comment', id: 'LIST' }],
    }),
    addComment: builder.mutation({
      query: (comment) => ({
        url: '/postComment',
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: (result, error, { postId }) => [{ type: 'Comment', id: postId }],
    }),
  }),
});

export const { useGetCommentsQuery, useAddCommentMutation } = commentApi;
export default commentApi;