import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShiftingCountdown from "@components/Common/CountDown/ShiftingCountdown";
import SortSection from "./SortSection/SortSection";
import ProductsSection from "./ProductsSection/ProductsSection";
import { message, Pagination } from "antd";
import "aos/dist/aos.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "@scss/navbar.scss";
import "@scss/allProduct.scss";
import useColumns from "./utils/useColumns";
import { FaBoxesStacked, FaBoxOpen } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import CombosSection from "./CombosSection/CombosSection";
import {
  free_getProducts_byFields,
  free_getCombos_byFields,
} from "@services/api";
import { setSearch } from "../../../redux/features/user/userSlice";

const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const smoothScrollToTop = () => {
  const scrollDuration = 2000;
  const startPosition = window.scrollY;
  const startTime = performance.now();
  let animationFrameId;

  const handleUserScroll = () => {
    cancelAnimationFrame(animationFrameId);
    removeEventListeners();
  };

  const addEventListeners = () => {
    window.addEventListener("wheel", handleUserScroll, { passive: true });
    window.addEventListener("touchstart", handleUserScroll, { passive: true });
    window.addEventListener("keydown", handleUserScroll, { passive: true });
  };

  const removeEventListeners = () => {
    window.removeEventListener("wheel", handleUserScroll);
    window.removeEventListener("touchstart", handleUserScroll);
    window.removeEventListener("keydown", handleUserScroll);
  };

  const scrollStep = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / scrollDuration, 1);
    const ease = easeInOutCubic(progress);
    window.scrollTo(0, startPosition * (1 - ease));

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(scrollStep);
    } else {
      removeEventListeners();
    }
  };

  addEventListeners();
  animationFrameId = requestAnimationFrame(scrollStep);
};

// Define animation variants
const buttonVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

