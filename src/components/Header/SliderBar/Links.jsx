/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const items = ["Trang Chủ", "Sản Phẩm", "Chi Nhánh"];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Đăng xuất thành công");
  };

  // Get the user from Redux state
  const user = useSelector((state) => state.user.account);

  const handleNavigation = (item) => {
    if (item === "Trang Chủ") {
      navigate("/");
    }
    if (item === "Sản Phẩm") {
      navigate("/");
    }
  };

  return (
    <motion.div className="links" variants={variants}>
      {items.map((item) => (
        <motion.p
          className="links-item cursor-pointer hover:text-teal-700"
          key={item}
          variants={itemVariants}
          whileHover={{ scale: 1.1 } }
          onClick={() => handleNavigation(item)}
        >
          {item}
        </motion.p>
      ))}

      {!user?.id && (
        <>
          <motion.p
            className="links-item cursor-pointer hover:text-teal-700"
            onClick={() => dispatch(toggleModalLogin())}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
          >
            Đăng nhập
          </motion.p>
          <motion.p
            className="links-item cursor-pointer hover:text-teal-700"
            onClick={() => dispatch(toggleModalRegister())}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
          >
            Đăng ký
          </motion.p>
        </>
      )}

      {user?.id && (
        <motion.p
          className="links-item cursor-pointer"
          onClick={handleLogout}
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
        >
          Đăng xuất
        </motion.p>
      )}
    </motion.div>
  );
};

export default Links;
