import { motion } from "framer-motion";
import { FaFacebook } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { FaFishFins } from "react-icons/fa6";
import Slidebar from "../SliderBar/Slidebar.jsx";
import "../../../scss/navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawerCart, toggleModalLogin, toggleModalRegister } from "../../../redux/features/toggle/toggleSlice.js";
import { useEffect, useState, useRef } from "react";
import "../../../scss/bubble.scss";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaHome, FaMapMarkedAlt, FaUserTag } from "react-icons/fa";
import { toast } from "react-toastify";
import { logout } from "../../../redux/features/user/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const cartLocal = useSelector((state) => state.user.cartLocal);
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleNavigation = () => {
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Đăng xuất thành công");
    setIsDropdownVisible(false);
  };

  const handleUserTagClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fishIconVariants = {
    initial: { scale: 1 },
    animate: { scale: [1, 0.9, 1] },
  };

  return (
    <div className="navbar">
      <motion.div className="wrapper bg-white lg:fixed lg:px-[20px] lg:mt-[0.5rem] lg:rounded-xl lg:w-[85%] lg:border-2 border-b-2 border-gray-150 lg:mx-[7.5%]">
        <motion.span className="lg:flex lg:w-full min-[320px]:ml-12 lg:ml-0 sm:ml-14">
          <button
            className="flex mb-[3px] lg:flex-0 lg:mr-[4.5%]"
            onClick={handleNavigation}
          >
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
            <a href="/product">
              <FaHome className="lg:block hidden icon mr-[17px] duration-500" />
            </a>
            <a href="/address">
              <FaMapMarkedAlt className="lg:block hidden icon mr-[17px] duration-500" />
            </a>
            <div className="relative" ref={dropdownRef}>
              <FaUserTag
                onClick={handleUserTagClick}
                className="lg:block hidden icon mr-[16px] duration-500 cursor-pointer"
              />
              {isDropdownVisible && (
                <div className="absolute top-full right-0 mt-4 w-48 bg-white border-2 border-gray-100 rounded-xl">
                  {userInfo ? (
                    <>
                      <button
                        onClick={() => navigate("/order-history")}
                        className="block px-4 py-2 text-primaryBlack hover:bg-teal-700 hover:text-white rounded-t-xl w-full text-left"
                      >
                        Lịch Sử Đơn Hàng
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-primaryBlack border-t-2 border-gray-100 hover:bg-teal-700 hover:text-white rounded-b-xl w-full text-left"
                      >
                        Đăng Xuất
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => dispatch(toggleModalLogin())}
                        className=" block px-4 py-2 text-primaryBlack hover:bg-teal-800 hover:text-white rounded-t-xl w-full text-left"
                      >
                        Đăng Nhập
                      </button>
                      <button
                        onClick={() => dispatch(toggleModalRegister())}
                        className="block px-4 py-2 text-primaryBlack border-t-2 border-gray-100 hover:bg-teal-800 hover:text-white rounded-b-xl w-full text-left"
                      >
                        Đăng Ký
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.span>

        <div className="border-l-2 border-primaryGrey pl-4 social">
          <Slidebar />

          <a href="https://www.facebook.com/traicaguppysaigon?mibextid=LQQJ4d">
            <FaFacebook className="icon mr-[10px] duration-500" />
          </a>
          <a href="https://www.tiktok.com/@quanguppy68?_t=8muvYNlCqUz&_r=1">
            <IoLogoTiktok className="icon mr-[8px] duration-500" />
          </a>
          <div
            className="relative group"
            onClick={() => dispatch(toggleDrawerCart())}
          >
            <motion.div
              variants={fishIconVariants}
              initial="initial"
              animate={cartLocal.length > 0 ? "animate" : "initial"}
              transition={{ duration: 0.5, repeat: 1, repeatType: "reverse" }}
              key={cartLocal.length}
            >
              <FaFishFins className="zalo-icon duration-500 text-white" />
            </motion.div>
            <div
              className={`flex w-[1.5rem] h-[1.5rem] text-primaryBlack items-center justify-center right-[7%] lg:top-[-25%] top-[-35%] duration-300 text-center rounded-full absolute ${
                cartLocal.length > 0
                  ? "text-white bg-teal-700 border-0"
                  : "bg-white border-2 "
              }`}
            >
              <div className="mt-[3px] lg:ml-[1px]">{cartLocal.length}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const BubbleText = () => {
  return (
    <div className= "font-sans text-teal-700 w-full text-xl min-[320px]:text-lg min-[321px]:text-xl min-[425px]:text-2xl min-[768px]:text-4xl z-10 lg:text-4xl font-thin">
      {"GUPPY HÓC MÔN".split("").map((child, idx) => (
        <span className="cursor-pointer hoverText" key={idx}>
          {child}
        </span>
      ))}
    </div>
  );
};

export default Navbar;