const AllProductPage = () => {
  const [selectedPurchaseOption, setSelectedPurchaseOption] =
    useState("single");
  const dispatch = useDispatch();
  const handlePurchaseOptionClick = (option) => {
    setSelectedPurchaseOption(option);
    setPage(1);
    const inputRef = document.getElementById("search-input");
    if (inputRef) {
      inputRef.value = "";
      dispatch(setSearch(""));
    }
  };

  const { search } = useSelector((state) => state.account);
  const columns = useColumns();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(columns * 3);
  const [sortOption, setSortOption] = useState({});
  const [priceStage, setPriceStage] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  const getProducts = async (query, sort, limit, page) => {
    try {
      let q = { ...query };
      const res = await free_getProducts_byFields(q, sort, limit, page);
      if (res.vcode !== 0) {
        return message.error(res.msg);
      }

      if (Object.keys(sort).length === 0) {
        setAllProducts(res.data.sort(() => Math.random() - 0.5));
      } else {
        setAllProducts(res.data);
      }

      setTotalProducts(res.total);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getCombos = async (query, sort, limit, page) => {
    try {
      let q = { ...query };
      const res = await free_getCombos_byFields(q, sort, limit, page);
      if (res.vcode !== 0) {
        return message.error(res.msg);
      }
      if (Object.keys(sort).length === 0) {
        setAllProducts(res.data.sort(() => Math.random() - 0.5));
      } else {
        setAllProducts(res.data);
      }
      setTotalProducts(res.total);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    setAllProducts([]);
    let query = {};
    if (search) {
      query = {
        $text: {
          $search: search,
        },
      };
    }
    if (selectedPurchaseOption === "single") {
      getProducts(query, sortOption, limit, page);
    } else if (selectedPurchaseOption === "combo") {
      getCombos(query, sortOption, limit, page);
    }

    document.title = "Tất Cả Sản Phẩm | Guppy Hóc Môn";
  }, [sortOption, search, selectedPurchaseOption]);

  useEffect(() => {
    const cyclePrices = () => {
      setPriceStage(0);
      setTimeout(() => setPriceStage(1), 1000);
      setTimeout(() => setPriceStage(2), 2000);
      setTimeout(() => setPriceStage(0), 7000);
    };

    cyclePrices();
    const interval = setInterval(cyclePrices, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newPageSize = columns * 3;
    setLimit(newPageSize);
    setPage(1);
  }, [columns]);

  useEffect(() => {
    smoothScrollToTop();
  }, [page]);

  const pageSizeOptions = useMemo(() => {
    const options = [];
    for (let i = 2; i <= 5; i++) {
      options.push(columns * i);
    }

    return options.filter((size) => size <= totalProducts);
  }, [columns, totalProducts]);

  const handlePageChange = (page, newPageSize) => {
    setPage(page);
    setLimit(newPageSize);

    if (selectedPurchaseOption == "single") {
      getProducts({}, sortOption, newPageSize, page);
    } else {
      getCombos({}, sortOption, newPageSize, page);
    }
  };

  return (
    <motion.div className="min-h-screen bg-container">
      <div className="flex lg:pb-0 lg:mt-0 pt-[3rem] w-full items-center justify-center whitespace-nowrap">
        <h1 className=" text-white rounded-full  mt-[4.5rem] lg:mt-[6.5rem] font-bold cursor-default lg:text-[1.2rem] text-[1.3rem] text-center"></h1>
      </div>
      <div className="lg:block md:block hidden">
        <ShiftingCountdown />
      </div>
      <div className="flex w-full justify-center">
        <div className="flex w-full md:px-[10rem] md:rounded-3xl lg:rounded-3xl  flex-col border-0 md:mt-0  items-center justify-center py-[1.4rem] ">
          <div className="nav-blur px-4 md:mt-[1.5rem] lg:mt-[1.5rem] lg:rounded-full rounded-3xl text-center">
            <p
              style={{
                backgroundImage:
                  "linear-gradient(50deg,#fff, #09D1C7, #fff, #46DFB1 ,#fff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% auto",
                animation: "gradientCycle 10s infinite",
              }}
              className="font-[800] cursor-default lg:text-[1.9rem] text-[1.7rem] text-white"
            >
              Dành Cho Bạn
            </p>
          </div>

          {/* Button chọn loại mua với hiệu ứng */}
          <div className="flex flex-col lg:flex-row lg:mt-[0.7rem] mt-[0rem] items-center gap-2">
            <p className="text-White font-bold cursor-default text-[1.125rem] lg:text-[1.25rem]">
              Bạn muốn mua như thế nào?
            </p>
            <div className="flex">
              <AnimatePresence mode="wait">
                <motion.button
                  key="single"
                  onClick={() => handlePurchaseOptionClick("single")}
                  className={`flex justify-center rounded-l-xl lg:w-[11.5rem] p-[0.5rem] lg:p-[0.55rem] lg:px-4 font-[500] ${
                    selectedPurchaseOption === "single"
                      ? "bg-Black text-Teal3 font-[700] cursor-default"
                      : "bg-Black2 text-Grey2"
                  }`}
                  variants={buttonVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-1">
                    <FaBoxOpen />
                    <p className="text-md px-1">1 Cặp theo loại</p>
                  </div>
                </motion.button>
                <motion.button
                  key="combo"
                  onClick={() => handlePurchaseOptionClick("combo")}
                  className={`flex justify-center rounded-r-xl lg:w-[11.5rem] p-[0.5rem] lg:p-[0.55rem] lg:px-4 font-[500] ${
                    selectedPurchaseOption === "combo"
                      ? "bg-Black text-Teal3 font-[700] cursor-default"
                      : "bg-Black2 text-Grey2"
                  }`}
                  variants={buttonVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-1">
                    <FaBoxesStacked />
                    <p className="text-md px-1">Combo giá rẻ</p>
                  </div>
                </motion.button>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <SortSection sortOption={sortOption} setSortOption={setSortOption} />
      {selectedPurchaseOption === "single" ? (
        <ProductsSection
          currentPageProducts={allProducts}
          priceStage={priceStage}
          selectedPurchaseOption={selectedPurchaseOption}
        />
      ) : (
        <CombosSection
          currentPageProducts={allProducts}
          priceStage={priceStage}
          selectedPurchaseOption={selectedPurchaseOption}
        />
      )}
      <Pagination
        current={page}
        pageSize={limit}
        total={totalProducts}
        onChange={handlePageChange}
        pageSizeOptions={pageSizeOptions}
        style={{
          marginTop: "0.5rem",
          paddingBottom: "1.25rem",
          display: "flex",
          justifyContent: "center",
        }}
      />

      <style>
        {`
          @keyframes gradientCycle {
            0% {
              background-position: 0% 50%;
            }
            30% {
              background-position: 100% 50%;
            }
            70% {
              background-position: 0% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
    </motion.div>
  );
};

export default AllProductPage;