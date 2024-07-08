import { motion } from "framer-motion";
import { FaFacebook } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { FaFishFins } from "react-icons/fa6";
import Slidebar from "../SliderBar/Slidebar.jsx";
import "../../../scss/navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import "../../../scss/bubble.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaHome, FaMapMarkedAlt, FaUserTag } from "react-icons/fa";
import { message } from "antd";
import { logout } from "../../../redux/features/user/userSlice";
import { callLogout } from "../../../services/api.js";
import ModalAuth from "../../Modal/ModalAuth/ModalAuth.jsx";

const Navbar = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [cartLocal, setCartLocal] = useState([]);
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);

  const handleNavigation = () => {
    navigate("/");
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
      style={{ position: 'fixed', width: '100%', top: 0, zIndex: 1000 }}
    >
      <div className="wrapper bg-white lg:px-[20px] lg:mt-[0.5rem] lg:rounded-xl lg:w-[85%] lg:border-2 border-b-2 border-gray-150 lg:mx-[7.5%]">
        <div className="lg:flex w-full lg:w-full min-[320px]:ml-12 lg:ml-0 sm:ml-14">
          <button className="flex mb-[3px] lg:flex-0 lg:mr-[4.5%]" onClick={handleNavigation}>
            <BubbleText />
          </button>

          <div className="group duration-1000 lg:flex hidden flex-[2] items-center mx-[2%]">
            <input
              type="text"
              className="w-full bg-gray-100 p-[2px] pl-4 font-semibold text-xl text-primaryGrey border-2 border-gray-100 rounded-full focus:outline-gray-200"
            />
            <button className="flex justify-center items-center duration-1000 ml-4 border-2 border-gray-100 rounded-full w-20 h-9">
              <FaSearch className="text-secondGrey" />
            </button>
          </div>
          <div className="mt-[3px] border-primaryGrey social">
            <Link to="/product">
              <FaHome className="lg:block hidden icon mr-[17px] duration-500" />
            </Link>
            <Link to="/address">
              <FaMapMarkedAlt className="lg:block hidden icon mr-[17px] duration-500" />
            </Link>
            <div className="relative" ref={dropdownRef}>
              <FaUserTag
                onClick={handleUserTagClick}
                className="lg:block hidden icon mr-[16px] duration-500 cursor-pointer"
              />
              {isDropdownVisible && <ModalAuth />}
            </div>
          </div>
        </div>

        <div className="border-l-2 border-primaryGrey pl-2 mr-[1.6rem] social">
          <Slidebar />

          <a href="https://www.facebook.com/traicaguppysaigon?mibextid=LQQJ4d">
            <FaFacebook className="icon mr-[10px] duration-500" />
          </a>
          <a href="https://www.tiktok.com/@quanguppy68?_t=8muvYNlCqUz&_r=1">
            <IoLogoTiktok className="icon mr-[8px] duration-500" />
          </a>
          <div className="relative group" onClick={() => dispatch(toggleDrawerCart())}>
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: cartLocal.length > 0 ? [1, 0.9, 1] : 1 }}
              transition={{ duration: 0.5, repeat: 1, repeatType: "reverse" }}
              key={cartLocal.length}
            >
              <FaFishFins className="zalo-icon duration-500 text-white" />
            </motion.div>
            <div
              className={`flex w-[1.5rem] h-[1.5rem] text-primaryBlack items-center justify-center right-[7%] lg:right-[4%] lg:top-[-20%] top-[-35%] duration-300 text-center rounded-full absolute ${
                cartLocal.length > 0 ? "text-white bg-teal-700 border-0" : "bg-white border-2 "
              }`}
            >
              <div className="mt-[3px] lg:ml-[1px]">{cartLocal.length}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BubbleText = () => {
  return (
    <div className="font-sans text-teal-700 w-full text-xl min-[320px]:text-lg min-[321px]:text-[24px] min-[425px]:text-2xl min-[768px]:text-4xl z-10 lg:text-4xl font-thin">
      {"GUPPY HÓC MÔN".split("").map((child, idx) => (
        <span className=" cursor-pointer hoverText" key={idx}>
          {child}
        </span>
      ))}
    </div>
  );
};

export default Navbar;
