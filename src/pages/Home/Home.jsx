/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../scss/home.scss";
import { FaFishFins } from "react-icons/fa6";
import { FaCircleArrowDown } from "react-icons/fa6";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const [startAnimation, setStartAnimation] = useState(false);

  const handleNavigation = () => {
    setStartAnimation(true);
    setTimeout(() => {
      navigate("/product");
    }, 1000); // Navigate after the animation finishes
  };

  const handleScroll = () => {
    let scrollValue;
    const screenWidth = window.innerWidth;

    if (screenWidth < 768) {
      scrollValue = 950; // Mobile
    } else if (screenWidth >= 768 && screenWidth < 1024) {
      scrollValue = 1000; // Tablet
    } else if (screenWidth >= 1024 && screenWidth <= 1440) {
      scrollValue = 1100;
    } else {
      scrollValue = 1150; // Desktop
    }

    window.scrollBy({
      top: scrollValue,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    document.title = "Guppy Hóc Môn | Trại Cá Hóc Môn";
  }, []);

  return (
    <div className="home-container">
      <div className="flex pt-4 pb-2 lg:pb-0 w-full justify-center whitespace-nowrap"></div>
      <div className="flex items-center lg:h-[100vh] h-[100vh] justify-center">
        <div className="flex-col flex items-center justify-center w-[65%] h-[80%]">
          <motion.div
            className="flex items-center justify-center"
            initial={{ y: 0 }}
            animate={{ y: startAnimation ? -1000 : 0 }} // Slide up out of the screen
            transition={{ duration: 1 }}
          >
            <p className="cursor-default text-Teal max-[550px]:text-[2rem] max-[800px]:text-[4rem] text-[5rem] font-semibold">
              cá{" "}
            </p>
            <p className="cursor-default text-primaryBlack max-[550px]:text-[5rem] max-[800px]:text-[10rem] text-[15rem] font-semibold">
              guppy{" "}
            </p>
          </motion.div>
          <div className="flex items-center">
            <motion.button
              onClick={handleNavigation}
              className="flex items-center w-[100%] lg:h-[90%] h-[80%] lg:px-6 antialiased rounded-full font-semibold text-primaryTeal text-xl lg:text-2xl"
              initial={{ y: 0 }}
              animate={{ y: startAnimation ? -1000 : 0 }} // Slide up out of the screen
              transition={{ duration: 1 }}
            >
              <motion.div>
                <FaFishFins className="max-[550px]:text-[2.5rem] max-[800px]:text-[3rem] text-[4rem] mr-3 pr-3 cursor-pointer text-primaryBlack border-r-2" />
              </motion.div>
             <p className="text-Teal max-[550px]:text-[1rem] max-[800px]:text-[1.5rem] text-[2rem]"> Xem Tất Cả Sản Phẩm</p>
            </motion.button>
          </div>
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: startAnimation ? -1000 : [0, -20, 0] }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              repeat: startAnimation ? 0 : 3,
              repeatDelay: 3,
            }}
          >
            <FaCircleArrowDown
              onClick={handleScroll}
              className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] mt-10 cursor-pointer"
            />
          </motion.div>
        </div>
      </div>
      <div className="flex justify-center translate-y-[20rem] mb-[30rem] rounded-xl bg-primaryTeal m-auto w-[80%] lg:h-[50rem] h-[30rem] shadow-md"></div>
    </div>
  );
};

export default Home;