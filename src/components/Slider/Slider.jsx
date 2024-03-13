import React, { useState } from "react";
import { useEffect } from "react";
import { IoArrowUndoOutline } from "react-icons/io5";
import { IoArrowRedoOutline } from "react-icons/io5";

const Slider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(slideInterval);
  }, [currentSlide, nextSlide, slides.length]);

  return (
    <div className="flex justify-center mt-[6rem] lg:mb-[11.95rem] md:mb-[8.95rem] mb-[5.95rem] ">
      <div className=" justify-items-center border-x-8 border-t-black border-y-8 border-x-white shadow-lg  relative w-full max-h-[10rem]">
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={prevSlide}
            className="absolute w-[2.5rem] bg-primaryBlack bg-opacity-40 left-5 mt-[6rem] md:mt-[9rem] lg:mt-[12rem]  z-10 p-2 text-white rounded-full hover:bg-teal-600 focus:outline-none"
          >
            <IoArrowUndoOutline className="w-full h-full" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute w-[2.5rem] bg-primaryBlack bg-opacity-40 right-5 mt-[6rem] md:mt-[9rem] lg:mt-[12rem]  z-10 p-2 text-white rounded-full hover:bg-teal-600 focus:outline-none"
          >
            <IoArrowRedoOutline className="w-full h-full" />
          </button>
        </div>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition duration-1000 ease-in ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.caption}
              className="w-full max-h-[6rem] md:max-h-[9rem] lg:max-h-[12rem] object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-4xl text-white font-bold">{slide.caption}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
