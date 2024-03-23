import React, { useEffect } from "react";
import "aos/dist/aos.css";
import { ProductsData } from "../Products/data/ProductsData";

const AllProducts = () => {
  return (
    <div>
      {/*Header Section*/}
      <div className=" text-lg mb-[5.5rem] mt-[2rem] h-[1.8rem] max-w-[1000rem]">
        <h1 className="text-2xl shadow-md shadow-black text-center text-white w-full bg-primaryBlack rounded-b-2">
          Tất Cả Sản Phẩm
        </h1>
      </div>
      {/*Products Section*/}
      <div className="mx-0 lg:mx-[4.5rem]">
        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 place-items-center mx-[1.5rem] lg:mx-0 mx-20">
          {/*Card Section*/}
          {ProductsData.map((data) => (
            <div
              key={data.id}
              className="group mb-[5rem] border-b-primaryBlack shadow-lg shadow-primaryGrey hover:shadow-teal-700 rounded-3xl cursor-pointer"
            >
              <img
                transition={{ type: "spring", stiffness: 1000 }}
                src={data.cardImg}
                alt=""
                className="  shadow-black rounded-t-3xl -translate-y-[1.9rem] lg:h-[8rem] lg:w-[12rem] w-[9rem] h-[5.5rem] scale-[1.2] group-hover:scale-[1.3]   duration-500 object-contain"
              />
              <div className="-translate-y-[0.5rem]">
                <div className="flex-wrap group-hover:text-teal-600 text-center font-mono font-bold text-lg lg:text-2xl text-primaryBlack ">
                  {data.title}
                </div>
                <div className="flex-wrap group-hover:text-teal-800 text-center font-mono font-bold text-md lg:text-xl text-primaryGrey h-[3rem]">
                  {data.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
