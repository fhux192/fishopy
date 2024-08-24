import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { isLoading, user } = useSelector((state) => state.account);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    console.log("user", user);

    if (!user || (role !== "ALL" && role !== user.role)) {
      navigate("/");
    }
  }, [isLoading]);

  return <>{children}</>;
};

export default ProtectedRoute;
