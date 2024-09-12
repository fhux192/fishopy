import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHome, FaMapMarkedAlt, FaUserTag } from "react-icons/fa";
import { FaFishFins } from "react-icons/fa6";
import { FaBagShopping } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import "../../../scss/botNavbar.scss";
import {
  toggleDrawerCart,
  toggleModalLogin,
  toggleModalRegister,
} from "../../../redux/features/toggle/toggleSlice.js";
import { logout, setLoading } from "../../../redux/features/user/userSlice.js";
import { Link } from "react-router-dom";
import { message } from "antd";
import { callLogout } from "../../../services/api.js";
import { motion } from "framer-motion";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.account);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      const res = await callLogout();
      if (res.vcode === 0) {
        dispatch(logout());
        message.success(res.message);
      } else {
        message.error("Logout failed!");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred during logout.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const activeColor = "#2daab6"; // Updated active icon color
  const inactiveColor = "#303030"; // Color when inactive

  return (
    <div className="bottom-nav">
      <div className="bottom-nav-container">
        {/* Home Icon */}
        <motion.div
          className="nav-item font-semibold"
          onClick={() => handleNavigation("/")}
          animate={{
            color: location.pathname === "/" ? activeColor : inactiveColor,
          }}
          transition={{ duration: 0.5 }}
        >
          <FaHome />
          <p>Trang chủ</p>
        </motion.div>

        {/* Product Icon */}
        <motion.div
          className="nav-item font-semibold"
          onClick={() => handleNavigation("/product")}
          animate={{
            color: location.pathname === "/product" ? activeColor : inactiveColor,
          }}
          transition={{ duration: 0.5 }}
        >
          <FaFishFins />
          <p>Sản phẩm</p>
        </motion.div>

        {/* Account Icon with Dropdown */}
        <motion.div
          className={`nav-item font-semibold ${isDropdownOpen ? "active" : ""}`}
          onClick={toggleDropdown}
          animate={{
            color: isDropdownOpen ? activeColor : inactiveColor,
          }}
          transition={{ duration: 0.5 }}
        >
          <FaUserTag />
          {user ? <p>{user.name}</p> : <p>Tài khoản</p>}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{
              opacity: isDropdownOpen ? 1 : 0,
              y: isDropdownOpen ? 0 : 50,
              scale: isDropdownOpen ? 1 : 0.5,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`dropdown-menu ${user ? "top-[-235%]" : "top-[-170%]"} ${
              isDropdownOpen ? "dropdown-active" : ""
            }`}
          >
            {isDropdownOpen && (
              <>
                {user ? (
                  <>
                    {user.role === "ADMIN" && (
                      <Link
                        className="block border-b-none px-2 py-2 text-Black font-semibold rounded-t-xl w-full text-left"
                        to="/admin/product"
                      >
                        <button>Quản lý sản phẩm</button>
                      </Link>
                    )}
                    <Link
                      to="/account"
                      className="block px-2 py-2 text-Black font-semibold border-t-[1px] w-full text-left"
                    >
                      Quản lý tài khoản
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block px-2 py-2 text-Black font-semibold border-t-[1px] rounded-b-xl w-full text-left"
                    >
                      Đăng Xuất
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => dispatch(toggleModalLogin())}
                      className="block px-2 py-2 text-Black font-semibold rounded-t-xl w-full text-left"
                    >
                      Đăng Nhập
                    </button>
                    <button
                      onClick={() => dispatch(toggleModalRegister())}
                      className="block px-2 py-2 text-Black font-semibold border-t-[1px] rounded-b-xl w-full text-left"
                    >
                      Đăng Ký
                    </button>
                  </>
                )}
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Cart Icon */}
        <motion.div
          className="nav-item font-semibold"
          animate={{
            color: location.pathname === "/cart" ? activeColor : inactiveColor,
          }}
          transition={{ duration: 0.5 }}
          onClick={() => dispatch(toggleDrawerCart())}
        >
          <FaBagShopping />
          <p>Giỏ hàng</p>
        </motion.div>

        {/* Address Icon */}
        <motion.div
          className="nav-item font-semibold"
          onClick={() => handleNavigation("/address")}
          animate={{
            color: location.pathname === "/address" ? activeColor : inactiveColor,
          }}
          transition={{ duration: 0.5 }}
        >
          <FaMapMarkedAlt />
          <p>Địa chỉ</p>
        </motion.div>
      </div>
    </div>
  );
};

export default BottomNavBar;
