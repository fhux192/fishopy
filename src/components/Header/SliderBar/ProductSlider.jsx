import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import ProductsData from "../../../data/ProductsData.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../scss/navbar.scss";

const ProductSlider = () => {
  const [randomProducts, setRandomProducts] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Shuffle products and select a subset for the slider
    const shuffledProducts = [...ProductsData].sort(() => 0.5 - Math.random());
    setRandomProducts(shuffledProducts.slice(0, 10)); // Choose 10 random products for the slider
  }, []);

  useEffect(() => {
    if (randomProducts.length > 0) {
      const imageLoadPromises = randomProducts.map((product) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = product.cardImg;
          img.onload = resolve;
        });
      });

      Promise.all(imageLoadPromises).then(() => {
        setImagesLoaded(true);
      });
    }
  }, [randomProducts]);

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

  if (!imagesLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="mb-[3rem] rounded bg-transparent">
      <h2 className=" flex lg:h-[6rem] h-[4rem] lg:border-[10px] border-[5px] border-gray-100 bg-white items-center text-teal-700 justify-center  text-3xl lg:text-[2.5rem] w-full">
       Các Sản Phẩm Khác
      </h2>
      <Slider {...settings}>
        {randomProducts.map((data) => (
          <Link to={`/fish/${data.id}`} key={data.id}>
            <div className="group mx-auto mt-[2rem] lg:mt-[3rem] mb-[2rem] lg:w-[12rem] w-[10rem] h-[11rem] lg:h-[14rem] md:h-[12rem]  shadow-lg shadow-primaryGrey hover:shadow-teal-700 rounded-3xl cursor-pointer">
              <img
                src={data.cardImg}
                alt={data.title}
                className="shadow-black rounded-t-3xl mx-auto lg:h-[8rem] lg:w-[12rem] w-[10rem] h-[6.5rem] scale-[1.2] group-hover:scale-[1.3] duration-500 object-contain"
              />
              <div className="text-center mt-3">
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
