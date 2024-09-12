import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import { Link } from "react-router-dom";
import { FaSortAmountDown, FaSortAmountUp, FaCartPlus } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Data from "../data/Data";
import Pagination from "../components/Pagination/Pagination";
import ShiftingCountdown from "../components/CountDown/ShiftingCountdown";
import "aos/dist/aos.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../scss/navbar.scss";
import "../scss/allProduct.scss";
import { callFetchProduct } from "../services/api";

const sortProducts = (products, option) => {
  const sortFunctions = {
    default: (a, b) => 0,
    priceAsc: (a, b) => a.price - b.price,
    priceDesc: (a, b) => b.price - a.price,
    titleAsc: (a, b) => a.title.localeCompare(b.title),
    titleDesc: (a, b) => b.title.localeCompare(a.title),
  };
  return products.sort(sortFunctions[option]);
};

const formatPrice = (price) =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const ProductCard = ({ product, priceStage, animationDelay }) => {
  const discountPercentage =
    ((product.price - product.discountedPrice) / product.price) * 100;

  const handleAddToCart = (event) => {
    alert("Add to cart logic here");
    // Add to cart logic here
  };

  return (
    <div
      className={`product-card`}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <Link
        to={`/fish/${product._id}`}
        key={product._id}
        className="image-wrapper"
      >
        <LazyLoadImage
          src={
            import.meta.env.VITE_BASE_URL + "/images/fish/" + product.images[0]
          }
          effect="blur"
          className="rounded-t-3xl "
        />
        <div className="text-content">
          <h2 className="title">{product.name}</h2>
          <div className="h-full w-full flex  items-center">
            <p>
              {product.price === product.discountedPrice ? (
                <span>{product.price}₫</span>
              ) : (
                <>
                  {priceStage === 0 && <span>{product.price}₫</span>}
                  {priceStage === 1 && (
                    <span className="line-through">{product.price}₫</span>
                  )}
                  {priceStage === 2 && (
                    <span>{formatPrice(product.discountedPrice)}₫</span>
                  )}
                </>
              )}
            </p>
            {product.price !== product.discountedPrice && (
              <div className="discount">
                <div className="flex">-{Math.round(discountPercentage)}%</div>
              </div>
            )}
          </div>
        </div>
        <div onClick={handleAddToCart} className="add-to-cart">
        <FaCartPlus /> Mua ngay
      </div>
      </Link>
    
    </div>
  );
};

const SortSection = ({ sortOption, setSortOption }) => {
  const sortButtons = [
    { option: "default", label: "Mặc Định" },
    {
      option: "priceDesc",
      label: "Cao - Thấp",
      icon: <FaSortAmountDown className="mr-2" />,
    },
    {
      option: "priceAsc",
      label: "Thấp - Cao",
      icon: <FaSortAmountUp className="mr-2" />,
    },
    { option: "titleAsc", label: "Tên từ A - Z" },
    { option: "titleDesc", label: "Tên từ Z - A" },
  ];

  return (
    <div className="flex w-full justify-center">
      <div className="sort-section">
        <div className="sort-buttons">
          {sortButtons.map(({ option, label, icon }) => (
            <button
              key={option}
              className={`sort-button ${
                sortOption === option ? "selected" : "unselected"
              }`}
              onClick={() => setSortOption(option)}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductsSection = ({ currentPageProducts, priceStage }) => {
  return (
    <div className=" lg:bg-transparent pb-4">
      <div className="product-section rounded-xl">
        <div className="product-container">
          <div className="flex w-full justify-center">
            <div className=" product-grid grid gap-4 lg:mx-0">
              {currentPageProducts.map((product, index) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  priceStage={priceStage}
                  animationDelay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AllProductPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortOption, setSortOption] = useState("default");
  const [priceStage, setPriceStage] = useState(0);
  const [currentPageProducts, setCurrentPageProducts] = useState([]);

  const productsPerPage = 15;

  const sortedProducts = useMemo(
    () => sortProducts([...Data], sortOption),
    [sortOption]
  );

  useEffect(() => window.scrollTo(0, 0), [currentPage]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await callFetchProduct(currentPage, pageSize);
        if (res.vcode === 0) {
          setCurrentPageProducts(res.data.result);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProducts();
    document.title = "Tất Cả Sản Phẩm | Guppy Hóc Môn";
  }, [currentPage, pageSize]);

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

  return (
    <motion.div
      className="min-h-screen"
      initial={{ y: "100vh", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex pt-10 lg:pb-0 w-full justify-center whitespace-nowrap">
        <h1 className="p-1 px-2 text-Teal rounded-full border-Vio  mt-[4rem] lg:mt-20 border-2 font-bold cursor-default lg:text-[1.2rem] text-[0.9rem] text-center border-b-2">
          SẢN PHẨM
        </h1>
      </div>
      <ShiftingCountdown />
      <SortSection sortOption={sortOption} setSortOption={setSortOption} />
      <ProductsSection
        currentPageProducts={currentPageProducts}
        priceStage={priceStage}
      />
      <Pagination
        totalPost={Data.length}
        postPerPage={productsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </motion.div>
  );
};

export default AllProductPage;
