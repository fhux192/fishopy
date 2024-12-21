import { motion } from "framer-motion";
import { FaYoutube } from "react-icons/fa";
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
        // gõ từng ký tự
        if (typedText.length < currentString.length) {
          setTypedText((prev) => prev + currentString.charAt(prev.length));
        } else {
          // gõ xong => chuyển sang pause
          setDirection("pausing");
          setPauseCount(0);
        }
      } else if (direction === "deleting") {
        // xóa từng ký tự
        if (typedText.length > 0) {
          setTypedText((prev) => prev.slice(0, -1));
        } else {
          // xóa hết => chuyển sang placeholder tiếp theo
          setDirection("typing");
          setIndexPlaceholder((prev) => (prev + 1) % typedPlaceholders.length);
        }
      } else if (direction === "pausing") {
        // tạm dừng 1 lúc trước khi xóa
        const pauseDuration = 50; // 10 * 100ms = 1s (bạn có thể tăng/giảm)
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

  // Kiểm tra số lượng sản phẩm trong giỏ
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

                <div style={{ color: "#f0f6f5" }} className="">
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
                  onClick={() => dispatch(toggle("drawerCart"))}
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{
                      scale: cartQuantity > 0 ? [1, 0.9, 1] : 1,
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
                      className={`bag-icon duration-500 text-White ${
                        cartQuantity > 0 ? "cart-notify" : ""
                      }`}
                    />
                  </motion.div>
                  <div
                    className={`flex font-bold bg-Teal3 text-white  w-[1.35rem] h-[1.15rem] items-center justify-center lg:right-[5%] right-[7%] lg:top-[-35%] top-[-35%] duration-500 rounded-md absolute `}
                  >
                    <div className="">{cartQuantity}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:border-l-[1px] border-primaryBlack mr-[0rem] social">
              <a
                href="https://www.tiktok.com/@quanguppy68?_t=8muvYNlCqUz&_r=1"
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
            <div className="flex w-[100%] lg:w-[35rem] mt-1 active:text-Teal text-white lg:ml-2 items-center">
              <input
                type="text"
                id="search-input" // KHÔNG ĐưỢC XÓA ID NÀY
                placeholder={typedText}
                onChange={(e) => {
                  debouncedSearch(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                className={`rounded-xl h-8 mt-2 text-Teal3 font-bold mx-8 shadow-md border-none ${
                  isNavbarVisible ? "pt-[0.1rem]" : "pt-[0.3rem]"
                } mobile-input`}
                style={{
                  backgroundColor: "#fff",
                  outline: "none",
                  border: "none",
                  width: "100%",
                  fontSize: "16px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  borderRadius: "4px",
                }}
              />
            </div>
          )}
        </div>
      </div>

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

          /* 
            Thời gian animation: 5.5s 
            0% - 50% (0-0.5s): lắc 
            50% - 100% (0.5-5.5s): đứng yên 
            Lặp vô hạn => cứ 5.5s lắc 1 lần
          */
          .cart-notify {
            animation: wiggleLoop 7.5s infinite;
          }
        `}
      </style>
    </motion.div>
  );
};

export default Navbar;
