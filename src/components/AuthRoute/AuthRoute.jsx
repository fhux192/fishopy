/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (!userInfo) {
      useNavigate().navigate("/");
    }
  }, [userInfo]);

  return <div>{userInfo?.role ? children : null}</div>;
};

export default AuthRoute;
