import { useEffect } from "react";
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const roles = JSON.parse(localStorage.getItem("Nroles"));
  const username = localStorage.getItem("Nusername");
  let navigate = useNavigate();
  useEffect(() => {
    username === null && navigate("/");
  }, [username]);

  return roles.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : username ? (
    <Navigate to="/Unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
