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
    <div className=" w-max-[100rem] bg-white h-[20rem] lg:h-[45rem]">
      <div data-aos="zoom-in-up">
        <h1 className="font-mono font-bold lg:text-2xl text-primaryBlack absolute ml-[3rem] lg:ml-[22rem] mt-[3rem] lg:mt-[15rem]">
          Màu Sắc Rực Rỡ
        </h1>
        <div className="absolute invisible lg:visible bg-black w-[7rem] h-[0.15rem]  lg:ml-[34rem] mt-[16rem]"></div>
      </div>
      <div data-aos="zoom-in-up">
        <h1 className="font-mono font-bold lg:text-2xl text-primaryBlack absolute ml-[3rem] lg:ml-[19rem] mt-[16rem] lg:mt-[28rem]">
          Phối Giống Tốt
        </h1>
        <div className="absolute invisible lg:visible bg-black w-[7rem] h-[0.15rem] lg:ml-[31rem] mt-[29rem]"></div>
      </div>
      <div data-aos="zoom-in-up">
        <div className="absolute invisible lg:visible bg-black w-[7rem] h-[0.15rem] lg:ml-[54rem] mt-[22.5rem]"></div>
        <h1 className="font-mono font-bold lg:text-2xl text-primaryBlack absolute ml-[2rem] lg:ml-[61.5rem] mt-[9.5rem] lg:mt-[21.5rem]">
          Sức Khỏe Ổn Định
        </h1>
      </div>
      <div className="grid items-center justify-items-center w-full h-full">
        <img
          className="lg:w-[25rem] lg:h-[25rem] lg:ml-[0rem] ml-[8rem] w-[16rem] h-[16rem]"
          data-aos="zoom-in-up"
          src={Fish}
          alt=""
        />

        <button
          className="text-black text-sm lg:text-xl font-bold font-mono hover:text-teal-300 hover:bg-black hover:shadow-teal-700 duration-300 shadow-md shadow-black lg:w-[10rem] lg:h-[3rem] w-[6rem] h-[2rem] bg-white absolute mt-[22rem] lg:mt-[32rem] rounded-full"
          data-aos="zoom-in-up"
        >
          <Link to="product">Xem Thêm</Link>
        </button>
      </div>
    </div>
  );
};

export default BigImage;
