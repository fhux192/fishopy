import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@scss/home.scss";
import { FaFishFins } from "react-icons/fa6";
import { motion } from "framer-motion";
import fb1 from "../../../assets/feedback/fb1.png";
import fb2 from "../../../assets/feedback/fb2.png";
import fb3 from "../../../assets/feedback/fb3.png";
import fb4 from "../../../assets/feedback/fb4.png";
import fb5 from "../../../assets/feedback/fb5.png";
import fb7 from "../../../assets/feedback/fb7.png";
import fb8 from "../../../assets/feedback/fb8.png";
import fb9 from "../../../assets/feedback/fb9.png";

const images = [fb1, fb2, fb3, fb4, fb5, fb7, fb8, fb9];

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
              transform: `rotateY(${i * (360 / images.length)}deg) translateZ(var(--tz))`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

const FeatureCard = ({ icon, title, content, index }) => {
  return (
    <motion.div
      className="feature-card"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        offscreen: { y: 100, opacity: 0, scale: 0.8 },
        onscreen: {
          y: 0,
          opacity: 1,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 10,
            mass: 1,
            delay: index * 0.2,
          },
        },
      }}
    >
      <div className="card-header">
        <span className="card-icon">{icon}</span>
        <h3>{title}</h3>
      </div>
      <div className="card-content">
        <p dangerouslySetInnerHTML={{ __html: content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
      </div>
    </motion.div>
  );
};

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Cá Guppy Là Gì?",
      content: "Cá Guppy (Poecilia reticulata) là một loài cá nước ngọt nhỏ bé có nguồn gốc từ **Nam Mỹ**. Chúng là một trong những loài cá cảnh **phổ biến nhất** nhờ **màu sắc rực rỡ**, dễ chăm sóc và khả năng sinh sản mạnh mẽ.",
      icon: "🌍"
    },
    {
      title: "Đặc Điểm Hình Thể",
      content: "Cá Guppy có kích thước nhỏ, thường dài từ **3.8 đến 6.4 cm**. Cá đực nhỏ hơn và **sặc sỡ hơn** cá cái, với vây đuôi lớn có nhiều hình dạng và hoa văn khác nhau.",
      icon: "🎨"
    },
    {
      title: "Hành Vi & Tính Cách",
      content: "Cá Guppy là loài cá **hòa bình** và thích giao tiếp, phù hợp với bể cá cộng đồng. Chúng bơi lội tích cực và thích khám phá môi trường xung quanh.",
      icon: "👪"
    }
  ];

  useEffect(() => {
    const ogData = {
      "og:image": "https://link.to/your-thumbnail.jpg",
      "og:title": "Guppy Hóc Môn | Trại Cá Quân GP",
      "og:description":
        "Trang Web Chính Thức của Trại Cá Quân GP. Cung cấp cá Guppy chất lượng cao, đa dạng chủng loại, giao hàng toàn quốc. **BẢO HÀNH 1 ĐỔI 1**",
      "og:type": "website",
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

  return (
    <div className="min-h-screen pb-2 flex flex-col items-center bg-gray-900 text-white overflow-hidden">
      <div className="container px-6 pt-20">
        <div className="bg-black mt-4 rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <motion.div
              className="md:w-1/2 p-8 flex flex-col justify-center"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: -100, scale: 0.7 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 500, damping: 10 },
                },
              }}
            >
              <h1 className="text-5xl cursor-default md:text-6xl font-bold mb-4">
                Cá <span className="gradientText">Guppy</span>
              </h1>
              <p className="text-gray-400 cursor-default font-semibold text-lg md:text-xl mb-6">
                Cung cấp cá guppy chất lượng cao, đa dạng chủng loại, giao hàng toàn quốc.{" "}
                <span className="text-white font-bold">Bảo hành 1 đổi 1</span> cá có vấn đề khi nhận hàng.
              </p>
              <button
                onClick={handleNavigation}
                className="flex items-center justify-center bg-teal-500 py-3 px-6 rounded-full font-bold hover:bg-teal-600 transition-colors"
              >
                <FaFishFins className="mr-3" /> Xem Tất Cả Sản Phẩm
              </button>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, x: 100, scale: 0.7 },
                visible: {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 500, damping: 10 },
                },
              }}
            >
              <img
                src="https://png.pngtree.com/png-vector/20231018/ourmid/pngtree-guppy-fish-isolated-on-white-background-small-png-image_10243212.png"
                alt="Guppy Fish"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <RingCarousel />

      <section className="features-section cursor-default mb-16 mx-6 bg-Black mt-4 rounded-3xl shadow-xl overflow-hidden">
        <motion.h2
          className="section-title font-bold"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Đặc Điểm Nổi Bật
        </motion.h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              index={index}
              {...feature}
            />
          ))}
        </div>
      </section>
    </div>
  );
}