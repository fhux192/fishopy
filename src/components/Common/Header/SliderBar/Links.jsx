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
import { FaBagShopping } from "react-icons/fa6";
import { toggle } from "../../../../redux/features/toggle/toggleSlice";
import { logout } from "../../../../redux/features/user/userSlice";
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
    { name: "Trang Chủ", icon: <FaHome className="mb-2" /> },
    { name: "Sản Phẩm", icon: <FaBagShopping className="mb-2" /> },
    { name: "Địa Chỉ", icon: <FaMapMarkedAlt className="mb-2" /> },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Đăng xuất thành công");
  };

  const user = useSelector((state) => state.account.user);

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
            className="flex text- items-center gap-2 links-item cursor-pointer hover:text-teal-700"
            onClick={() => dispatch(toggle("modalLogin"))}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
          >
            <FaSignInAlt className="mb-2" /> Đăng nhập
          </motion.p>
          <motion.p
            className="flex items-center gap-2 links-item cursor-pointer hover:text-teal-700"
            onClick={() => dispatch(toggle("modalRegister"))}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
          >
            <FaUserPlus className="mb-2" /> Đăng ký
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
            <FaHistory className="mb-2" /> Đơn Hàng
          </motion.p>
          <motion.p
            className="flex items-center gap-2 links-item cursor-pointer"
            onClick={handleLogout}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
          >
            <FaSignOutAlt className="mb-2" /> Đăng xuất
          </motion.p>
        </>
      )}
    </motion.div>
  );
};

export default Links;
