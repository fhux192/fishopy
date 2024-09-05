/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../scss/home.scss";
import { FaFishFins } from "react-icons/fa6";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/product");
  };

  useEffect(() => {
    document.title = "Guppy Hóc Môn | Trại Cá Hóc Môn";
  }, []);
  return (
    <div className="home-container">
      <div className="flex pt-4 pb-2 lg:pb-0 w-full justify-center whitespace-nowrap"></div>
      <div className="flex items-center lg:h-[90vh] h-[90vh] justify-center">
        <div className=" flex-col flex items-center justify-center w-[65%] h-[80%]">
          <div className="flex items-center justify-center">
            <p className="cursor-default text-primaryTeal max-[550px]:text-[2rem] max-[800px]:text-[4rem] text-[5rem] font-semibold">
              cá{" "}
            </p>
            <p className="cursor-default  text-primaryBlack max-[550px]:text-[5rem] max-[800px]:text-[10rem] text-[15rem]  font-semibold">
              guppy{" "}
            </p>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleNavigation}
              className="flex items-center w-[100%] lg:h-[90%] h-[80%]  lg:px-6 antialiased rounded-full font-semibold text-primaryTeal texl-xl lg:text-2xl"
            >
              <FaFishFins
                onClick={handleNavigation}
                className="max-[550px]:text-[2.5rem] max-[800px]:text-[3rem] text-[4rem] mr-3 pr-3 cursor-pointer text-primaryBlack border-r-2"
              />{" "}
              Xem Tất Cả Sản Phẩm
            </button>
          </div>
        </div>
      </div>
      <div className= "flex justify-center translate-y-[20rem] mb-[25rem] rounded-xl bg-primaryTeal m-auto w-[80%] lg:h-[50rem] h-[30rem] shadow-md"></div>
    </div>
  );
};

export default Home;
