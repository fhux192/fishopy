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
      navigate("/product");
  };

  const handleScroll = () => {
    const scrollValue = document.documentElement.scrollHeight - window.innerHeight;

    window.scrollBy({
      top: scrollValue,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute("content", "https://link.to/your-thumbnail.jpg");
    } else {
      const metaOgImage = document.createElement("meta");
      metaOgImage.setAttribute("property", "og:image");
      metaOgImage.setAttribute("content", "https://link.to/your-thumbnail.jpg");
      document.head.appendChild(metaOgImage);
    }

    const metaOgTitle = document.createElement("meta");
    metaOgTitle.setAttribute("property", "og:title");
    metaOgTitle.setAttribute("content", "Guppy Hóc Môn | Trại Cá Guppy Bất Ổn");
    document.head.appendChild(metaOgTitle);

    const metaOgDescription = document.createElement("meta");
    metaOgDescription.setAttribute("property", "og:description");
    metaOgDescription.setAttribute(
      "content",
      "Trang Web Chính Thức của Trại Cá Guppy Bất Ổn. Cung cấp cá Guppy chất lượng cao, đa dạng chủng loại, giao hàng toàn quốc. Bảo hành 1 đổi 1"
    );
    document.head.appendChild(metaOgDescription);

    const metaOgType = document.createElement("meta");
    metaOgType.setAttribute("property", "og:type");
    metaOgType.setAttribute("content", "website");
    document.head.appendChild(metaOgType);
  }, []);

  return (
    <div className="home-container">
      <div className="flex pt-4 pb-2 lg:pb-0 w-full justify-center whitespace-nowrap"></div>
      <div className="flex items-center lg:h-[100vh] h-[100vh] justify-center">
        <div className="flex-col flex items-center justify-center w-[65%] h-[80%]">
          <motion.div className="flex items-center justify-center">
            <p className="cursor-default text-Teal max-[550px]:text-[2rem] max-[800px]:text-[4rem] text-[5rem] font-semibold">
              cá{" "}
            </p>
            <p className="cursor-default text-White max-[550px]:text-[5rem] max-[800px]:text-[10rem] text-[15rem] font-semibold">
              guppy{" "}
            </p>
          </motion.div>
          <div className="flex items-center">
            <motion.button
              onClick={handleNavigation}
              className="flex items-center w-[100%] lg:h-[90%] h-[80%] lg:px-6 antialiased rounded-full font-semibold text-primaryTeal text-xl lg:text-2xl"
            >
              <motion.div>
                <FaFishFins className="max-[550px]:text-[2.5rem] max-[800px]:text-[3rem] text-[4rem] mr-3 pr-3 cursor-pointer text-White border-r-2" />
              </motion.div>
              <p className="text-Teal max-[550px]:text-[1rem] max-[800px]:text-[1.5rem] text-[2rem]">
                {" "}
                Xem Tất Cả Sản Phẩm
              </p>
            </motion.button>
          </div>
          <motion.div
            initial={{ y: 0 }}
            animate={{ y:  [0, -20, 0] }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              repeat: startAnimation ? 0 : 3,
              repeatDelay: 3,
            }}
          >
            <FaCircleArrowDown
              onClick={handleScroll}
              className="text-[2rem] text-White md:text-[2.5rem] lg:text-[3rem] mt-10 cursor-pointer"
            />
          </motion.div>
        </div>
      </div>
     
    </div>
  );
};

export default Home;
