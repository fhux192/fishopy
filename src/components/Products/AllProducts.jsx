import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "aos/dist/aos.css";
import Aos from "aos";
import Golden from "../../assets/caVang.jpeg";
import Blue from "../../assets/caXanh.jpeg";
import Orange from "../../assets/caCam.jpg";
import Black from "../../assets/caDen.jpeg";
import Sea from "../../assets/caBien.jpeg";

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
    img: Golden,
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
      <div className=" text-lg font-mono font-bold my-[3rem] mt-[2rem] h-[1.8rem] max-w-[1000rem]">
        <h1 className="text-3xl text-center text-white shadow-md shadow-black w-full bg-primaryBlack rounded-b-2">
          Tất Cả Sản Phẩm
        </h1>
      </div>
      {/*Products Section*/}
      <div className=" ">
        <div
          data-aos="zoom-in-up"
          className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 place-items-center mx-20"
        >
          {/*Card Section*/}
          {ProductsData.map((data) => (
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 1000 }}
              key={data.id}
              className="group/item hover:bg-primaryBlack hover:scale-105 mb-[2rem] border-b-primaryBlack border-y-4 shadow-lg rounded-3xl cursor-pointer"
            >
              <img
                src={data.img}
                alt=""
                className=" h-[8rem] w-[10rem] duration-300 object-cover border-b-4 rounded-t-2xl "
              />
              <div className=" items-center place-items-center justify-center">
                <div className="flex-wrap group-hover/item:text-white duration-300 text-center mt-[1rem] font-mono font-bold text-xl ">
                  {data.title}
                </div>
                <div className="flex-wrap group-hover/item:text-teal-500 duration-300 text-center font-mono font-bold text-lg h-[3rem]">
                  {data.price}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
