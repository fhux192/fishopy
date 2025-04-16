import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@scss/home.scss";
import { FaFishFins, FaCircleArrowDown } from "react-icons/fa6";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const [startAnimation, setStartAnimation] = useState(false);

  const handleNavigation = () => {
    setStartAnimation(true);
    navigate("/product");
  };

  const handleScrollDown = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
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
    metaOgTitle.setAttribute("content", "Guppy Hóc Môn | Trại Cá Quân GP");
    document.head.appendChild(metaOgTitle);

    const metaOgDescription = document.createElement("meta");
    metaOgDescription.setAttribute("property", "og:description");
    metaOgDescription.setAttribute(
      "content",
      "Trang Web Chính Thức của Trại Cá Quân GP. Cung cấp cá Guppy chất lượng cao, đa dạng chủng loại, giao hàng toàn quốc. Bảo hành 1 đổi 1"
    );
    document.head.appendChild(metaOgDescription);

    const metaOgType = document.createElement("meta");
    metaOgType.setAttribute("property", "og:type");
    metaOgType.setAttribute("content", "website");
    document.head.appendChild(metaOgType);
  }, []);

  const bounceVariants = {
    hidden: { opacity: 0, y: -100, scale: 0.7 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 500, damping: 10, mass: 0.3 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100, scale: 0.7 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 500, damping: 10, mass: 0.3 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div className="min-h-screen pb-10 flex items-center justify-center">
      <div className="container px-6">
        <div className="bg-black mt-20 rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <motion.div
              className="md:w-1/2 p-4 md:p-8 flex flex-col justify-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                className="text-5xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
                variants={bounceVariants}
              >
                Cá{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(10deg,#fff, #09D1C7, #fff, #46DFB1 ,#fff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "200% auto",
                    animation: "gradientCycle 10s infinite",
                  }}
                >
                  Guppy
                </span>
              </motion.h1>

              <motion.p
                className="text-gray-400 font-semibold text-lg sm:text-xl mb-6"
                variants={bounceVariants}
              >
                Cung cấp cá guppy chất lượng cao, đa dạng chủng loại, giao hàng
                toàn quốc. <span className="text-white">Bảo hành 1 đổi 1</span>{" "}
                cá có vấn đề khi nhận hàng.
              </motion.p>

              <motion.button
                onClick={handleNavigation}
                className="flex items-center justify-center bg-teal-500 py-3 text-white font-bold rounded-full transition duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <FaFishFins className="mr-3 min-w-[20px] font-bold text-lg" />
                Xem Tất Cả Sản Phẩm
              </motion.button>
            </motion.div>

            <motion.div
              className="md:w-1/2 relative"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            >
              <img
                src="https://png.pngtree.com/png-vector/20231018/ourmid/pngtree-guppy-fish-isolated-on-white-background-small-png-image_10243212.png"
                alt="Guppy Fish"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, 15, 0] }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="flex justify-center mt-8 cursor-pointer"
          onClick={handleScrollDown}
        >
          <FaCircleArrowDown className="text-white text-3xl" />
        </motion.div>
      </div>
      <style>
        {`
          @keyframes gradientCycle {
            0% {
              background-position: 0% 50%;
            }
            30% {
              background-position: 100% 50%;
            }
            70% {
              background-position: 0% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Home;