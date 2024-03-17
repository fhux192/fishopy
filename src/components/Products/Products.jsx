import React, { useEffect } from "react";
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
];

const Products = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div>
      {/*Header Section*/}
      <div className=" text-lg font-mono font-bold my-[3rem] mt-[2rem] h-[1.8rem] max-w-[1000rem]">
        <h1 className="text-2xl text-center text-white w-full bg-primaryBlack rounded-b-2">
          Top Bán Chạy Nhất!!!
        </h1>
      </div>
      {/*Products Section*/}
      <div className=" ">
        <div
          data-aos="zoom-in-up"
          className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 place-items-center "
        >
          {/*Card Section*/}
          {ProductsData.map((data) => (
            <div
              key={data.id}
              className="group/item hover:bg-primaryBlack hover:scale-105 mb-[2rem] border-b-primaryBlack border-y-4 shadow-lg rounded-3xl cursor-pointer"
            >
              <img
                src={data.img}
                alt=""
                className=" h-[10rem] w-[12rem] duration-300 object-cover border-b-4 rounded-t-2xl "
              />
              <div className=" items-center place-items-center justify-center">
                <div className="flex-wrap group-hover/item:text-white duration-300 text-center mt-[1rem] font-mono font-bold text-xl ">
                  {data.title}
                </div>
                <div className="flex-wrap group-hover/item:text-teal-500 duration-300 text-center font-mono font-bold text-lg h-[3rem]">
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
