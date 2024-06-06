/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import ProductsData from "../../../data/ProductsData";
import Pagination from "../../Pagination/Pagination";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTypewriter } from "react-simple-typewriter";
import Navbar from "../../../components/Header/Navbar/Navbar";
import "../../../scss/navbar.scss";

const AllProducts = () => {
  const [text] = useTypewriter({
    words: ["Guppy Hóc Môn", "Bạn Cần Cá Gì?", "Mời Bạn Xem Qua"],
    loop: {},
    typeSpeed: 50,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;
  const currentPageProducts = ProductsData.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="bg-gray-100">
      <div className="text-lg mb-[3rem] mt-[1rem] h-[1.5rem] max-w-[1000rem]">
        <h1 className="bg-white h-[3rem] lg:h-[3.5rem] p-[0.3rem] lg:text-[3rem] text-3xl text-center text-primaryTeal w-full shadow-lg rounded rounded-b-2">
          {text}
        </h1>
      </div>
      {/* Products Section */}
      <div className="mx-0 lg:mx-[4.5rem] bg-white rounded">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 place-items-center mx-[1.5rem] lg:mx-0 mb-[1.0rem]">
          {/* Card Section */}
          {currentPageProducts.map((data) => (
            <Link to={`/fish/${data.id}`} key={data.id}>
              <div className="group mt-[4rem] mb-[2rem] h-[10rem] lg:h-[14rem] md:h-[12rem] border-b-primaryBlack shadow-lg shadow-primaryGrey hover:shadow-teal-700 rounded-3xl cursor-pointer">
                <LazyLoadImage
                  src={data.cardImg}
                  alt={data.title}
                  effect="black-and-white"
                  className="shadow-black rounded-t-3xl -translate-y-[1.9rem] lg:h-[8rem] lg:w-[12rem] w-[9rem] h-[5.5rem] scale-[1.2] group-hover:scale-[1.3] duration-500 object-contain"
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
