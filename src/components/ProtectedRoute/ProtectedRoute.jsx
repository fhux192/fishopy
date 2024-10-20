import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { user, isAuthenticated } = useSelector((state) => state.account);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  if (role && user && user.role !== role) {
    return <Navigate to={"/"} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
