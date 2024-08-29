import { motion } from "framer-motion";
import { IoLogoTiktok } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { FaFishFins } from "react-icons/fa6";
import Slidebar from "../SliderBar/Slidebar.jsx";
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

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);
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
    if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
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
        className={`wrapper lg:px-[20px]  lg:mt-[1rem] lg:mx-[0] `}
        
      >
        <div className="lg:flex w-full lg:w-full min-[320px]:ml-12 lg:ml-0 sm:ml-14">
          <button
            className="flex lg:flex-0 lg:mr-[4.5%]"
            onClick={handleNavigation}
          >
            <BubbleText />
          </button>

          <div className=" duration-1000 lg:flex hidden flex-[2] items-center justify-end mr-[17px]"></div>
          <div className=" border-primaryGrey social">
            <Link to="/">
              <FaHome
                title="Trang Chủ "
                className="lg:block hidden icon mr-[17px] duration-500"
              />
            </Link>
            <Link to="/product">
              <FaFishFins
                title="Sản Phẩm"
                className="lg:block hidden icon mr-[17px] duration-500"
              />
            </Link>
            <Link to="/address">
              <FaMapMarkedAlt
                title="Địa Chỉ"
                className="lg:block hidden icon mr-[17px] duration-500"
              />
            </Link>
            <div className="border-l-4 border-primaryBlack pl-4 mr-[0rem]">
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
                  className=" zalo-icon duration-500 text-white"
                />
              </motion.div>
              <div
                className={`flex  border-primaryBlack font-bold w-[1.35rem] h-[1.25rem] text-primaryBlack items-center justify-center lg:right-[5%] right-[7%] lg:top-[-12%] top-[-35%] duration-500 text-center rounded-full absolute ${
                  user?.cart.reduce((acc, cur) => (acc += cur.quantity), 0) > 0
                    ? "text-white bg-teal-700 border-0"
                    : "bg-white border-2 "
                }`}
              >
                <div className="mt-[3px]  lg:ml-[1px]">
                  {" "}
                  1{user?.cart.reduce((acc, cur) => (acc += cur.quantity), 0)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:border-l-4 border-primaryBlack ml-2 pl-2 mr-[0rem] social">
          <Slidebar />
          <a
            href="https://www.tiktok.com/@quanguppy68?_t=8muvYNlCqUz&_r=1"
            target="_blank"
          >
            <IoLogoTiktok
              title="TikTok"
              className="icon mr-[8px] duration-500"
            />
          </a>
          <a
            href="https://www.youtube.com/channel/UCMnDPNFBmSwnlfPnPWN8zdw/?sub_confirmation=1"
            target="_blank"
          >
            <FaYoutube
              title="Youtube Guppy Hóc Môn"
              className="icon mr-[15px] duration-500"
            />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const BubbleText = () => {
  return (
    <div className="font-sans mt-[1px] ml-[15px] text-white lg:text-primaryBlack w-full text-2xl min-[320px]:text-[1.6rem] min-[381px]:text-[1.8rem] min-[425px]:text-3xl  min-[768px]:text-4xl z-10 lg:text-4xl font-thin">
      {"GUPPY HÓC MÔN".split("").map((child, idx) => (
        <span className=" cursor-pointer hoverText" key={idx}>
          {child}
        </span>
      ))}
    </div>
  );
};

export default Navbar;
