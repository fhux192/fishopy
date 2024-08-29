/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../scss/home.scss";

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
      <div className="flex pt-4 pb-2 lg:pb-0 w-full justify-center whitespace-nowrap">
       
      </div>
      <div className="flex items-center h-[50%] justify-center mt-[5rem]">
        <button
          onClick={handleNavigation}
          className="font-black  button-container"
        >
          Xem sản phẩm
        </button>
      </div>
    </div>
  );
};

export default Home;
