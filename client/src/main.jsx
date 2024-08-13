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
import PrivateRoutes from "./Pages/User/PrivateRoutes.jsx";
import Profile from "./Pages/User/Profile.jsx";

// admin routes
import AdminRoutes from "./Pages/Admin/AdminRoutes.jsx";
const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="" element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Admin routes go here */}
      <Route path="" element={<AdminRoutes />}>
        <Route path="/admin/movies/genre" element={""} />
      </Route>
    </Route>
    // Add more routes as needed
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
