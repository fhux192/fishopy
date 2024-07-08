/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
const Home = () => {
  useEffect(() => {
    document.title = "Guppy Hóc Môn | Trại Cá Hóc Môn";
  }, []);
  return (
    <div className="flex  pt-4 pb-2 lg:pb-0 w-full justify-center whitespace-nowrap">
      <h1 className="w-[20rem] mt-[4rem] lg:mt-20 font-extrabold cursor-default text-primaryBlack lg:text-[2rem] text-[1.5rem] text-center border-b-2">
        Trang Chủ
      </h1>
    </div>
  );
};

export default Home;
