import { apiSlice } from "./apiSlice";
import { GENRE_URL } from "../constants";

export const genreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGenre: builder.mutation({
      query: (newGenre) => ({
        url: `${GENRE_URL}`,
        method: "POST",
        body: newGenre,
      }),
    }),

    updateGenre: builder.mutation({
      query: ({ _id, data }) => ({
        url: `${GENRE_URL}/${_id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteGenre: builder.mutation({
      query: (id) => ({
        url: `${GENRE_URL}/${id}`,
        method: "DELETE",
      }),
    }),

    getAllGenres: builder.query({
      query: () => `${GENRE_URL}/genres`,
    }),
  }),
});

export const {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useGetAllGenresQuery,
} = genreApiSlice;
