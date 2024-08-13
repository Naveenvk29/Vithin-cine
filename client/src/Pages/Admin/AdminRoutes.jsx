import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
const AdminRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.role == "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoutes;
