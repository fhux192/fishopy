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
    words: ["Guppy Hóc Môn", "Bạn Cần Cá Gì?", "Mời Bạn Xem Qua"],
    loop: {},
    typeSpeed: 50,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [sortOption, setSortOption] = useState("default");

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

  const currentPageProducts = sortedProducts.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="text-lg round lg:mb-[2rem] mb-[2.5rem] mt-0 lg:mt-[0.5rem] h-[1.5rem] max-w-[10000rem]">
        <div className="bg-white h-[3rem] lg:h-[3.5rem] p-[0.3rem] lg:text-[3rem] text-3xl text-center text-primaryTeal w-full shadow-lg rounded-b-2">
          {text}
        </div>
      </div>
      
      {/* Sort Section */}
      <div className="mx-0 lg:mx-[4.5rem] rounded pt-[5px]  lg:pt-[1.5rem] mb-[1.3rem] flex justify-center lg:justify-end items-center overflow-hidden">
        <div style={{ display: 'flex' ,paddingBottom:'10px', overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <button
            className={`flex h-[2rem] min-w-[9.5rem] shadow-md shadow-gray-500 lg:ml-0 ml-[5%] mr-[5%] text-sm justify-center items-center px-4 py-2 border rounded-xl lg:mr-[1rem] ${sortOption === "default" ? "bg-teal-600 text-white" : "bg-gray-200 text-black"}`}
            onClick={() => handleSortChange("default")}
          >
            Mặc định
            
          </button>
          <button
            className={`flex h-[2rem] min-w-[9.5rem] shadow-md shadow-gray-500 mr-[5%] text-sm justify-center items-center px-4 py-2 border rounded-xl lg:mr-[1rem] ${sortOption === "priceDesc" ? "bg-teal-600 text-white" : "bg-gray-200 text-black"}`}
            onClick={() => handleSortChange("priceDesc")}
          >
            <FaSortAmountDown className="mr-2" /> Cao - Thấp
          </button>
          <button
            className={`flex h-[2rem] min-w-[9.5rem] shadow-md shadow-gray-500 mr-[5%] text-sm justify-center items-center px-4 py-2 border rounded-xl lg:mr-[1rem] ${sortOption === "priceAsc" ? "bg-teal-600 text-white" : "bg-gray-200 text-black"}`}
            onClick={() => handleSortChange("priceAsc")}
          >
            <FaSortAmountUp className="mr-2" /> Thấp - Cao
          </button>
          <button
            className={`flex h-[2rem] min-w-[9.5rem] shadow-md shadow-gray-500 mr-[5%] text-sm justify-center items-center px-4 py-2 border rounded-xl lg:mr-[1rem] ${sortOption === "titleAsc" ? "bg-teal-600 text-white" : "bg-gray-200 text-black"}`}
            onClick={() => handleSortChange("titleAsc")}
          >
            Tên từ A - Z
          </button>
          <button
            className={`flex h-[2rem] min-w-[9.5rem] mr-[5%] shadow-md shadow-gray-500 text-sm justify-center items-center px-4 py-2 border rounded-xl lg:mr-[1rem] ${sortOption === "titleDesc" ? "bg-teal-600 text-white" : "bg-gray-200 text-black"}`}
            onClick={() => handleSortChange("titleDesc")}
          >
            Tên từ Z - A
          </button>
          
        </div>
      </div>
      
      {/* Products Section */}
      <div className="mx-0 pb-[0.5rem] mb-6 lg:mb-4 lg:mx-[5rem] bg-white rounded-xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 place-items-center mx-[1.5rem] lg:mx-0 mb-[2.0rem]">
          {/* Card Section */}
          {currentPageProducts.map((data) => (
            <Link to={`/fish/${data.id}`} key={data.id}>
              <div className="group mt-[4rem] mb-[2rem] h-[10rem] lg:h-[14rem] md:h-[12rem] border-b-primaryBlack shadow-lg shadow-primaryGrey hover:shadow-teal-700 rounded-3xl cursor-pointer">
                <LazyLoadImage
                  src={data.cardImg}
                  alt={data.title}
                  effect="black-and-white"
                  className="shadow-black rounded-t-3xl -translate-y-[1.9rem] lg:h-[8rem] lg:w-[12rem] w-[9rem] h-[5.5rem] scale-[1.2]  duration-500 object-contain"
                />
                <div className="-translate-y-2">
                  <div className="whitespace-pre-line group-hover:text-teal-600 text-center font-mono font-bold text-lg lg:text-2xl text-primaryBlack">
                    {data.title}
                  </div>
                  <div className="group-hover:text-teal-800 text-center font-mono font-bold text-md lg:text-xl text-primaryGrey h-[3rem]">
                    {data.price}
                  </div>
                </div>
              </div>
            </Link>
          ))}
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