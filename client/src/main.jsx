import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import store from "./redux/store.js";
import { Provider } from "react-redux";

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Login from "./Pages/Auth/Login.jsx";
import Register from "./Pages/Auth/Register.jsx";
import Home from "./Pages/Home/Home.jsx";
import Allmovies from "./Pages/Movie/Allmovies.jsx";
import MovieDetails from "./Pages/Movie/MovieDetails.jsx";

// restic routes
import PrivateRoutes from "./Pages/User/PrivateRoutes.jsx";
import Profile from "./Pages/User/Profile.jsx";

// admin routes
import AdminRoutes from "./Pages/Admin/AdminRoutes.jsx";
import GenreManagement from "./Pages/Admin/GenreManagement.jsx";
import CreateMovie from "./Pages/Admin/CreateMovie.jsx";
import MoviesList from "./Pages/Admin/MoviesList.jsx";
import UpdateMovie from "./Pages/Admin/UpdateMovie.jsx";
import AdminDashboard from "./Pages/Admin/DashBoard/AdminDashboard.jsx";
import AllComments from "./Pages/Admin/AllComments.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/movies/:id" element={<MovieDetails />} />

      <Route path="" element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="" element={<AdminRoutes />}>
        <Route path="/admin/genres" element={<GenreManagement />} />
        <Route path="/admin/movies/create" element={<CreateMovie />} />
        <Route path="/admin/movies-list" element={<MoviesList />} />
        <Route path="/admin/movies/update/:id" element={<UpdateMovie />} />
        <Route path="/admin/movies/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/movies/comments" element={<AllComments />} />
        {/* Add more admin routes here */}
      </Route>

      <Route path="/movies" element={<Allmovies />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
