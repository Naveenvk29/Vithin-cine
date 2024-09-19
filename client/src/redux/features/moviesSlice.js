import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  moviesFilter: {
    searchTerm: "",
    selectedGenre: "",
    selectedYear: "",
    selectedSort: [],
  },
  filteredMovies: [],
  movieYears: [],
  uniqeYear: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMoviesFilter: (state, action) => {
      state.moviesFilter = { ...state.moviesFilter, ...action.payload };
    },
    setFilteredMovies: (state, action) => {
      state.filteredMovies = action.payload;
    },
    setMoviesYears: (state, action) => {
      setInterval.movieYears = action.payload;
    },
    setUniqueYear: (state, action) => {
      state.uniqeYear = action.payload;
    },
  },
});

export const {
  setMoviesFilter,
  setFilteredMovies,
  setMoviesYears,
  setUniqueYear,
} = moviesSlice.actions;

export default moviesSlice.reducer;
