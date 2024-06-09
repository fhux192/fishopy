/* eslint-disable no-unused-vars */
import { useParams, useNavigate } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import ProductsData from "../data/ProductsData"; // Import ProductsData
import "react-image-gallery/styles/css/image-gallery.css"; // Import CSS for ImageGallery
import "../scss/customImageGallery.scss"; // Import custom CSS file
import ProductSlider from "../components/Header/SliderBar/ProductSlider.jsx";
import { InputNumber, Input, Button } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLocalCart } from "../redux/features/user/userSlice.js";

const DetailProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = ProductsData.find((item) => item.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details'); // State for active tab
  const [reviews, setReviews] = useState([]); // State for managing reviews
  const [reviewText, setReviewText] = useState(''); // State for new review text

  const dispatch = useDispatch();
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

  const handleAddToCart = () => {
    product.quantity = quantity;
    dispatch(addLocalCart(product));
  };

  const handleReviewSubmit = () => {
    if (reviewText.trim()) {
      setReviews([...reviews, reviewText]);
      setReviewText('');
    }
  };

  return (
    <>
      <div className="bg-gray-200 min-h-screen flex justify-center lg:px-0 px-4 lg:py-10 py-4">
        <div className="bg-white  shadow-lg rounded-lg w-full max-w-6xl p-6 lg:py-[3rem]">
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
              <p className="text-2xl font-bold text-teal-700">
                Giá: {product.price}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-lg">Tình trạng:</span>
                <span
                  className={`${
                    product.status === "new" ? "text-teal-500" : "text-red-500"
                  } text-lg font-semibold`}
                >
                  {product.status}
                </span>
              </div>
              <div className="flex items-center lg:mt-[5%] gap-2">
                <span className="text-lg">Số lượng:</span>
                <div className="flex items-center rounded">
                  <button
                    className="px-3 py-1"
                    onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : prev))}
                  >
                    -
                  </button>
                  <InputNumber
                    className="w-16 text-center"
                    value={quantity}
                    controls={false}
                    min={1}
                    onChange={(value) => setQuantity(value)}
                  />
                  <button
                    className="px-3 py-1 border-l"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className="bg-gray-500 lg:w-[90%] lg:text-xl hover:bg-gray-700 text-white font-bold py-3 px-3 rounded-xl transition duration-300"
              >
                THÊM VÀO GIỎ HÀNG
              </button>
              <button
                onClick={handlePaymentClick}
                className="bg-primaryBlack lg:w-[90%] lg:text-xl hover:bg-teal-700 text-white font-bold py-3 px-3 rounded-xl transition duration-300"
              >
                MUA NGAY
              </button>
            </div>
          </div>
          <div className="mt-8">
            <div className="border-b border-gray-300">
              <nav className="flex lg:justify-center lg:text-lg lg:gap-10 justify-between text-sm">
                <button
                  className={`py-2 px-4 ${activeTab === 'details' ? 'border-b-2 border-teal-500 text-teal-500' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('details')}
                >
                  MÔ TẢ
                </button>
                <button
                  className={`py-2 px-4 ${activeTab === 'introduction' ? 'border-b-2 border-teal-500 text-teal-500' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('introduction')}
                >
                  CHI TIẾT
                </button>
                <button
                  className={`py-2 px-4 ${activeTab === 'reviews' ? 'border-b-2 border-teal-500 text-teal-500' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  ĐÁNH GIÁ
                </button>
              </nav>
            </div>
            {activeTab === 'details' && (
              <div className="py-6 px-4 lg:px-10">
                <h2 className="lg:text-4xl text-2xl font-bold mb-4">
                  Mô Tả
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}
            {activeTab === 'introduction' && (
              <div className="p-6 px-4 lg:px-10">
                <h2 className="lg:text-3xl text-2xl font-semibold mb-4">
                  Giới Thiệu
                </h2>
                <p className="text-md text-gray-700 leading-relaxed">
                  {product.introduction}
                </p>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="p-6 px-4 lg:px-10">
                <h2 className="lg:text-3xl text-2xl font-semibold mb-4">
                  Đánh Giá
                </h2>
                <div className="mb-4">
                  <Input.TextArea
                    rows={4}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Viết đánh giá của bạn..."
                    className="border-teal-500 rounded-xl w-[100%] hover:border-teal-700 focus:border-teal-700"
                  />
                  <button
                    onClick={handleReviewSubmit}
                    className="mt-4 h-10 w-[10rem] bg-gray-500 rounded-xl border-teal-500 text-white hover:bg-teal-700"
                  >
                    Gửi Đánh Giá
                  </button>
                </div>
                <div className="space-y-4">
                  {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                      <div key={index} className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-md text-gray-700">{review}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-md text-gray-700">
                      Chưa có đánh giá nào.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ProductSlider />
    </>
  );
};

export default DetailProductPage;
