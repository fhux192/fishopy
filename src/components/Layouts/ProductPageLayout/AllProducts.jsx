import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import ProductsData from "../../../data/ProductsData";
import Pagination from "../../Pagination/Pagination";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTypewriter } from "react-simple-typewriter";
import "../../../scss/navbar.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa"; // Importing the icons

const AllProducts = () => {
  const [text] = useTypewriter({
    words: ["Guppy Đông Thạnh", "Bạn Cần Cá Gì?", "Mời Bạn Xem Qua"],
    loop: {},
    typeSpeed: 50,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [sortOption, setSortOption] = useState("default");
  const [priceStage, setPriceStage] = useState(0);

  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;
  const sortedProducts = [...ProductsData].sort((a, b) => {
    if (sortOption === "priceAsc") {
      return a.price - b.price;
    } else if (sortOption === "priceDesc") {
      return b.price - a.price;
    } else if (sortOption === "titleAsc") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "titleDesc") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  const currentPageProducts = sortedProducts.slice(
    firstPostIndex,
    lastPostIndex
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    const cyclePrices = () => {
      setPriceStage(0);
      setTimeout(() => setPriceStage(1), 1000); // Original price for 1 second
      setTimeout(() => setPriceStage(2), 2000); // Strikethrough price for 1 second
      setTimeout(() => setPriceStage(0), 7000); // Discounted price for 1 second, then cycle back
    };

    cyclePrices();
    const interval = setInterval(cyclePrices, 7000);

    return () => clearInterval(interval);
  }, []);

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const calculateDiscountPercentage = (price, discount) => {
    if (price === 0) return 0; // Prevent division by zero
    return ((price - discount) / price) * 100;
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="text-lg lg:mb-[2rem] items-center mb-[2.5rem] mt-[0]  lg:mt-[0.5rem] h-[1.5rem] max-w-[10000rem]">
        <div className="bg-white h-[2.6rem] lg:h-[3.5rem] p-[0rem] lg:text-[3rem] text-3xl text-center w-full shadow-lg rounded-b-2">
          <p className="lg:block md:hidden hidden" data-text="Guppy Đông Thạnh" style={{ "--i": 0 }}>Guppy Đông Thạnh</p>

          <p className=" lg:block md:hidden hidden"  data-text="Bạn Cần Cá Gì?"  style={{ "--i": 1 }}>Bạn Cần Cá Gì?</p>

          <p className=" lg:block md:hidden hidden" data-text="Mời Bạn Xem Qua" style={{ "--i": 2 }}>Mời Bạn Xem Qua</p>
          <div className="text-teal-700 lg:hidden mt-[5px]">{text} </div>
        </div>
      </div>

      {/* Sort Section */}
      <div className="mx-0 lg:mx-[4.5rem] rounded pt-[5px]  lg:pt-[1.5rem] mb-[1.3rem] flex justify-center lg:justify-end items-center overflow-hidden">
        <div
          style={{
            display: "flex",
            paddingBottom: "10px",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <button
            className={`flex h-[2rem] min-w-[9.5rem] shadow-md shadow-gray-500 lg:ml-0 ml-[5%] mr-[5%] text-sm justify-center items-center px-4 py-2 border rounded-xl lg:mr-[1rem] ${
              sortOption === "default"
                ? "bg-teal-600 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => handleSortChange("default")}
          >
            Mặc định
          </button>
          <button
            className={`flex h-[2rem] min-w-[9.5rem] shadow-md shadow-gray-500 mr-[5%] text-sm justify-center items-center px-4 py-2 border rounded-xl lg:mr-[1rem] ${
              sortOption === "priceDesc"
                ? "bg-teal-600 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => handleSortChange("priceDesc")}
          >
            <FaSortAmountDown className="mr-2" /> Cao - Thấp
          </button>
          <button
            className={`flex h-[2rem] min-w-[9.5rem] shadow-md shadow-gray-500 mr-[5%] text-sm justify-center items-center px-4 py-2 border rounded-xl lg:mr-[1rem] ${
              sortOption === "priceAsc"
                ? "bg-teal-600 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => handleSortChange("priceAsc")}
          >
            <FaSortAmountUp className="mr-2" /> Thấp - Cao
          </button>
          <button
            className={`flex h-[2rem] min-w-[9.5rem] shadow-md shadow-gray-500 mr-[5%] text-sm justify-center items-center px-4 py-2 border rounded-xl lg:mr-[1rem] ${
              sortOption === "titleAsc"
                ? "bg-teal-600 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => handleSortChange("titleAsc")}
          >
            Tên từ A - Z
          </button>
          <button
            className={`flex h-[2rem] min-w-[9.5rem] mr-[5%] shadow-md shadow-gray-500 text-sm justify-center items-center px-4 py-2 border rounded-xl lg:mr-[1rem] ${
              sortOption === "titleDesc"
                ? "bg-teal-600 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => handleSortChange("titleDesc")}
          >
            Tên từ Z - A
          </button>
        </div>
      </div>

      {/* Products Section */}
      <div className="mx-0 pb-[0.5rem] mb-6 lg:mb-4 lg:mx-[5rem] bg-white rounded-xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 place-items-center mx-[0.8rem] lg:mx-0 mb-[2.0rem]">
          {/* Card Section */}
          {currentPageProducts.map((data) => {
            const discountPercentage = calculateDiscountPercentage(
              data.price,
              data.discount
            );
            return (
              <Link to={`/fish/${data.id}`} key={data.id}>
                <div className="group mt-[4rem] mb-[2rem] h-[10rem] lg:h-[14rem] md:h-[12rem] border-b-primaryBlack shadow-lg shadow-primaryGrey hover:shadow-teal-700 rounded-3xl cursor-pointer relative">
                  <LazyLoadImage
                    src={data.cardImg}
                    alt={data.title}
                    effect="black-and-white"
                    className="shadow-black group-hover:scale-[1.5] rounded-t-3xl lg:-translate-y-[3.0rem] -translate-y-[2.2rem] lg:h-[8rem] lg:w-[12rem] w-[9rem] h-[5.5rem] scale-[1.2] duration-500 object-contain"
                  />
                  <div className="-translate-y-2">
                    <div className="whitespace-pre-line group-hover:text-teal-600 text-center font-mono font-bold text-lg lg:text-2xl text-primaryBlack">
                      {data.title}
                    </div>
                    <div className="group-hover:text-teal-900 text-center font-mono font-bold text-md lg:text-xl text-primaryGrey h-[3rem]">
                      {data.price === data.discount && (
                        <span>{data.price}₫</span>
                      )}
                      {data.price !== data.discount && (
                        <>
                          {priceStage === 0 && <span>{data.price}₫</span>}
                          {priceStage === 1 && (
                            <span style={{ textDecoration: "line-through" }}>
                              {data.price}₫
                            </span>
                          )}
                          {priceStage === 2 && (
                            <span>{formatPrice(data.discount)}₫</span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  {data.price !== data.discount && (
                    <div
                      className="absolute  bottom-[50%] lg:right-[-15%] right-[-10%] bg-gradient text-black lg:text-sm text-[10px] p-[4px] px-[8px] h:p-1 h:px-2 rounded-md shadow-gray-500 shadow-md"
                      style={{ transform: "rotate(-10deg)" }}
                    >
                      Giảm {Math.round(discountPercentage)}%
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <Pagination
        totalPost={ProductsData.length}
        postPerPage={productsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default AllProducts;
