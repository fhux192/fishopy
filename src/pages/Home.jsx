/* eslint-disable react/prop-types */
import { useAnimate } from "framer-motion";
import { useRef } from "react";
import ProductsData from "../data/ProductsData";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/product");
  };
  return (
    <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={ProductsData.map((product) => product.cardImg)}
    >
      <section className="grid h-screen w-full place-content-center bg-gray-100">
        <p className="flex  items-center gap-2 text-3xl font-bold uppercase text-black">
          <div>
            <span className="text-2xl lg:text-5xl">Nhấn Vào Màn Hình</span>
            <div className="text-center mt-4 lg:text-4xl text-xl">Hoặc</div>
            <button
              onClick={handleNavigation}
              className="w-[100%]  lg:h-[4rem] h-11 mt-4 text-xl lg:text-4xl shadow-md shadow-black rounded-xl hover:bg-primaryBlack hover:text-white hover:shadow-teal-500 duration-300 border-primaryBlack"
            >
              Xem Tất Cả Sản Phẩm
            </button>
          </div>
        </p>
      </section>
    </MouseImageTrail>
  );
};

const MouseImageTrail = ({
  children,
  // List of image sources
  images,
  // Will render a new image every X pixels between mouse moves
  renderImageBuffer,
  // images will be rotated at a random number between zero and rotationRange,
  // alternating between a positive and negative rotation
  rotationRange,
}) => {
  const [scope, animate] = useAnimate();

  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;

    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = clientX;
      lastRenderPosition.current.y = clientY;

      renderNextImage();
    }
  };

  const calculateDistance = (x1, y1, x2, y2) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    // Using the Pythagorean theorem to calculate the distance
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    return distance;
  };

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % 20;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;

    const el = document.querySelector(selector);

    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;

    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${
            imageIndex % 2
              ? `rotate(${rotation}deg)`
              : `rotate(-${rotation}deg)`
          }`,
          `translate(-50%, -50%) scale(1) ${
            imageIndex % 2
              ? `rotate(-${rotation}deg)`
              : `rotate(${rotation}deg)`
          }`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 200 }
    );

    animate(
      selector,
      {
        opacity: [1, 0],
      },
      { ease: "linear", duration: 0.5, delay: 5 }
    );

    imageRenderCount.current = imageRenderCount.current + 1;
  };

  return (
    <div
      ref={scope}
      className="relative overflow-hidden"
      onClick={handleMouseMove}
    >
      {children}

      {images.map((img, index) => (
        <img
          className="pointer-events-none absolute left-0 top-0 lg:h-48 lg:w-54 h-28 w-30 rounded-xl border-4 border-teal-900 bg-white object-contain opacity-0"
          src={img}
          alt={`Mouse move image ${index}`}
          key={index}
          data-mouse-move-index={index}
        />
      ))}
    </div>
  );
};

export default Home;
