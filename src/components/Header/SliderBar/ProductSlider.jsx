import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ProductsData from "../../../data/ProductsData.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = () => {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    // Shuffle products and select a subset for the slider
    const shuffledProducts = [...ProductsData].sort(() => 0.5 - Math.random());
    setRandomProducts(shuffledProducts.slice(0, 10)); // Choose 10 random products for the slider
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    centerMode: true,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          centerPadding: "0",
        },
      },
    ],
  };

  return (
    <div className="mb-[3rem] rounded bg-transparent">
      <div className="flex text-primaryBlack justify-center pt-[1.5rem] text-3xl lg:text-[2.5rem] w-full">
        Các Sản Phẩm Khác
      </div>
      <Slider {...settings}>
        {randomProducts.map((data) => (
          <Link to={`/fish/${data.id}`} key={data.id}>
            <div className="group mx-auto mt-[2rem] lg:mt-[3rem] mb-[2rem] lg:w-[12rem] w-[10rem] h-[11rem] lg:h-[14rem] md:h-[12rem] border-b-primaryBlack shadow-lg shadow-primaryGrey hover:shadow-teal-700 rounded-3xl cursor-pointer">
              <LazyLoadImage
                src={data.cardImg}
                alt={data.title}
                effect="black-and-white"
                className="shadow-black rounded-t-3xl mx-auto lg:h-[8rem] lg:w-[12rem] w-[9rem] h-[5.5rem] scale-[1.2] group-hover:scale-[1.3] duration-500 object-contain"
              />
              <div className="text-center mt-2">
                <div className="whitespace-pre-line group-hover:text-teal-600 font-mono font-bold text-lg lg:text-2xl text-primaryBlack">
                  {data.title}
                </div>
                <div className="group-hover:text-teal-800 font-mono font-bold text-md lg:text-xl text-primaryGrey">
                  {data.price}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;