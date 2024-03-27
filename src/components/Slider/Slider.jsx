import React, { useState, useEffect } from "react";
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
    <div
      className={`group  flex justify-center lg:mb-[14.95rem] md:mb-[12.95rem] mb-[8.95rem]  `}
    >
      <div className=" justify-items-center border-x-8 border-t-black border-y-8 border-x-white shadow-lg  relative w-full max-h-[10rem]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-[0] mx-[1rem] transition duration-300 ease-in ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex">
            <img
              src={slide.image}
              alt={slide.caption}
              className="w-[50rem] max-h-[9rem] md:max-h-[12rem] lg:max-h-[15rem] object-contain"
            />
            <img
              src={slide.image2}
              alt={slide.caption}
              className="w-[50rem] max-h-[9rem] md:max-h-[12rem] lg:max-h-[15rem] object-contain"
            />
            <img
              src={slide.image3}
              alt={slide.caption}
              className="w-[50rem] max-h-[9rem] md:max-h-[12rem] lg:max-h-[15rem] object-contain"
            />
            </div>
            
            <div className="absolute inset-0 bg-black opacity-90"></div>
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
