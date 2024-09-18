import { motion } from "framer-motion";
import { IoLogoTiktok } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { FaFishFins } from "react-icons/fa6";
import "../../../scss/navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import "../../../scss/bubble.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaMapMarkedAlt, FaUserTag } from "react-icons/fa";
import { message } from "antd";
import { logout } from "../../../redux/features/user/userSlice";
import { callLogout } from "../../../services/api.js";
import ModalAuth from "../../Modal/ModalAuth/ModalAuth.jsx";
import { FaBagShopping } from "react-icons/fa6";
import { toggleDrawerCart } from "../../../redux/features/toggle/toggleSlice.js";
import tiktok from "../../../assets/icon/tik-tok.png";
import fish from "../../../assets/logo.png"
const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);

  const items = [
    {
      name: "Trang Chủ",
      icon: (
        <FaHome className="lg:block hidden icon-navigate mr-[17px] duration-500" />
      ),
    },
    {
      name: "Sản Phẩm",
      icon: (
        <FaFishFins className="lg:block hidden icon-navigate mr-[17px] duration-500" />
      ),
    },
    {
      name: "Địa Chỉ",
      icon: (
        <FaMapMarkedAlt className="lg:block hidden icon-navigate mr-[17px] duration-500" />
      ),
    },
  ];

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

  const handleLogout = async () => {
    try {
      const res = await callLogout();
      if (res.vcode == 0) {
        dispatch(logout());
        message.success(res.message);
        setIsDropdownVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserTagClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
      setIsNavbarVisible(false);
    } else {
      setIsNavbarVisible(true);
    }
    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: isNavbarVisible ? 0 : -100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ position: "fixed", width: "100%", top: 0, zIndex: 1000 }}
    >
      <div
        className={`wrapper  lg:shadow-none lg:px-[20px]  lg:mt-[1.5rem] lg:mx-[0] `}
      >
        <div className="lg:flex w-full lg:w-full ml-2 lg:ml-0 ">
          <div  className="flex justify-start w-full lg:flex-0 lg:ml-[1%]">
            <div className="flex rounded-xl nav-blur px-3 items-center">
              {" "}
             <button onClick={()=>handleNavigation("Trang Chủ")} className="logo">GuppyHocMon</button>
            </div>
          </div>
          <div className="rounded-xl nav-blur px-3 border-primaryGrey social">
            {items.map((item) => (
              <div
                className={`lg:block hidden icon-navigate text-primaryBlack mr-[17px] duration-500 ${
                  (item.name === "Trang Chủ" && location.pathname === "/") ||
                  (item.name === "Sản Phẩm" &&
                    location.pathname === "/product") ||
                  (item.name === "Địa Chỉ" && location.pathname === "/address")
                    ? "text-Teal font-bold"
                    : "text-White"
                }`}
                key={item.name}
                onClick={() => handleNavigation(item.name)}
              >
                {item.icon}
              </div>
            ))}

            <div style={{color:"#f0f6f5"}} className="border-l-[1px] border-primaryBlack pl-4 mr-[0rem]">
              {" "}
              <div className="relative" ref={dropdownRef}>
                <FaUserTag
                  title="Tài Khoản"
                  onClick={handleUserTagClick}
                  className="lg:block hidden icon mr-2 duration-500 cursor-pointer"
                />
                {isDropdownVisible && <ModalAuth />}
              </div>
            </div>
            <div
              className="relative lg:block hidden group"
              onClick={() => dispatch(toggleDrawerCart())}
            >
              <motion.div
                initial={{ scale: 1 }}
                animate={{
                  scale:
                    user?.cart.reduce((acc, cur) => (acc += cur.quantity), 0) >
                    0
                      ? [1, 0.9, 1]
                      : 1,
                }}
                transition={{ duration: 0.5, repeat: 1, repeatType: "reverse" }}
                key={user?.cart.reduce((acc, cur) => (acc += cur.quantity), 0)}
              >
                <FaBagShopping
                  title="Giỏ Hàng"
                  className=" bag-icon duration-500 text-White"
                />
              </motion.div>
              <div
                className={`flex font-bold w-[1.35rem] h-[1.25rem] items-center justify-center lg:right-[5%] right-[7%] lg:top-[-35%] top-[-35%] duration-500 rounded-md absolute ${
                  user?.cart.reduce((acc, cur) => (acc += cur.quantity), 0) > 0
                    ? "text-White bg-Teal border-0"
                    : "bg-white text-Black "
                }`}
              >
                <div className="">
                  {" "}
                  {user
                    ? user.cart.reduce((acc, cur) => acc + cur.quantity, 0)
                    : 0}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:border-l-[1px] border-primaryBlack mr-[0rem] social">
          <a
            href="https://www.tiktok.com/@quanguppy68?_t=8muvYNlCqUz&_r=1"
            target="_blank"
          >
            <img
            src={tiktok}
              title="TikTok"
              className="lg:hidden block w-[35px] lg:w-full lg:h-[35px] text-red-600 lg:mr-[15px] md:mr-4 mr-8 duration-500"
            />
          </a>
          <a
            href="https://www.youtube.com/channel/UCMnDPNFBmSwnlfPnPWN8zdw/?sub_confirmation=1"
            target="_blank"
          >
            <FaYoutube
              title="Youtube Guppy Hóc Môn"
              className="lg:hidden block w-[35px] h-[35px] text-Red lg:mr-[15px] mr-2 duration-500"
            />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const BubbleText = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <div
      onClick={handleNavigateHome}
      className="font-sans text-Teal2 mt-[1px] w-full text-2xl min-[320px]:text-[1.6rem] min-[381px]:text-[1.8rem] min-[425px]:text-3xl  min-[768px]:text-4xl z-10 lg:text-4xl cursor-pointer"
    >
      {"GuppyHocMon".split("").map((child, idx) => (
        <span className="hoverText" key={idx}>
          {child}
        </span>
      ))}
    </div>
  );
};

export default Navbar;
