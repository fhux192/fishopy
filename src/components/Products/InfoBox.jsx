import React, { useEffect } from "react";
import { FaTruckFast } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";
import { FaPercentage } from "react-icons/fa";
import { FaStore } from "react-icons/fa6";
import "aos/dist/aos.css";
import Aos from "aos";

const InfoBox = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="h-max-[100rem] mt-[7rem] lg:mt-[5rem] mb-[1rem]">
      <div className="grid grid-cols-4 justify-items-center w-full lg:h-[6rem]  rounded">
        <div
          className="grid grid-cols-1 justify-items-center"
          data-aos="zoom-in"
        >
          <FaTruckFast className="w-[2.0rem] h-[2.0rem] lg:w-[2.5rem] lg:h-[2.5rem] text-primaryBlack" />
          <h1 className=" w-20 lg:w-full font-mono font-bold text-center text-primaryBlack text-sm  lg:text-2xl">
            Giao Hàng Tận Nhà
          </h1>
        </div>
        <div
          className="grid grid-cols-1 justify-items-center"
          data-aos="zoom-in"
        >
          <FaBoxOpen className="w-[2.0rem] h-[2.0rem] lg:w-[2.5rem] lg:h-[2.5rem] text-primaryBlack" />
          <h1 className="w-20 lg:w-full font-mono font-bold text-center text-primaryBlack text-sm  lg:text-2xl">
            Kiểm Tra Hàng Khi Nhận
          </h1>
        </div>
        <div
          className="grid grid-cols-1 justify-items-center"
          data-aos="zoom-in"
        >
          <FaPercentage className="w-[2.0rem] h-[2.0rem] lg:w-[2.5rem] lg:h-[2.5rem] text-primaryBlack" />
          <h1 className="w-20 lg:w-full font-mono font-bold text-center text-primaryBlack text-sm  lg:text-2xl">
            Ưu Đãi Hấp Dẫn
          </h1>
        </div>
        <div
          className="grid grid-cols-1 justify-items-center"
          data-aos="zoom-in"
        >
          <FaStore className="w-[2.0rem] h-[2.0rem] lg:w-[2.5rem] lg:h-[2.5rem] text-primaryBlack" />
          <h1 className="w-20 lg:w-full font-mono font-bold text-center text-primaryBlack text-sm  lg:text-2xl">
            Hệ Thống Cửa Hàng
          </h1>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
