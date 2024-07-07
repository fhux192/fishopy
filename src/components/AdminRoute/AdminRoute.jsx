import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { userInfo, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && userInfo?.role != "ADMIN") {
      navigate("/");
    }
  }, [isLoading]);

  return children;
};
export default AdminRoute;
