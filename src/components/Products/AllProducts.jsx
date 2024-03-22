import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "aos/dist/aos.css";
import Golden from "../../assets/caVang.jpeg";
import Blue from "../../assets/caXanh.jpeg";
import Orange from "../../assets/caCam.jpg";
import Black from "../../assets/caDen.jpeg";
import Sea from "../../assets/caBien.jpeg";
import Gold from "../../assets/fish1.png";

const ProductsData = [
  {
    id: 1,
    img: Golden,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 2,
    img: Blue,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 3,
    img: Black,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 4,
    img: Orange,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 5,
    img: Sea,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 6,
    img: Golden,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 7,
    img: Gold,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 8,
    img: Blue,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 9,
    img: Black,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 10,
    img: Orange,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 11,
    img: Sea,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 12,
    img: Golden,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 13,
    img: Golden,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 14,
    img: Blue,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 15,
    img: Black,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 16,
    img: Orange,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 17,
    img: Sea,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 18,
    img: Golden,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 19,
    img: Golden,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 20,
    img: Blue,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 21,
    img: Black,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 22,
    img: Orange,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 23,
    img: Sea,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 24,
    img: Black,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 25,
    img: Orange,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 26,
    img: Sea,
    title: "Ca Vang",
    price: "100.000đ",
  },
];

const AllProducts = () => {
  return (
    <div>
      {/*Header Section*/}
      <div className=" text-lg mb-[5.5rem] mt-[2rem] h-[1.8rem] max-w-[1000rem]">
        <h1 className="text-2xl shadow-md shadow-black text-center text-white w-full bg-primaryBlack rounded-b-2">
          Top Bán Chạy Nhất
        </h1>
      </div>
      {/*Products Section*/}
      <div className=" ">
        <div
          data-aos="zoom-in-up"
          className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 place-items-center mx-[1.5rem] lg:mx-0"
        >
          {/*Card Section*/}
          {ProductsData.map((data) => (
            <div
              key={data.id}
              className="group mb-[5rem]  border-b-primaryBlack shadow-lg shadow-primaryGrey hover:shadow-teal-900 rounded-3xl cursor-pointer"
            >
              <img
                transition={{ type: "spring", stiffness: 1000 }}
                src={data.img}
                alt=""
                className="  shadow-black rounded-t-3xl -translate-y-[1.9rem] lg:h-[8rem] lg:w-[12rem] w-[9rem] h-[5.5rem] scale-[1.0] group-hover:scale-[1]   duration-500 object-cover"
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
