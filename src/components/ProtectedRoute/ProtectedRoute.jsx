/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoutes = ({ children }) => {
  const account = useSelector((state) => state.user.account);
  const navigate = useNavigate();

  useEffect(() => {
    if (!account?.isAdmin) {
      navigate("/");
    }
  }, [account, navigate]);

  return <div>{account?.isAdmin ? children : null}</div>;
};

export default ProtectedRoutes;
