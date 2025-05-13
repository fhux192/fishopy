import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@scss/home.scss";
import { FaFishFins, FaCircleArrowDown } from "react-icons/fa6";
import { motion } from "framer-motion";
import fb1 from "../../../assets/feedback/fb1.png";
import fb2 from "../../../assets/feedback/fb2.png";
import fb3 from "../../../assets/feedback/fb3.png";
import fb4 from "../../../assets/feedback/fb4.png";
import fb5 from "../../../assets/feedback/fb5.png";
import fb7 from "../../../assets/feedback/fb7.png";
import fb8 from "../../../assets/feedback/fb8.png";
import fb9 from "../../../assets/feedback/fb9.png";

const images = [
  fb1,
  fb2,
  fb3,
  fb4,
  fb5,
  fb7,
  fb8,
  fb9,
];

function RingCarousel() {
  return (
    <div className="carouselWrapper">
      <div className="carousel3d">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`slide-${i}`}
            className="carouselFace"
            style={{
              transform: `rotateY(${i * (360 / images.length)}deg) translateZ(var(--tz))`
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const ogData = {
      "og:image": "https://link.to/your-thumbnail.jpg",
      "og:title": "Guppy Hóc Môn | Trại Cá Quân GP",
      "og:description":
        "Trang Web Chính Thức của Trại Cá Quân GP. Cung cấp cá Guppy chất lượng cao, đa dạng chủng loại, giao hàng toàn quốc. Bảo hành 1 đổi 1",
      "og:type": "website"
    };
    Object.entries(ogData).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property='${property}']`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    });
  }, []);

  const handleNavigation = () => navigate("/product");
  const handleScrollDown = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  const bounce = {
    hidden: { opacity: 0, y: -100, scale: 0.7 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 500, damping: 10 }
    }
  };
  const imageIn = {
    hidden: { opacity: 0, x: 100, scale: 0.7 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 500, damping: 10 }
    }
  };
  const staggerConfig = { visible: { transition: { staggerChildren: 0.2 } } };

  return (
    <div className="min-h-screen pb-2 flex flex-col items-center bg-gray-900 text-white overflow-hidden">
      <div className="container px-6 pt-20">
        <div className="bg-black mt-4 rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <motion.div
              className="md:w-1/2 p-8 flex flex-col justify-center"
              initial="hidden"
              animate="visible"
              variants={staggerConfig}
            >
              <motion.h1
                className="text-5xl md:text-6xl font-bold mb-4"
                variants={bounce}
              >
                Cá <span className="gradientText">Guppy</span>
              </motion.h1>
              <motion.p
                className="text-gray-400 font-semibold text-lg md:text-xl mb-6"
                variants={bounce}
              >
                Cung cấp cá guppy chất lượng cao, đa dạng chủng loại, giao hàng toàn quốc. {" "}
                <span className="text-white">Bảo hành 1 đổi 1</span> cá có vấn đề khi nhận hàng.
              </motion.p>
              <motion.button
                onClick={handleNavigation}
                className="flex items-center justify-center bg-teal-500 py-3 px-6 rounded-full font-bold"
                whileHover={{ scale: 1.05 }}
              >
                <FaFishFins className="mr-3 " /> Xem Tất Cả Sản Phẩm
              </motion.button>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial="hidden"
              animate="visible"
              variants={imageIn}
            >
              <img
                src="https://png.pngtree.com/png-vector/20231018/ourmid/pngtree-guppy-fish-isolated-on-white-background-small-png-image_10243212.png"
                alt="Guppy Fish"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
        {/* <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="flex justify-center mt-8 cursor-pointer"
          onClick={handleScrollDown}
        >
          <FaCircleArrowDown className="text-3xl" />
        </motion.div> */}
      </div>

      <RingCarousel />

      <style>{`
        .gradientText {
          background-image: linear-gradient(10deg,#fff,#09D1C7,#fff,#46DFB1,#fff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% auto;
          animation: gradientCycle 10s infinite;
        }
        @keyframes gradientCycle {
          0% { background-position: 0% 50%; }
          30% { background-position: 100% 50%; }
          70% { background-position: 0% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}