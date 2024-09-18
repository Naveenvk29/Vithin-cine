import { apiSlice } from "./apiSlice";
import { MOVIES_URL } from "../constants";

export const moviesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: () => `${MOVIES_URL}/all-movies`,
    }),
    createMovie: builder.mutation({
      query: (newMovie) => ({
        url: `${MOVIES_URL}/create-movie`,
        method: "POST",
        body: newMovie,
      }),
    }),

    updateMovie: builder.mutation({
      query: ({ id, updatedMovie }) => ({
        url: `${MOVIES_URL}/update-movie/${id}`,
        method: "PUT",
        body: updatedMovie,
      }),
    }),
    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `${MOVIES_URL}/delete-movie/${id}`,
        method: "DELETE",
      }),
    }),

    addMovieReview: builder.mutation({
      query: ({ id, rating, comment }) => ({
        url: `${MOVIES_URL}/${id}/reviews`,
        method: "POST",
        body: { rating, id, comment },
      }),
    }),

    deleteComment: builder.mutation({
      query: ({ movieId, reviewId }) => ({
        url: `${MOVIES_URL}/delete-comment`,
        method: "DELETE",
        body: { movieId, reviewId },
      }),
    }),

    getSpecificMovie: builder.query({
      query: (id) => `${MOVIES_URL}/specific-movie/${id}`,
    }),

    getNewMovies: builder.query({
      query: () => `${MOVIES_URL}/new-movies`,
    }),

    getTopMovies: builder.query({
      query: () => `${MOVIES_URL}/top-movies`,
    }),

    getRandomMovies: builder.query({
      query: () => `${MOVIES_URL}/random-movies`,
    }),
  }),
});

export const {
  useGetAllMoviesQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
  useAddMovieReviewMutation,
  useDeleteCommentMutation,
  useGetSpecificMovieQuery,
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} = moviesApiSlice;
