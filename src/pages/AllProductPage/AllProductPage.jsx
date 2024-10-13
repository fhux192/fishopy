// src/pages/AllProductPage/AllProductPage.jsx
import { useEffect, useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import ShiftingCountdown from "../../components/CountDown/ShiftingCountdown";
import SortSection from "./SortSection/SortSection";
import ProductsSection from "./ProductsSection/ProductsSection";
import { Pagination } from "antd";
import { callFetchProduct } from "../../services/api";
import "aos/dist/aos.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../../scss/navbar.scss";
import "../../scss/allProduct.scss";
import useColumns from "./utils/useColumns"; // Import custom hook
import { FaBoxesStacked, FaBoxOpen } from "react-icons/fa6";
import { useSelector } from "react-redux";

// Shuffle function using the Fisher-Yates algorithm
const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

// Hàm easing (easeInOutCubic)
const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// Hàm cuộn mượt mà lên đầu trang với khả năng can thiệp
const smoothScrollToTop = () => {
  const scrollDuration = 2000; // Thời gian cuộn (ms)
  const startPosition = window.scrollY;
  const startTime = performance.now();
  let animationFrameId;

  // Hàm kiểm tra sự can thiệp của người dùng
  const handleUserScroll = () => {
    cancelAnimationFrame(animationFrameId);
    removeEventListeners();
  };

  // Thêm các event listeners để phát hiện sự can thiệp
  const addEventListeners = () => {
    window.addEventListener("wheel", handleUserScroll, { passive: true });
    window.addEventListener("touchstart", handleUserScroll, { passive: true });
    window.addEventListener("keydown", handleUserScroll, { passive: true });
  };

  // Loại bỏ các event listeners khi kết thúc
  const removeEventListeners = () => {
    window.removeEventListener("wheel", handleUserScroll);
    window.removeEventListener("touchstart", handleUserScroll);
    window.removeEventListener("keydown", handleUserScroll);
  };

  // Hàm hoạt động của animation
  const scrollStep = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / scrollDuration, 1); // Giới hạn progress <= 1
    const ease = easeInOutCubic(progress); // Hàm easing
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

const AllProductPage = () => {
  const [selectedPurchaseOption, setSelectedPurchaseOption] =
    useState("single");
  const handlePurchaseOptionClick = (option) => {
    setSelectedPurchaseOption(option);
  };

  const {search} = useSelector((state) => state.account);

  const columns = useColumns();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(columns * 3);
  const [sortOption, setSortOption] = useState("");
  const [priceStage, setPriceStage] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  

  useEffect(() => {
    console.log('search', search);

    const fetchProducts = async () => {
      try {
        let current = currentPage;
        if(search != '') {
          current = 1;
          setCurrentPage(1);
        }
        
        const res = await callFetchProduct(current, pageSize, {
          sort: sortOption,
          name: search
        });
        
        if (res.vcode === 0) {
          let products = res.data.result;
          setAllProducts(products);
          setTotalProducts(res.data.meta.total);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProducts();
    document.title = "Tất Cả Sản Phẩm | Guppy Hóc Môn";
  }, [sortOption, currentPage, pageSize, search]);

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
    setPageSize(newPageSize);
    setCurrentPage(1);
  }, [columns]);

  // Thêm useEffect để cuộn mượt lên đầu trang mỗi khi currentPage thay đổi
  useEffect(() => {
    smoothScrollToTop();
  }, [currentPage]);

  const pageSizeOptions = useMemo(() => {
    const options = [];
    for (let i = 2; i <= 5; i++) {
      options.push(columns * i);
    }

    return options.filter((size) => size <= totalProducts);
  }, [columns, totalProducts]);

  const handlePageChange = (page, newPageSize) => {
    setCurrentPage(page);
    setPageSize(newPageSize);
    // Không cần gọi scroll ở đây vì đã xử lý trong useEffect
  };

  return (
    <motion.div className="min-h-screen bg-container">
      <div className="flex lg:pb-0 lg:mt-0 pt-[1rem] w-full justify-center whitespace-nowrap">
        <h1 className="p-1 px-3 bg-Black border-[1px] border-Grey2 text-White rounded-full mt-[4rem] lg:mt-20 font-bold cursor-default lg:text-[1.2rem] text-[0.9rem] text-center">
          SẢN PHẨM
        </h1>
      </div>
      <div className="lg:block md:block hidden">
        <ShiftingCountdown />
      </div>
      <div className="flex shadow-lg flex-col md:mt-[2rem] border-0 type-blur lg:mt-[0.6rem] mt-[0.2rem] items-center justify-center lg:p-4 py-4 w-full">
        <p className="font-bold cursor-default lg:text-[1.7rem] text-[1.5rem] text-white">
          Dành cho bạn
        </p>
        <div className="flex flex-col lg:flex-row lg:mt-[0.5rem] mt-[0rem] items-center gap-2">
          <p className="text-Grey2 cursor-default text-[1.25rem]">
            Bạn muốn mua như thế nào?
          </p>
          <div className="flex">
            <button
              onClick={() => handlePurchaseOptionClick("single")}
              className={`flex justify-center rounded-l-3xl w-[10rem] lg:w-[10.5rem] p-[0.5rem] lg:p-[0.55rem] lg:px-4 font-[500] ${
                selectedPurchaseOption === "single"
                  ? "bg-Black text-Teal cursor-default"
                  : "bg-Black2 text-Grey2"
              }`}
            >
              <div className="flex items-center gap-1">
                <FaBoxOpen />
                <p className="text-md font-[500]"> 1 Cặp theo loại</p>
              </div>
            </button>
            <button
              onClick={() => handlePurchaseOptionClick("combo")}
              className={`flex justify-center rounded-r-3xl w-[10rem] lg:w-[10.5rem] p-[0.5rem] lg:p-[0.55rem] lg:px-4 font-[500] ${
                selectedPurchaseOption === "combo"
                  ? "bg-Black text-Teal cursor-default"
                  : "bg-Black2 text-Grey2"
              }`}
            >
              <div className="flex items-center gap-1">
                <FaBoxesStacked />
                <p className="text-md font-[500]">Combo giá rẻ</p>
              </div>
            </button>
          </div>
        </div>
      </div>
      <SortSection sortOption={sortOption} setSortOption={setSortOption} />
      <ProductsSection
        currentPageProducts={allProducts}
        priceStage={priceStage}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
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
    </motion.div>
  );
};

export default AllProductPage;
