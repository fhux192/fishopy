import React from "react";
import { FaHome, FaMapMarkedAlt, FaUserTag } from "react-icons/fa";
import { FaFishFins } from "react-icons/fa6";
import { FaBagShopping } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import "../../../scss/botNavbar.scss";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="bottom-nav">
      <div className="bottom-nav-container">
        <div
          className={`nav-item ${
            location.pathname === "/" ? "active" : ""
          }`}
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
        <div
          className={`nav-item ${
            location.pathname === "/profile" ? "active" : ""
          }`}
          onClick={() => handleNavigation("/profile")}
        >
          <FaUserTag />
          <p>Tài khoản</p>
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
