import { apiSlice } from "./apiSlice";
import { GENRES_URL } from "../constants";

export const genreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => ({
        url: `${GENRES_URL}/genres`,
        method: "GET",
      }),
    }),
    createGenres: builder.mutation({
      query: (newGenre) => ({
        url: `${GENRES_URL}`,
        method: "POST",
        body: newGenre,
      }),
    }),
    updateGenre: builder.mutation({
      query: ({ id, updateGenre }) => ({
        url: `${GENRES_URL}/${id}`,
        method: "PUT",
        body: updateGenre,
      }),
    }),
    deleteGenre: builder.mutation({
      query: (id) => ({
        url: `${GENRES_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetGenresQuery,
  useCreateGenresMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
} = genreApiSlice;
