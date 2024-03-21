import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "aos/dist/aos.css";
import Aos from "aos";
import fish1 from "../../assets/fish1.png";
import fish2 from "../../assets/fish4.png";
import fish3 from "../../assets/fish5.png";
import fish4 from "../../assets/fish2.png";
import fish5 from "../../assets/fish3.png";
import fish6 from "../../assets/fish6.png";

const ProductsData = [
  {
    id: 1,
    img: fish1,
    title: "Ca Vang",
    price: "100.000đ",
  },
  {
    id: 2,
    img: fish2,
    title: "Ca Xanh",
    price: "100.000đ",
  },
  {
    id: 3,
    img: fish3,
    title: "Ca Cam",
    price: "100.000đ",
  },
  {
    id: 4,
    img: fish4,
    title: "Ca Den",
    price: "100.000đ",
  },
  {
    id: 5,
    img: fish5,
    title: "Ca Bien",
    price: "100.000đ",
  },
  {
    id: 6,
    img: fish6,
    title: "Ca Trang",
    price: "100.000đ",
  },
];

const Products = () => {
  useEffect(() => {
    Aos.init();
  }, []);

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
              className="group mb-[3rem]  border-b-primaryBlack shadow-lg shadow-primaryGrey hover:shadow-teal-900 rounded-3xl cursor-pointer"
            >
              <img
                transition={{ type: "spring", stiffness: 1000 }}
                src={data.img}
                alt=""
                className="block -translate-y-[1.9rem] lg:h-[8rem] lg:w-[12rem] w-[9rem] h-[5.5rem] scale-[1.2] group-hover:scale-[1.3]  duration-500 object-contain"
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

export default Products;
