import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHome, FaMapMarkedAlt, FaUserTag } from "react-icons/fa";
import { FaFishFins, FaBagShopping } from "react-icons/fa6";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../../../scss/botNavbar.scss";
import {
  toggleDrawerCart,
  toggleModalLogin,
  toggleModalRegister,
} from "../../../redux/features/toggle/toggleSlice.js";
import { logout, setLoading } from "../../../redux/features/user/userSlice.js";
import { message } from "antd";
import { callLogout } from "../../../services/api.js";
import { motion } from "framer-motion";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAdminSectionOpen, setIsAdminSectionOpen] = useState(false); // State for Admin section

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.account);

  // References for detecting clicks outside
  const dropdownRef = useRef(null);
  const accountNavRef = useRef(null);

  useEffect(() => {
    setIsDropdownOpen(false);
    setIsAdminSectionOpen(false); // Close Admin section on path change
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the dropdown is open and the click is outside both the account nav and dropdown
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        accountNavRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !accountNavRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setIsAdminSectionOpen(false);
      }
    };

    const handleScroll = () => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
        setIsAdminSectionOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDropdownOpen]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleAdminSection = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up
    setIsAdminSectionOpen((prev) => !prev);
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

  const activeColor = "#2daab6"; // Active icon color
  const inactiveColor = "#f0f6f5"; // Inactive icon color

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
          className="nav-item translate-x-[1px] font-semibold"
          onClick={() => handleNavigation("/product")}
          animate={{
            color:
              location.pathname === "/product" ? activeColor : inactiveColor,
          }}
          transition={{ duration: 0.5 }}
        >
          <FaFishFins />
          <p>Sản phẩm</p>
        </motion.div>

        {/* Account Icon with Dropdown */}
        <motion.div
          ref={accountNavRef} // Attach ref to the account nav
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
            ref={dropdownRef} // Attach ref to the dropdown menu
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{
              opacity: isDropdownOpen ? 1 : 0,
              y: isDropdownOpen ? 0 : 50,
              scale: isDropdownOpen ? 1 : 0.5,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`dropdown-menu ${
              user ? "top-[-238%]" : "top-[-175%]"
            } ${isDropdownOpen ? "" : "top-[-500%]"} ${
              isAdminSectionOpen ? "top-[-424%]" : ""
            }`}
          >
            {isDropdownOpen && (
              <div className="dropdown-content">
                {user ? (
                  <>
                    {/* Admin options if user is ADMIN */}
                    {user.role === "ADMIN" && (
                      <div className="admin-section">
                        <div
                          className="admin-header flex justify-between items-center px-2 py-2 cursor-pointer"
                          onClick={toggleAdminSection}
                        >
                          <span>Quản lý Admin</span>
                          <span>{isAdminSectionOpen ? "-" : "+"}</span>
                        </div>
                        {isAdminSectionOpen && (
                          <div className="admin-options pl-4">
                            <Link
                              className="block px-2 py-2 text-Black font-semibold w-full text-left"
                              to="/admin/product"
                            >
                              Quản lý sản phẩm
                            </Link>
                            <Link
                              className="block px-2 py-2 text-Black font-semibold w-full text-left"
                              to="/admin/order"
                            >
                              Quản lý đơn hàng
                            </Link>
                            <Link
                              className="block px-2 py-2 text-Black font-semibold w-full text-left"
                              to="/admin/user"
                            >
                              Quản lý người dùng
                            </Link>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Common options for logged-in users */}
                    <Link
                      to="/account"
                      className="block px-2 py-2 text-Black font-semibold border-t-[1px] w-full text-left"
                    >
                      Quản lý tài khoản
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block px-2 py-2 text-Black font-semibold border-t-[1px] w-full text-left"
                    >
                      Đăng Xuất
                    </button>
                  </>
                ) : (
                  <>
                    {/* Options for guests */}
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
              </div>
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
            color:
              location.pathname === "/address" ? activeColor : inactiveColor,
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
