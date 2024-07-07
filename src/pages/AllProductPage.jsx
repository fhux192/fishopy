/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { addLocalCart } from "../redux/features/user/userSlice";
import { Link } from "react-router-dom";
import { FaSortAmountDown, FaSortAmountUp, FaCartPlus } from "react-icons/fa";
import { BiSolidDiscount } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";

import ProductsData from "../data/ProductsData";
import Pagination from "../components/Pagination/Pagination";
import ShiftingCountdown from "../components/CountDown/ShiftingCountdown";

import "aos/dist/aos.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../scss/navbar.scss";
import "../scss/allProduct.scss";

// Hàm sắp xếp sản phẩm dựa trên tùy chọn sắp xếp
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

// Hàm định dạng giá tiền với dấu phân cách hàng nghìn
const formatPrice = (price) =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// Component hiển thị từng thẻ sản phẩm
const ProductCard = ({ product, priceStage }) => {
  const dispatch = useDispatch();

  const discountPercentage =
    ((product.price - product.discount) / product.price) * 100;

  const handleAddToCart = (event) => {
    event.preventDefault();
    dispatch(
      addLocalCart({
        id: product.id,
        title: product.title,
        price: product.price,
        discount: product.discount,
        quantity: 1,
        proImg: product.cardImg,
      })
    );
  };

  return (
    <div className="group lg:mt-[1.5rem] mt-4 h-[15rem] w-[11rem] lg:w-[14rem] lg:h-[20rem] md:h-52 border-2 border-Grey bg-white rounded-3xl relative">
      <Link
        to={`/fish/${product.id}`}
        key={product.id}
        className="block h-full"
      >
        <LazyLoadImage
          src={product.cardImg}
          alt={product.title}
          effect="black-and-white"
          className="shadow-teal-900 lg:group-hover:translate-y-[-2.2rem] group-hover:translate-y-[-1.4rem] rounded-3xl lg:translate-y-[-0rem] -translate-y-[-0.2rem] lg:h-[10rem] lg:w-[14rem] w-[11rem] h-[7rem]  duration-1000 object-contain"
        />
        <div className="-translate-y-2">
          <h2 className="whitespace-pre-line border-t-2 pt-2 border-primaryGrey mt-2 mx-2 font-bold text-lg lg:text-2xl text-primaryBlack">
            {product.title}
          </h2>
          <p className="group-hover:text-teal-900 mx-2 font-mono font-bold text-md lg:text-xl text-primaryGrey h-12">
            {product.price === product.discount ? (
              <span>{product.price}₫</span>
            ) : (
              <>
                {priceStage === 0 && <span>{product.price}₫</span>}
                {priceStage === 1 && (
                  <span className="line-through font-semibold  decoration-teal-700">
                    {product.price}₫
                  </span>
                )}
                {priceStage === 2 && (
                  <span>{formatPrice(product.discount)}₫</span>
                )}
              </>
            )}
          </p>
        </div>

        {product.price !== product.discount && (
          <div className="absolute font-semibold bottom-0  right-0  bg-gradient-to-r from-sky-500 to-indigo-500 lg:border-8 border-4 border-gray-100 text-white lg:text-sm text-sm m-[1px] p-1 rounded-3xl">
            <div className="flex px-1 gap-[1px] items-center">
              Giảm {Math.round(discountPercentage)}%
            </div>
          </div>
        )}
      </Link>
      <div
        onClick={handleAddToCart}
        className="absolute flex hover:bg-teal-600 duration-300 justify-center items-center lg:h-[2.7rem] lg:w-[2.8rem] w-[2.3rem] h-[2.2rem] bottom-0  left-0 bg-sky-500 lg:border-8 border-4 border-gray-100 text-white lg:text-sm text-sm m-[1px]  rounded-full cursor-pointer"
      >
        <FaCartPlus />
      </div>
    </div>
  );
};

// Component xử lý tùy chọn sắp xếp
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
    <div className="sort-section ml-0 pt-[1rem]  flex justify-center lg:justify-end items-center overflow-hidden">
      <div className="flex pb-2 overflow-x-auto scrollbar-hide">
        {sortButtons.map(({ option, label, icon }) => (
          <button
            key={option}
            className={`flex h-[2rem] font-semibold min-w-[9.5rem] border-2 border-primaryGrey text-sm justify-center items-center px-4 py-2 rounded-xl lg:mt-4 lg:mx-0 mx-2 lg:mr-2 ${
              sortOption === option
                ? "  bg-primaryBlack text-white border-grey-100"
                : "bg-white text-primaryGrey"
            }`}
            onClick={() => setSortOption(option)}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Component hiển thị danh sách sản phẩm
const ProductsSection = ({ currentPageProducts, priceStage }) => {
  return (
    <div className="product-section bg-blue-100 rounded-xl">
      <div className="flex bg-red-100  w-full px-10">
        <div className="banner w-[10rem] h-[30rem] bg-primaryBlack ">
          {" "}
        </div>
        <div className="flex-[2] product-grid grid  place-items-center mx-2 lg:mx-0">
          {currentPageProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              priceStage={priceStage}
            />
          ))}
        </div>
        <div className="banner w-[10rem] h-[30rem] bg-primaryBlack"> </div>
      </div>
    </div>
  );
};

const AllProductPage = () => {
  // State quản lý trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);
  // State quản lý tùy chọn sắp xếp đã chọn
  const [sortOption, setSortOption] = useState("default");
  // State quản lý giai đoạn hiển thị giá (0: mặc định, 1: gạch ngang, 2: giảm giá)
  const [priceStage, setPriceStage] = useState(0);

  // Số lượng sản phẩm mỗi trang
  const productsPerPage = 15;
  // Chỉ số của sản phẩm cuối cùng trên trang hiện tại
  const lastPostIndex = currentPage * productsPerPage;
  // Chỉ số của sản phẩm đầu tiên trên trang hiện tại
  const firstPostIndex = lastPostIndex - productsPerPage;

  // Memo hóa sản phẩm đã sắp xếp dựa trên tùy chọn sắp xếp đã chọn
  const sortedProducts = useMemo(
    () => sortProducts([...ProductsData], sortOption),
    [sortOption]
  );

  // Memo hóa sản phẩm trên trang hiện tại cho phân trang
  const currentPageProducts = useMemo(
    () => sortedProducts.slice(firstPostIndex, lastPostIndex),
    [sortedProducts, firstPostIndex, lastPostIndex]
  );

  // Cuộn lên đầu khi trang hiện tại thay đổi
  useEffect(() => window.scrollTo(0, 0), [currentPage]);

  // Đặt tiêu đề trang
  useEffect(() => {
    document.title = "Tất Cả Sản Phẩm | Guppy Hóc Môn";
  }, []);

  // Chu kỳ hiển thị giai đoạn giá
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
      <div className="flex lg:mt-20 pt-4 pb-2 lg:pb-0 w-full justify-center whitespace-nowrap">
        <h1 className="w-[20rem] font-extrabold cursor-default text-primaryBlack lg:text-[2rem] text-[1.5rem] text-center border-b-2">
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
        totalPost={ProductsData.length}
        postPerPage={productsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default AllProductPage;
