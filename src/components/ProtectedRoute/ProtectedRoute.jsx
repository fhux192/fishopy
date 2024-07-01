/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoutes = ({ children }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo?.role != "ADMIN") {
      navigate("/");
    }
  }, [userInfo, navigate]);

  return <div>{userInfo?.role ? children : null}</div>;
};

export default ProtectedRoutes;
