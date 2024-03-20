import React, { useEffect } from "react";
import Fish from "../../assets/Fish.png";
import Aos from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const BigImage = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className=" w-max-[100rem] bg-white h-[45rem]">
      <div data-aos="zoom-in-up">
        <h1 className="font-mono font-bold text-2xl text-primaryBlack absolute ml-[22rem] mt-[15rem]">
          Màu Sắc Rực Rỡ
        </h1>
        <div className="absolute bg-black w-[7rem] h-[0.15rem] ml-[34rem] mt-[16rem]"></div>
      </div>
      <div data-aos="zoom-in-up">
        <h1 className="font-mono font-bold text-2xl text-primaryBlack absolute ml-[19rem] mt-[28rem]">
          Phối Giống Tốt
        </h1>
        <div className="absolute bg-black w-[7rem] h-[0.15rem] ml-[31rem] mt-[29rem]"></div>
      </div>
      <div data-aos="zoom-in-up">
        <div className="absolute bg-black w-[7rem] h-[0.15rem] ml-[54rem] mt-[23rem]"></div>
        <h1 className="font-mono font-bold text-2xl text-primaryBlack absolute ml-[61.5rem] mt-[22rem]">
          Sức Khỏe Ổn Định
        </h1>
      </div>
      <div className="grid items-center justify-items-center w-full h-full">
        <img
          className="w-[25rem] h-[25rem]"
          data-aos="zoom-in-up"
          src={Fish}
          alt=""
        />

        <button
          className="text-black text-xl font-bold font-mono hover:text-teal-300 hover:bg-black hover:shadow-teal-700 shadow-md shadow-black w-[10rem] h-[3rem] bg-white absolute mt-[32rem] rounded-full"
          data-aos="zoom-in-up"
        >
          <Link to="product">Xem Thêm</Link>
        </button>
      </div>
    </div>
  );
};

export default BigImage;
