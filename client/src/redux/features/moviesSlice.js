import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieFilters: {
    searchTerm: "",
    selectedGenre: "",
    selectedYear: "",
    selectedSort: "",
  },
  filteredMovies: [],
  movieYears: [],
  uniqueYears: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMoviesFilter: (state, action) => {
      state.movieFilters = { ...state.movieFilters, ...action.payload };
    },
    setFilterMovies: (state, action) => {
      state.filteredMovies = action.payload;
    },
    setMovieYears: (state, action) => {
      state.movieYears = action.payload;
    },
    setUniqeYears: (state, action) => {
      state.uniqueYears = action.payload;
    },
  },
});

export default movieSlice.reducer;
