/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { FaSortAmountDown, FaSortAmountUp, FaCartPlus } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Data from "../data/Data";
import Pagination from "../components/Pagination/Pagination";
import ShiftingCountdown from "../components/CountDown/ShiftingCountdown";
import saleGift from "../assets/gif/SALE.gif";

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
    ((product.price - product.discount) / product.price) * 100;

  const handleAddToCart = (event) => {
    alert("Add to cart logic here");
    // Add to cart logic here
  };

  // Determine the class based on the number of images
  // const imageCountClass =
  //   product.proImg.length === 1
  //     ? "single-image"
  //     : product.proImg.length === 3
  //     ? "three-images"
  //     : product.proImg.length === 4
  //     ? "four-images"
  //     : "multiple-images";

  return (
    <div
      className={`product-card `}
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
        </div>
        {product.price !== product.discountedPrice && (
          <div className="discount">
            <div className="flex">Giảm {Math.round(discountPercentage)}%</div>
          </div>
        )}
      </Link>
      <div onClick={handleAddToCart} className="add-to-cart">
        <FaCartPlus />
      </div>
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

  const [activeStyle, setActiveStyle] = useState({});
  const containerRef = useRef(null);

  useEffect(() => {
    const activeButton = containerRef.current.querySelector(".selected");
    if (activeButton) {
      setActiveStyle({
        transform: `translateX(${activeButton.offsetLeft}px)`,
        width: `${activeButton.clientWidth}px`,
      });
    }
  }, [sortOption]);

  return (
    <div className="flex w-full justify-center">
      {" "}
      <div className="sort-section">
        <div className="sort-buttons" ref={containerRef}>
          <div className="active-background" style={activeStyle}></div>
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
    <div className="product-section rounded-xl">
      <div className="product-container">
        <div className="banner">
          <img
            className="w-full h-full object-cover"
            src={saleGift}
            alt="Sale"
          />
        </div>
        <div className="flex w-full justify-center">
          <div className=" product-grid grid gap-4  mx-2 lg:mx-0">
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
        <div className="banner">
          <img
            className="w-full h-full object-cover"
            src={saleGift}
            alt="Sale"
          />
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
  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;

  const sortedProducts = useMemo(
    () => sortProducts([...Data], sortOption),
    [sortOption]
  );

  // const currentPageProducts = useMemo(
  //   () => sortedProducts.slice(firstPostIndex, lastPostIndex),
  //   [sortedProducts, firstPostIndex, lastPostIndex]
  // );

  useEffect(() => window.scrollTo(0, 0), [currentPage]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await callFetchProduct(currentPage, pageSize);
        if (res.vcode == 0) {
          setCurrentPageProducts(res.data.result);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProducts();
    document.title = "Tất Cả Sản Phẩm | Guppy Hóc Môn";
  }, []);

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
    <div className="bg-gray-100 min-h-screen">
      <div className="flex pt-4 pb-2 lg:pb-0 w-full justify-center whitespace-nowrap">
        <h1 className="w-[20rem] mt-[4rem] lg:mt-20 font-extrabold cursor-default text-primaryBlack lg:text-[2rem] text-[1.5rem] text-center border-b-2">
          Tất Cả Sản Phẩm
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
    </div>
  );
};

export default AllProductPage;
