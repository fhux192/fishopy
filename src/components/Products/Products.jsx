import React from "react";
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
  },
  {
    id: 2,
    img: Blue,
    title: "Ca Vang",
  },
  {
    id: 3,
    img: Black,
    title: "Ca Vang",
  },
  {
    id: 4,
    img: Orange,
    title: "Ca Vang",
  },
  {
    id: 5,
    img: Sea,
    title: "Ca Vang",
  },
  {
    id: 6,
    img: Golden,
    title: "Ca Vang",
  },
];

const Products = () => {
  return (
    <div>
      {/*Header Section*/}
      <div className=" text-lg font-mono font-bold my-[2rem] mt-[2rem] h-[1.8rem] max-w-[1000rem]">
        <h1 className="text-2xl text-center text-white w-full bg-primaryBlack rounded-b-2">
          Top Bán Chạy Nhất!!!
        </h1>
      </div>
      {/*Products Section*/}
      <div className=" ">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 place-items-center ">
          {/*Card Section*/}
          {ProductsData.map((data) => (
            <div className="mb-[2rem] border-b-primaryBlack border-y-4 rounded-3xl">
              <img
                src={data.img}
                alt=""
                className=" h-[7rem] w-[10rem] object-cover border-b-4 rounded-t-2xl "
              />
              <div className=" text-center mt-[1rem] font-mono font-bold text-xl h-[3rem]">
                {data.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
