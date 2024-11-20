import { motion } from "framer-motion";
import { IoLogoTiktok } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { FaFishFins } from "react-icons/fa6";
import "../../../scss/navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef, useCallback } from "react";
import "../../../scss/bubble.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaMapMarkedAlt, FaUserTag } from "react-icons/fa";
import ModalAuth from "../../Modal/ModalAuth/ModalAuth.jsx";
import { FaBagShopping } from "react-icons/fa6";
import { toggleDrawerCart } from "../../../redux/features/toggle/toggleSlice.js";
import tiktok from "../../../assets/icon/tik-tok.png";
import { setSearch } from "../../../redux/features/user/userSlice";
import Search from "antd/es/transfer/search.js";
import { debounce } from "lodash";
import { Input } from "antd";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, search } = useSelector((state) => state.account);
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to get the current path
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
    if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
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

  // Create a debounced function
  const debouncedSearch = useCallback(
    debounce((value) => {
      dispatch(setSearch(value));
    }, 400), // 400 milliseconds delay
    [dispatch]
  );

  return (
    <motion.div
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: isNavbarVisible ? 0 : -85 }}
      transition={{ type: "spring", stiffness: 1000, damping: 30 }}
      style={{ position: "fixed", width: "100%", top: 0, zIndex: 1000 }}
    >
      <div>
        <div className="flex flex-col items-center">
          <div
            className={`wrapper lg:shadow-none lg:px-[20px] lg:mt-[1.5rem] lg:mx-[0] `}
          >
            <div className="lg:flex gap-[0.5rem] w-full lg:ml-0 ">
              <div className="flex justify-start w-full lg:flex-0 lg:ml-[1%]">
                <div className="flex rounded-xl nav-blur px-3 items-center">
                  <button
                    onClick={() => handleNavigation("Trang Chủ")}
                    className="logo text-white"
                  >
                    GuppyHócMôn
                  </button>
                </div>
              </div>
              <div className="flex justify-start lg:justify-end w-full"> </div>

              <div className="rounded-xl nav-blur px-3 border-primaryGrey social">
                {items.map((item) => (
                  <div
                    className={`lg:block hidden icon-navigate text-primaryBlack mr-[17px] duration-500 ${
                      (item.name === "Trang Chủ" &&
                        location.pathname === "/") ||
                      (item.name === "Sản Phẩm" &&
                        location.pathname === "/product") ||
                      (item.name === "Địa Chỉ" &&
                        location.pathname === "/address")
                        ? "text-white"
                        : "text-White"
                    }`}
                    key={item.name}
                    onClick={() => handleNavigation(item.name)}
                  >
                    {item.icon}
                  </div>
                ))}

                <div
                  style={{ color: "#f0f6f5" }}
                  className=""
                >
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
                        user?.cart.reduce(
                          (acc, cur) => (acc += cur.quantity),
                          0
                        ) > 0
                          ? [1, 0.9, 1]
                          : 1,
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: 1,
                      repeatType: "reverse",
                    }}
                    key={user?.cart.reduce(
                      (acc, cur) => (acc += cur.quantity),
                      0
                    )}
                  >
                    <FaBagShopping
                      title="Giỏ Hàng"
                      className=" bag-icon duration-500 text-White"
                    />
                  </motion.div>
                  <div
                    className={`flex font-bold w-[1.35rem] h-[1.25rem] items-center justify-center lg:right-[5%] right-[7%] lg:top-[-35%] top-[-35%] duration-500 rounded-md absolute ${
                      user?.cart.reduce(
                        (acc, cur) => (acc += cur.quantity),
                        0
                      ) > 0
                        ? "text-White bg-Teal border-0"
                        : "bg-white text-Grey "
                    }`}
                  >
                    <div className="">
                      {user
                        ? user.cart.reduce((acc, cur) => acc + cur.quantity, 0)
                        : JSON.parse(localStorage.getItem("cart"))?.reduce(
                            (acc, cur) => acc + cur.quantity,
                            0
                          )}
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
                  className="lg:hidden block w-[38px] h-[38px]  text-red-600 bg-white rounded-lg p-1 lg:mr-[15px] md:mr-10 mr-10 duration-500"
                />
              </a>
              <a
                href="https://www.youtube.com/channel/UCMnDPNFBmSwnlfPnPWN8zdw/?sub_confirmation=1"
                target="_blank"
              >
                <FaYoutube
                  title="Youtube Guppy Hóc Môn"
                  className="lg:hidden block w-[42px] h-[38px] text-Red bg-white rounded-lg p-1 lg:mr-[15px] mr-2 duration-500"
                />
              </a>
            </div>
          </div>
          {location.pathname === "/product" && ( // Conditionally render the Input based on the current path
            <div className="flex w-[100%] lg:w-[35rem] mt-1 active:text-Teal text-white lg:ml-2  items-center">
              <Input
                placeholder="Tìm kiếm cá..."
                loading
                enterButton
                onChange={(e) => {
                  debouncedSearch(e.target.value);
                }}
                className={`lg:rounded-md h-8 mt-2 text-teal-500 font-bold mx-8 shadow-md border-none ${
                  isNavbarVisible ? "pt-[0.22rem]" : "pt-[0.42rem]"
                } mobile-input`}
                onPressEnter={(e) => {
                  if (e.key === "Enter") {
                    navigate("/product");
                  }
                }}
                style={{ textTransform: "uppercase" }}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
