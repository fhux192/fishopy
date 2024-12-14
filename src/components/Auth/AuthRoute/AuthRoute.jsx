/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthRoute = ({ children }) => {
  const user = useSelector((state) => state.account.user);

  useEffect(() => {
    if (!user) {
      useNavigate().navigate("/");
    }
  }, [user]);

  return <div>{user?.role ? children : null}</div>;
};

export default AuthRoute;
