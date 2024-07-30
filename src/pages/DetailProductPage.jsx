import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Data from "../data/Data"; // Import ProductsData
import "react-image-gallery/styles/css/image-gallery.css"; // Import CSS for ImageGallery
import "../scss/customImageGallery.scss"; // Import custom CSS file
import { Input } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BackgroundGradient } from "../components/ui/background-gradient.tsx";
import { callAddToCart } from "../services/api.js";
import { addToCart } from "../redux/features/user/userSlice.js";
import { toast } from "react-toastify";

const ProductDescription = ({ description }) => (
  <div className="product-description" dangerouslySetInnerHTML={{ __html: description }} />
);
const ProductDetail = ({ detail }) => (
  <div className="product-description" dangerouslySetInnerHTML={{ __html: detail }} />
);

const DetailProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = Data.find((item) => item._id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const userInfo = useSelector((state) => state.user.userInfo);

  const dispatch = useDispatch();

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-2xl">Product not found</h1>
      </div>
    );
  }

  const handlePaymentClick = () => {
    navigate("/payment", { state: { product, quantity } });
  };

  const handleAddToCart = async () => {
    if (userInfo) {
      try {
        const res = await callAddToCart({ productId: product._id, quantity });
        if (res.vcode === 0) {
          toast.success(res.message);
          dispatch(addToCart({ product, quantity }));
        }
      } catch (error) {
        toast.error("Error adding to cart");
        console.error(error);
      }
    } else {
      navigate("/login");
    }
  };

  const handleReviewSubmit = () => {
    if (reviewText.trim()) {
      setReviews([...reviews, reviewText]);
      setReviewText("");
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <>
      <div className="bg-gray-100 flex flex-col items-center lg:px-0 px-4 lg:py-10 py-4">
        <div className="flex w-full max-w-6xl">
          <div className="lg:mt-[4.3rem] mt-[4rem] bg-white border-2 border-gray-200 rounded-xl w-full max-w-5xl p-6 lg:py-[3rem]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="lg:w-[32rem] lg:h-[18rem] rounded-xl lg:translate-x-[-5rem] relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
                <iframe
                  width="100%"
                  height="100%"
                  src={`${product.videoUrl}?autoplay=1&mute=1&vq=hd1080`}
                  title={product.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                ></iframe>
              </div>

              <div className="flex flex-col lg:gap-2 gap-2">
                <h1 className="text-3xl lg:ml-[5rem] font-bold">
                  {product.title}
                </h1>
                <div className="flex items-center lg:ml-[5rem]">
                  <h2 className="text-2xl font-bold text-primaryTeal mr-4">
                    {product.discount}₫
                  </h2>
                  {product.price !== product.discount && (
                    <h2 className="text-xl font-semibold text-gray-500 line-through">
                      {product.price}₫
                    </h2>
                  )}
                </div>
                <div className="flex  lg:ml-[5rem] items-center gap-2">
                  <span className="text-lg font-semibold">Tình trạng:</span>
                  <span className="text-lg font-semibold">
                    {product.status}
                  </span>
                </div>
                <div className="flex mb-6 lg:ml-[5rem] items-center gap-1">
                  <span className="text-lg font-semibold">Số lượng:</span>
                  <div className="flex items-center">
                    <button
                      className="px-3 text-xl rounded-full border-primaryBlack py-1"
                      onClick={decrementQuantity}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <input
                      className="w-[3rem] border-2 rounded-xl text-xl border-gray-200 text-center"
                      type="number"
                      value={quantity}
                      min={1}
                      onChange={handleQuantityChange}
                      aria-label="Product quantity"
                    />
                    <button
                      className="px-3 py-1 text-xl"
                      onClick={incrementQuantity}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="group hover:border-primaryBlack border-2 border-gray-150 bg-white lg:translate-x-[5rem] lg:h-[3rem] lg:w-[90%] lg:text-xl text-lg text-primaryBlack font-bold p-2 rounded-xl transition duration-300"
                >
                  <p className="group-hover:scale-95 duration-300">
                    THÊM VÀO GIỎ HÀNG
                  </p>
                </button>
                <button
                  onClick={handlePaymentClick}
                  className="group hover:border-teal-500 hover:border-2 bg-primaryBlack lg:translate-x-[5rem] lg:h-[3rem] lg:w-[90%] lg:text-xl text-lg text-white font-bold py-2 px-3 rounded-xl transition duration-300"
                >
                  <p className="group-hover:scale-95 duration-300">MUA NGAY</p>
                </button>
              </div>
            </div>
            <div className="mt-8">
              <div className="border-b font-semibold  border-gray-300">
                <nav className="flex lg:justify-center lg:text-lg lg:gap-10 justify-between text-sm">
                  <button
                    className={`py-2 px-4 ${
                      activeTab === "details"
                        ? "border-b-2 border-teal-700 text-teal-700"
                        : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab("details")}
                  >
                    MÔ TẢ
                  </button>
                  <button
                    className={`py-2 px-4 ${
                      activeTab === "introduction"
                        ? "border-b-2 border-teal-700 text-teal-700"
                        : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab("introduction")}
                  >
                    CÁCH NUÔI
                  </button>
                  <button
                    className={`py-2 px-4 ${
                      activeTab === "reviews"
                        ? "border-b-2 border-teal-700 text-teal-700"
                        : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab("reviews")}
                  >
                    HỎI ĐÁP
                  </button>
                </nav>
              </div>
              {activeTab === "details" && (
                <div className="overflow-auto h-[30rem] px-4 lg:px-10">
          
                  <ProductDescription description={product.description} />
                </div>
              )}
              {activeTab === "introduction" && (
                <div className=" px-4 lg:px-10">
                   <ProductDetail detail={product.detail} />
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="p-6 px-4 lg:px-10">
                  <div className="mb-4">
                    <Input.TextArea
                      rows={4}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Viết câu hỏi của bạn..."
                      className="border-teal-500 rounded-xl w-full hover:border-teal-700 focus:border-teal-700"
                    />
                    <button
                      onClick={handleReviewSubmit}
                      className="mt-4 h-10 w-40 bg-gray-500 rounded-xl border-teal-500 text-white hover:bg-teal-700"
                    >
                      Gửi Câu Hỏi
                    </button>
                  </div>
                  <div className="space-y-4">
                    {reviews.length > 0 ? (
                      reviews.map((review, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-lg">
                          <h3 className="text-md text-gray-700">{review}</h3>
                        </div>
                      ))
                    ) : (
                      <h3 className="text-md text-gray-700">
                        Chưa có câu hỏi nào.
                      </h3>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="invisible items-center absolute lg:mt-[4.3rem] lg:static lg:visible flex flex-col ml-10">
            <BackgroundGradient className="w-80 bg-primaryBlack p-4 rounded-xl">
              <h2 className="text-xl gradientText font-bold text-teal-500 flex items-center">
                Khuyến mãi đặc biệt
              </h2>
              <ul className="list-disc text-md text-white pl-6">
                <li>Giảm 10% khi mua từ 2 sản phẩm trở lên.</li>
                <li>
                  Giảm trực tiếp 10%, tối đa 200.000 VNĐ khi thanh toán từ 1
                  triệu đồng.
                </li>
                <li>Miễn phí giao hàng hóa đơn 300.000 VNĐ</li>
                <li>Tặng cá Dumbo với hóa đơn trên 1.000.000 đ.</li>
              </ul>
            </BackgroundGradient>
            <div className="mt-10 w-80 border-4 border-gray-700 bg-white p-4 rounded-xl">
              <h3 className="text-xl font-bold text-primaryBlack flex items-center">
                Chính sách Guppy Hóc Môn
              </h3>
              <ul className="list-disc text-gray-700 text-md pl-6">
                <li>Miễn phí: Một số sản phẩm.</li>
                <li>Quà tặng: Với hóa đơn trên 1 triệu.</li>
                <li>Bảo hành: Toàn bộ thời gian.</li>
                <li>Hotline: 0388.811.160.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProductPage;
