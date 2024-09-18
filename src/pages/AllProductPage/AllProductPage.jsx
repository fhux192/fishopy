// src/pages/AllProductPage/AllProductPage.jsx
import { useEffect, useState, useMemo } from "react";
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

const AllProductPage = () => {
  const [selectedPurchaseOption, setSelectedPurchaseOption] = useState("single");
  const handlePurchaseOptionClick = (option) => {
    setSelectedPurchaseOption(option);
  };

  const columns = useColumns(); // Get the current number of columns

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(columns * 3);
  const [sortOption, setSortOption] = useState("random");
  const [priceStage, setPriceStage] = useState(0);
  const [allProducts, setAllProducts] = useState([]); // State to hold all products
  const [currentPageProducts, setCurrentPageProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all products at once
        const res = await callFetchProduct(1, 1000, sortOption); // Adjust 1000 to your maximum expected number of products
        if (res.vcode === 0) {
          let products = res.data.result;
          products = shuffleArray(products); // Shuffle the products
          setAllProducts(products);
          setTotalProducts(products.length);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProducts();
    document.title = "Tất Cả Sản Phẩm | Guppy Hóc Môn";
  }, [sortOption]); // Re-fetch and shuffle when sortOption changes

  useEffect(() => {
    // Update current page products when page, pageSize, or allProducts change
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setCurrentPageProducts(allProducts.slice(startIndex, endIndex));
  }, [currentPage, pageSize, allProducts]);

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
  };

  return (
    <motion.div
      className="min-h-screen bg-container"
      initial={{ y: "100vh", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex lg:pb-0 lg:mt-0 mt-[1rem] w-full justify-center whitespace-nowrap">
        <h1 className="p-1 px-2 text-Teal rounded-full border-Teal2 mt-[4rem] lg:mt-20 border-2 font-bold cursor-default lg:text-[1.2rem] text-[0.9rem] text-center border-b-2">
          SẢN PHẨM
        </h1>
      </div>
      <ShiftingCountdown />
      <div className="flex flex-col md:mt-[2rem] bg-Teal3 lg:mt-[0.6rem] mt-[0.4rem] items-center justify-center lg:p-6 py-4 w-full ">
        <p className="font-bold lg:text-[1.7rem] text-[1.5rem] text-Black">Dành cho bạn</p>
        <div className="flex flex-col lg:flex-row lg:mt-[0.5rem] mt-[0rem] items-center gap-2">
          <p className="font-semibold text-Grey text-[1.25rem]">Bạn mua như thế nào?</p>
          <div className="flex gap-2">
            <button
              onClick={() => handlePurchaseOptionClick("single")}
              className={`flex justify-center rounded-full w-[10rem] lg:w-[10rem] p-[0.5rem] lg:p-[0.55rem] lg:px-4 font-[500] ${
                selectedPurchaseOption === "single"
                  ? "bg-Teal text-white"
                  : "bg-bordercl text-Grey"
              }`}
            >
              <p className="text-md font-[500]">1 Cặp theo loại</p>
            </button>
            <button
              onClick={() => handlePurchaseOptionClick("combo")}
              className={`flex justify-center rounded-full w-[10rem] lg:w-[10rem] p-[0.5rem] lg:p-[0.55rem] lg:px-4 font-[500] ${
                selectedPurchaseOption === "combo"
                  ? "bg-Black text-Teal"
                  : "bg-bordercl text-Grey"
              }`}
            >
              <p className="text-md font-[500]">Combo nhiều cặp</p>
            </button>
          </div>
        </div>
      </div>
      <SortSection sortOption={sortOption} setSortOption={setSortOption} />
      <ProductsSection
        currentPageProducts={currentPageProducts}
        priceStage={priceStage}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalProducts} // Use totalProducts from state
        onChange={handlePageChange}
        pageSizeOptions={pageSizeOptions}
        style={{
          marginTop: "0.5rem",
          paddingBottom: "2rem",
          textAlign: "center",
        }}
      />
    </motion.div>
  );
};

export default AllProductPage;
