import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHome, FaMapMarkedAlt, FaUserTag } from "react-icons/fa";
import { FaFishFins, FaBagShopping } from "react-icons/fa6";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "@scss/botNavbar.scss";
import { toggle } from "@redux/features/toggle/toggleSlice.js";
import { logout, setLoading } from "@redux/features/user/userSlice.js";
import { message } from "antd";
import { user_logout } from "@services/api.js";
import { motion } from "framer-motion";
import { googleLogout } from "@react-oauth/google";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAdminSectionOpen, setIsAdminSectionOpen] = useState(false);

  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.account);

  // Tính số lượng sản phẩm trong giỏ
  const cartQuantity = user.cart?.length || 0;

  const dropdownRef = useRef(null);
  const accountNavRef = useRef(null);

  useEffect(() => {
    setIsDropdownOpen(false);
    setIsAdminSectionOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
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
    event.stopPropagation();
    setIsAdminSectionOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      googleLogout();
      const res = await user_logout();
      if (res.vcode === 0) {
        dispatch(logout());
        message.success(res.msg);
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred during logout.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const activeColor = "#09D1C7";
  const inactiveColor = "#f0f6f5";

  return (
    <div className="bottom-nav z-[999]">
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
          ref={accountNavRef}
          className={`nav-item font-semibold ${isDropdownOpen ? "active" : ""}`}
          onClick={toggleDropdown}
          animate={{
            color: isAuthenticated ? activeColor : inactiveColor,
          }}
          transition={{ duration: 0.5 }}
        >
          <FaUserTag />
          <p>Tài khoản</p>
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{
              opacity: isDropdownOpen ? 1 : 0,
              y: isDropdownOpen ? 0 : 50,
              scale: isDropdownOpen ? 1 : 0.5,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`dropdown-menu ${
              isAuthenticated && user.role == "ADMIN"
                ? "top-[-130px]"
                : "top-[-100px]"
            } ${
              isAuthenticated && user.role == "USER"
                ? "top-[-100px]"
                : "top-[-100px]"
            } ${isAdminSectionOpen && "top-[-270px]"}`}
          >
            {isDropdownOpen && (
              <div className="dropdown-content">
                {isAuthenticated ? (
                  <>
                    {user.role === "ADMIN" && (
                      <div className="admin-section">
                        <div
                          className="admin-header font-bold flex justify-between items-center px-2 py-2 cursor-pointer"
                          onClick={toggleAdminSection}
                        >
                          <span>Quản lý Admin</span>
                          <span>{isAdminSectionOpen ? "-" : "+"}</span>
                        </div>
                        {isAdminSectionOpen && (
                          <div className="admin-options pl-4">
                            <Link
                              className="block font-bold px-2 py-2 text-Black w-full text-left"
                              to="/admin/product"
                            >
                              Quản lý sản phẩm
                            </Link>
                            <Link
                              className="block font-bold px-2 py-2 text-Black w-full text-left"
                              to="/admin/order"
                            >
                              Quản lý đơn hàng
                            </Link>
                            <Link
                              className="block font-bold px-2 py-2 text-Black w-full text-left"
                              to="/admin/user"
                            >
                              Quản lý người dùng
                            </Link>
                            <Link
                              className="block font-bold px-2 py-2 text-Black w-full text-left"
                              to="/admin/combo"
                            >
                              Quản lý combo
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                    <Link
                      to="/account"
                      className={`block px-2 py-2 text-Black font-bold ${
                        user.role === "ADMIN" ? "border-t-[1px]" : ""
                      } w-full text-left`}
                    >
                      Quản lý tài khoản
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block px-2 py-2 text-Black font-bold border-t-[1px] w-full text-left"
                    >
                      Đăng Xuất
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => dispatch(toggle("modalLogin"))}
                      className="block px-2 py-2 text-Black font-bold rounded-t-xl w-full text-left"
                    >
                      Đăng Nhập
                    </button>
                    <button
                      onClick={() => dispatch(toggle("modalRegister"))}
                      className="block px-2 py-2 text-Black font-bold border-t-[1px] rounded-b-xl w-full text-left"
                    >
                      Đăng Ký
                    </button>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Cart Icon with Badge and Wiggle */}
        <motion.div
          className="nav-item font-semibold relative"
          animate={{
            color: location.pathname === "/cart" ? activeColor : inactiveColor,
          }}
          transition={{ duration: 0.5 }}
          onClick={() => dispatch(toggle("drawerCart"))}
        >
          <FaBagShopping className={cartQuantity > 0 ? "cart-notify" : ""} />
          <p>Giỏ hàng</p>
          {cartQuantity > 0 && (
            <div
              className="cart-badge"
              style={{
                position: "absolute",
                top: "-8px",
                right: "-0px",
                background: "#09D1C7",
                color: "#fff",
                borderRadius: "50%",
                width: "18px",
                height: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {cartQuantity}
            </div>
          )}
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

      {/* Style nội bộ cho animation */}
      <style>
        {`
          @keyframes wiggleLoop {
            0% {
              transform: rotate(0deg);
            }
            10% {
              transform: rotate(-15deg);
            }
            20% {
              transform: rotate(10deg);
            }
            30% {
              transform: rotate(-5deg);
            }
            40% {
              transform: rotate(5deg);
            }
            50% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }

          .cart-notify {
            animation: wiggleLoop 7.5s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default BottomNavBar;