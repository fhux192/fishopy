/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaProductHunt,
  FaMapMarkedAlt,
  FaHistory,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  toggleModalLogin,
  toggleModalRegister,
} from "../../../redux/features/toggle/toggleSlice";
import { logout } from "../../../redux/features/user/userSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

const variants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 150,
    opacity: 0,
  },
};

const Links = () => {
  const items = [
    { name: "Trang Chủ", icon: <FaHome /> },
    { name: "Sản Phẩm", icon: <FaProductHunt /> },
    { name: "Địa Chỉ", icon: <FaMapMarkedAlt /> },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Đăng xuất thành công");
  };

  const user = useSelector((state) => state.user.userInfo);

  const handleNavigation = (item) => {
    if (item === "Trang Chủ") {
      navigate("/");
    } else if (item === "Sản Phẩm") {
      navigate("/product");
    } else if (item === "Địa Chỉ") {
      navigate("/address");
    } else if (item === "Lịch Sử Đơn Hàng") {
      navigate("/order-history");
    }
  };

  return (
    <motion.div className="links" variants={variants}>
      {items.map((item) => (
        <motion.p
          className={`flex items-center gap-2 links-item cursor-pointer hover:text-teal-500 ${
            (item.name === "Trang Chủ" && location.pathname === "/") ||
            (item.name === "Sản Phẩm" && location.pathname === "/product") ||
            (item.name === "Địa Chỉ" && location.pathname === "/address")
              ? "text-teal-700 font-bold"
              : ""
          }`}
          key={item.name}
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          onClick={() => handleNavigation(item.name)}
        >
          {item.icon} {item.name}
        </motion.p>
      ))}

      {!user ? (
        <>
          <motion.p
            className="flex items-center gap-2 links-item cursor-pointer hover:text-teal-700"
            onClick={() => dispatch(toggleModalLogin())}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
          >
            <FaSignInAlt /> Đăng nhập
          </motion.p>
          <motion.p
            className="flex items-center gap-2 links-item cursor-pointer hover:text-teal-700"
            onClick={() => dispatch(toggleModalRegister())}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
          >
            <FaUserPlus /> Đăng ký
          </motion.p>
        </>
      ) : (
        <>
          <motion.p
            className="flex items-center gap-2 links-item cursor-pointer"
            onClick={() => handleNavigation("Lịch Sử Đơn Hàng")}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
          >
            <FaHistory /> Đơn Hàng
          </motion.p>
          <motion.p
            className="flex items-center gap-2 links-item cursor-pointer"
            onClick={handleLogout}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
          >
            <FaSignOutAlt /> Đăng xuất
          </motion.p>
        </>
      )}
    </motion.div>
  );
};

export default Links;
