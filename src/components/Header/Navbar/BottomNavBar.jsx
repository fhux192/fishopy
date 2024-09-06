import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHome, FaMapMarkedAlt, FaUserTag } from "react-icons/fa";
import { FaFishFins } from "react-icons/fa6";
import { FaBagShopping } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import "../../../scss/botNavbar.scss";
import {
  toggleModalLogin,
  toggleModalRegister,
} from "../../../redux/features/toggle/toggleSlice.js";
import { logout, setLoading } from "../../../redux/features/user/userSlice.js";
import { Link } from "react-router-dom";
import { message } from "antd";
import { callLogout } from "../../../services/api.js";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.account);

  // Close dropdown on route change
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

  return (
    <div className="bottom-nav">
      <div className="bottom-nav-container">
        <div
          className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
          onClick={() => handleNavigation("/")}
        >
          <FaHome />
          <p>Trang chủ</p>
        </div>
        <div
          className={`nav-item ${
            location.pathname === "/product" ? "active" : ""
          }`}
          onClick={() => handleNavigation("/product")}
        >
          <FaFishFins />
          <p>Sản phẩm</p>
        </div>
        <div
          className={`nav-item ${
            location.pathname === "/address" ? "active" : ""
          }`}
          onClick={() => handleNavigation("/address")}
        >
          <FaMapMarkedAlt />
          <p>Địa chỉ</p>
        </div>

        {/* Tài khoản with dropdown */}
        <div className="nav-item" onClick={toggleDropdown}>
          <FaUserTag />
          <p>Tài khoản</p>
          {isDropdownOpen && (
           <div className={`dropdown-menu ${user ? "top-[-235%]" : "top-[-170%]"}`}>
              {user ? (
                <>
                  {user.role === "ADMIN" && (
                    <Link
                      className="block border-b-none px-2 py-2 text-primaryBlack font-semibold rounded-t-xl w-full text-left"
                      to="/admin"
                    >
                      <button>Admin</button>
                    </Link>
                  )}
                  <Link
                    to="/account"
                    className="block px-2 py-2 text-primaryBlack font-semibold border-t-2 w-full text-left"
                  >
                    Quản lý tài khoản
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-2 py-2 text-primaryBlack font-semibold border-t-2 rounded-b-xl w-full text-left"
                  >
                    Đăng Xuất
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => dispatch(toggleModalLogin())}
                    className="block px-2 py-2 text-primaryBlack font-semibold rounded-t-xl w-full text-left"
                  >
                    Đăng Nhập
                  </button>
                  <button
                    onClick={() => dispatch(toggleModalRegister())}
                    className="block px-2 py-2 text-primaryBlack font-semibold border-t-2 rounded-b-xl w-full text-left"
                  >
                    Đăng Ký
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <div
          className={`nav-item ${
            location.pathname === "/cart" ? "active" : ""
          }`}
          onClick={() => handleNavigation("/cart")}
        >
          <FaBagShopping />
          <p>Giỏ hàng</p>
        </div>
      </div>
    </div>
  );
};

export default BottomNavBar;
