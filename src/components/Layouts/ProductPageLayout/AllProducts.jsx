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
   

      {/* Sort Section */}
      <div className="mx-0 lg:mx-[10%] rounded pt-[2rem]  lg:pt-[1.5rem] lg:mb-[0.3rem] mb-0  flex justify-center lg:justify-end items-center overflow-hidden">
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
            className={`flex h-[2rem] min-w-[9.5rem] shadow-md shadow-gray-500 lg:ml-0 ml-[5%] mr-[5%] text-sm justify-center items-center px-4 py-2 rounded-xl lg:mr-[1rem] ${
              sortOption === "default"
                ? "bg-gradient text-white"
                : "bg-white text-primaryGrey"
            }`}
            onClick={() => handleSortChange("default")}
          >
            Mặc định
          </button>
          <button
            className={`flex h-[2rem] min-w-[9.5rem] shadow-md shadow-gray-500 mr-[5%] text-sm justify-center items-center px-4 py-2 rounded-xl lg:mr-[1rem] ${
              sortOption === "priceDesc"
                ? "bg-gradient text-white"
                : "bg-white text-primaryGrey"
            }`}
            onClick={() => handleSortChange("priceDesc")}
          >
            <FaSortAmountDown className="mr-2" /> Cao - Thấp
          </button>
          <button
            className={`flex h-[2rem] min-w-[9.5rem] shadow-md shadow-gray-500 mr-[5%] text-sm justify-center items-center px-4 py-2 rounded-xl lg:mr-[1rem] ${
              sortOption === "priceAsc"
                ? "bg-gradient text-white"
                : "bg-white text-primaryGrey"
            }`}
            onClick={() => handleSortChange("priceAsc")}
          >
            <FaSortAmountUp className="mr-2" /> Thấp - Cao
          </button>
          <button
            className={`flex h-[2rem] min-w-[9.5rem] shadow-md shadow-gray-500 mr-[5%] text-sm justify-center items-center px-4 py-2 rounded-xl lg:mr-[1rem] ${
              sortOption === "titleAsc"
                ? "bg-gradient text-white"
                : "bg-white text-primaryGrey"
            }`}
            onClick={() => handleSortChange("titleAsc")}
          >
            Tên từ A - Z
          </button>
          <button
            className={`flex h-[2rem] min-w-[9.5rem] mr-[5%] shadow-md shadow-gray-500 text-sm justify-center items-center px-4 py-2 rounded-xl lg:mr-[1rem] ${
              sortOption === "titleDesc"
                ? "bg-gradient text-white"
                : "bg-white text-primaryGrey"
            }`}
            onClick={() => handleSortChange("titleDesc")}
          >
            Tên từ Z - A
          </button>
        </div>
      </div>

      {/* Products Section */}
      <div className="mx-4  mb-0 lg:mb-4 lg:mx-[5rem] bg-gray-100 rounded-xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 place-items-center mx-2 lg:mx-0 mb-[0.0rem]">
          {/* Card Section */}
          {currentPageProducts.map((data) => {
            const discountPercentage = calculateDiscountPercentage(
              data.price,
              data.discount
            );
            return (
              <Link to={`/fish/${data.id}`} key={data.id}>
                <div className="group mt-[3rem] mb-[1rem] h-[11rem] lg:h-[15rem] md:h-[13rem] bg-white rounded-3xl cursor-pointer relative">
                  <LazyLoadImage
                    src={data.cardImg}
                    alt={data.title}
                    effect="black-and-white"
                    className="    shadow-teal-900 lg:group-hover:translate-y-[-2.4rem] group-hover:translate-y-[-1.4rem] rounded-3xl lg:-translate-y-[1.5rem] -translate-y-[0.9rem] lg:h-[8rem] lg:w-[12rem] w-[9rem] h-[5.5rem] scale-[1.3] duration-500 object-contain"
                  />
                  <div className="-translate-y-2">
                    <div className="whitespace-pre-line group-hover:text-teal-700 text-center font-mono font-bold text-lg lg:text-2xl text-primaryBlack">
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
                      className="absolute bottom-0 right-0 bg-gradient lg:border-8 border-4 border-gray-100 text-white lg:text-sm text-[10px] p-[4px] px-[8px] h:p-1 h:px-2 rounded-3xl "
                  
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
