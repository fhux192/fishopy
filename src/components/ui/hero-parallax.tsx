// HeroParallax.js
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const HeroParallax = ({ products }) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="relative h-[250vh] lg:h-[260vh] z-0 py-40 overflow-hidden antialiased flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="relative"
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse mb-[15rem] space-x-reverse space-x-10">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  const navigate = useNavigate();

  const handleSeeMoreClick = () => {
    navigate("/product");
  };
  return (
    <div className="max-w-6xl relative z-[100] mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-3xl text-teal-700 md:text-7xl font-bold dark:text-white">
        Guppy Hóc Môn <br />
      </h1>
      <p className="max-w-2xl lg:text-2xl text-md md:text-xl mt-4 dark:text-neutral-200">
        Trại cá cảnh là một nơi chuyên nuôi dưỡng, chăm sóc và nhân giống các
        loại cá cảnh phục vụ nhu cầu chơi cá cảnh của người yêu thích thủy sinh.
      </p>
      <div className="flex justify-start mt-[1rem] w-full">
        <button
          className=" w-[10rem] lg:w-[14rem]  duration-300  rounded-xl text-md lg:text-xl shadow-lg hover:bg-primaryBlack hover:text-teal-500 text-primaryBlack shadow-gray-900 h-[2.5rem] lg:h-[3rem]"
          onClick={handleSeeMoreClick}
        >
          Xem Thêm
        </button>
      </div>
    </div>
  );
};

export const ProductCard = ({ product, translate }) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product cursor-pointer lg:h-[22rem] lg:w-[30rem] h-[12rem] w-[12rem] relative flex-shrink-0"
    >
      <img
        src={product.cardImg}
        className="object-contain lg:mt-0 mt-[15rem] object-left-top absolute lg:w-full lg:h-full h-[100%] w-[100%] inset-0"
        alt={product.title}
      />
      <div className="absolute inset-0 h-full w-full opacity-0 rounded-xl bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
