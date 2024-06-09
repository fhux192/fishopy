/* eslint-disable no-unused-vars */
import { useParams, useNavigate } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import Navbar from "../components/Header/Navbar/Navbar.jsx"; // Import Navbar
import ProductsData from "../data/ProductsData"; // Import ProductsData
import "react-image-gallery/styles/css/image-gallery.css"; // Import CSS for ImageGallery
import "../scss/customImageGallery.scss"; // Import custom CSS file
import ProductSlider from "../components/Header/SliderBar/ProductSlider.jsx";

const DetailProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = ProductsData.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-2xl">Product not found</h1>
      </div>
    );
  }

  const images = [
    {
      original: product.proImg,
      thumbnail: product.proImg,
    },
  ];

  const handlePaymentClick = () => {
    navigate("/payment", { state: { product } });
  };

  return (
    <>
      <Navbar /> {/* Include Navbar */}
      <div className="bg-gray-200 min-h-screen flex justify-center py-10">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <ImageGallery
                items={images}
                showPlayButton={false}
                showFullscreenButton={true} // Enable Fullscreen Button
                autoPlay={true} // Enable autoPlay
                slideInterval={3000} // Slide interval in milliseconds
                infinite={true} // Enable infinite looping
              />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <p className="text-[1.4rem] font-bold text-teal-500">
              {product.price}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-lg">Tình trạng:</span>
                <span
                  className={`${
                    product.status === "new" ? "text-teal-400" : "text-red-500"
                  } text-lg font-semibold`}
                >
                  {product.status}
                </span>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-inner overflow-y-auto h-40">
                <h2 className="lg:text-3xl text-2xl font-semibold mb-2">
                  Giới Thiệu
                </h2>
                <p className="text-[1rem]">{product.introduction}</p>
              </div>
              <div className="grid justify-items-center gap-4">
                <button className="bg-gray-500 w-[100%] lg:w-full lg:text-xl hover:bg-gray-700 text-white font-bold py-3 px-3 rounded-xl transition duration-300">
                  THÊM VÀO GIỎ HÀNG
                </button>
                <button
                  onClick={handlePaymentClick}
                  className="bg-primaryBlack w-[100%] lg:w-full lg:text-xl hover:bg-teal-700 text-white font-bold py-3 px-3 rounded-xl transition duration-300"
                >
                  MUA NGAY
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 border-2 border-gray-300 p-6 rounded-lg">
            <h2 className="lg:text-3xl text-2xl font-bold mb-4 text-center">
              Mô Tả
            </h2>
            <div
              className="text-lg text-gray-700 leading-relaxed product-description"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </div>
      </div>
      <ProductSlider />
    </>
  );
};

export default DetailProductPage;
