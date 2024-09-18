import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  moviesFilter: {
    searchTerm: "",
    SelectedGenre: "",
    selectedYear: "",
    selectedSort: "",
  },
  filteredMovies: [],
  movieYears: [],
  uniqueYear: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMoviesFilter: (state, action) => {
      state.moviesFilter = { ...state.moviesFilter, ...action.payload };
    },
    setFilterMovies: (state, action) => {
      state.filteredMovies = action.payload;
    },
    setMovieYears: (state, action) => {
      state.movieYears = action.payload;
    },
    setUniqueYear: (state, action) => {
      state.uniqueYear = action.payload;
    },
  },
});

export const {
  setMoviesFilter,
  setFilterMovies,
  setMovieYears,
  setUniqueYear,
} = movieSlice.actions;

export default movieSlice.reducer;
