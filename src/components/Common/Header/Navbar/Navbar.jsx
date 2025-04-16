import { motion } from "framer-motion";
import { FaYoutube, FaSearch } from "react-icons/fa";
import { FaFishFins } from "react-icons/fa6";
import "@scss/navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaMapMarkedAlt, FaUserTag } from "react-icons/fa";
import ModalAuth from "@components/Auth/ModalAuth/ModalAuth.jsx";
import { FaBagShopping } from "react-icons/fa6";
import { toggle } from "@redux/features/toggle/toggleSlice.js";
import tiktok from "@assets/icon/tik-tok.png";
import { setSearch } from "@redux/features/user/userSlice";
import { debounce } from "lodash";
import { setSearchRef } from "@redux/features/user/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, search } = useSelector((state) => state.account);
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);

  const typedPlaceholders = [
    "Tìm kiếm cá...",
    "Cá Koi Red Ear",
    "Tìm kiếm cá...",
    "Cá Full Gold",
    "Tìm kiếm cá...",
    "Cá Blue Tazan",
    "Tìm kiếm cá...",
    "Cá Full Black",
  ];
  const [typedText, setTypedText] = useState("");
  const [indexPlaceholder, setIndexPlaceholder] = useState(0);
  const [direction, setDirection] = useState("typing");
  const [pauseCount, setPauseCount] = useState(0);

  useEffect(() => {
    const typingSpeed = 100; // tốc độ gõ (ms)
    const interval = setInterval(() => {
      const currentString = typedPlaceholders[indexPlaceholder] || "";

      if (direction === "typing") {
        if (typedText.length < currentString.length) {
          setTypedText((prev) => prev + currentString.charAt(prev.length));
        } else {
          setDirection("pausing");
          setPauseCount(0);
        }
      } else if (direction === "deleting") {
        if (typedText.length > 0) {
          setTypedText((prev) => prev.slice(0, -1));
        } else {
          setDirection("typing");
          setIndexPlaceholder((prev) => (prev + 1) % typedPlaceholders.length);
        }
      } else if (direction === "pausing") {
        const pauseDuration = 50;
        if (pauseCount < pauseDuration) {
          setPauseCount((p) => p + 1);
        } else {
          setDirection("deleting");
        }
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [typedText, indexPlaceholder, direction, pauseCount, typedPlaceholders]);

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

  const debouncedSearch = useCallback(
    debounce((value) => {
      dispatch(setSearch(value));
    }, 400),
    [dispatch]
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/product");
    }
  };

  const cartQuantity = user.cart.length;

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
            className={`wrapper lg:shadow-none lg:px-[20px] lg:mt-[1.5rem] lg:mx-[0]`}
          >
            <div className="lg:flex gap-[0.5rem] w-full lg:ml-0">
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
              <div className="flex justify-start lg:justify-end w-full"></div>

              <div className="rounded-xl nav-blur px-3 border-primaryGrey social">
                {items.map((item) => (
                  <div
                    className={`lg:block hidden icon-navigate mr-[17px] duration-500 ${
                      (item.name === "Trang Chủ" && location.pathname === "/") ||
                      (item.name === "Sản Phẩm" && location.pathname === "/product") ||
                      (item.name === "Địa Chỉ" && location.pathname === "/address")
                        ? "text-white"
                        : "text-gray-300"
                    }`}
                    key={item.name}
                    onClick={() => handleNavigation(item.name)}
                    title={item.name}
                  >
                    {item.icon}
                  </div>
                ))}

                <div style={{ color: "#f0f6f5" }} className="">
                  <div className="relative" ref={dropdownRef}>
                    <FaUserTag
                      title="Tài Khoản"
                      onClick={handleUserTagClick}
                      className="lg:block hidden icon mr-2 duration-500 cursor-pointer"
                    />
                    {isDropdownVisible && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ModalAuth />
                      </motion.div>
                    )}
                  </div>
                </div>
                <div
                  className="relative lg:block hidden group"
                  onClick={() => dispatch(toggle("drawerCart"))}
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{
                      scale: cartQuantity > 0 ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: 1,
                      repeatType: "reverse",
                    }}
                    key={cartQuantity}
                  >
                    <FaBagShopping
                      title="Giỏ Hàng"
                      className={`bag-icon duration-500 text-white ${
                        cartQuantity > 0 ? "cart-notify" : ""
                      }`}
                    />
                  </motion.div>
                  <div
                    className={`flex font-bold bg-Teal3 text-white w-[1.35rem] h-[1.15rem] items-center justify-center lg:right-[5%] right-[7%] lg:top-[-35%] top-[-35%] duration-500 rounded-md absolute`}
                  >
                    <div className="">{cartQuantity}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:border-l-[1px] border-primaryBlack mr-[0rem] social">
              <a
                href="https://www.tiktok.com/@quangupy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={tiktok}
                  title="TikTok"
                  className="lg:hidden block w-[38px] h-[38px] p-1 bg-white rounded-lg object-contain mr-10 duration-500"
                />
              </a>
              <a
                href="https://www.youtube.com/channel/UCMnDPNFBmSwnlfPnPWN8zdw/?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube
                  title="Youtube Guppy Hóc Môn"
                  className="lg:hidden block w-[42px] h-[38px] text-Red bg-white rounded-lg p-1 mr-2 duration-500"
                />
              </a>
            </div>
          </div>
          {location.pathname === "/product" && (
            <div className="w-[100%] lg:w-[35rem] w-[20.5rem] lg:ml-3 mt-1">
              <div className="relative">
                <input
                  type="text"
                  id="search-input" // KHÔNG ĐƯỢC XÓA ID NÀY
                  placeholder={typedText}
                  onChange={(e) => {
                    debouncedSearch(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                  className="w-full rounded-xl h-8 mt-4 text-Teal3 font-bold shadow-md border-none pl-10 pr-4"
                  style={{
                    backgroundColor: "#fff",
                    outline: "none",
                    border: "none",
                    fontSize: "16px",
                  }}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/5 text-gray-400" />
              </div>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }

          .cart-notify {
            animation: pulse 2s infinite;
          }
        `}
      </style>
    </motion.div>
  );
};

export default Navbar;