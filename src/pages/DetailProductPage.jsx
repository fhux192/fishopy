import { useParams, useNavigate } from "react-router-dom";
import ProductsData from "../data/ProductsData"; // Import ProductsData
import "react-image-gallery/styles/css/image-gallery.css"; // Import CSS for ImageGallery
import "../scss/customImageGallery.scss"; // Import custom CSS file
import ProductSlider from "../components/Header/SliderBar/ProductSlider.jsx";
import { Input } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addLocalCart } from "../redux/features/user/userSlice.js";
import { CardContainer } from "../components/ui/3d-card.tsx";
import { BackgroundGradient } from "../components/ui/background-gradient.tsx";

const DetailProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = ProductsData.find((item) => item.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details"); // State for active tab
  const [reviews, setReviews] = useState([]); // State for managing reviews
  const [reviewText, setReviewText] = useState(""); // State for new review text

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

  const handleAddToCart = () => {
    const newProd = { ...product, quantity };
    dispatch(addLocalCart(newProd));
  };

  const handleReviewSubmit = () => {
    if (reviewText.trim()) {
      setReviews([...reviews, reviewText]);
      setReviewText("");
    }
  };

  return (
    <>
      <div className="bg-gray-100 lg:mt-[4.3rem] flex flex-col items-center lg:px-0 px-4 lg:py-10 py-4">
        <div className="flex w-full max-w-6xl">
          <div className="bg-white border-2 border-gray-200 rounded-xl w-full max-w-3xl p-6 lg:py-[3rem]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="lg:w-[32rem] rounded-xl lg:translate-x-[-5rem]">
                <img
                  className="rounded-xl"
                  src={product.proImg}
                  alt={product.title}
                />
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl lg:ml-[5rem] font-bold">
                  {product.title}
                </h1>
                <div className="flex items-center lg:ml-[5rem]">
                  <h2 className="text-2xl font-bold text-teal-700 mr-4">
                    {product.discount}₫
                  </h2>
                  {product.price !== product.discount && (
                    <h2 className="text-xl font-semibold  text-gray-500 line-through">
                      {product.price}₫
                    </h2>
                  )}
                </div>
                <div className="flex lg:ml-[5rem] items-center gap-2">
                  <span className="text-lg font-semibold">Tình trạng:</span>
                  <span
                    className={`${
                      product.status === "Còn hàng"
                        ? "text-teal-500"
                        : "text-red-500"
                    } text-lg font-semibold`}
                  >
                    {product.status}
                  </span>
                </div>
                <div className="flex lg:ml-[5rem] items-center gap-1">
                  <span className="text-lg font-semibold">Số lượng:</span>
                  <div className="flex items-center">
                    <button
                      className="px-3 text-xl rounded-full border-primaryBlack py-1"
                      onClick={() =>
                        setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
                      }
                    >
                      -
                    </button>
                    <input
                      className="flex w-[3rem] border-2 rounded-xl text-xl border-gray-400 text-center justify-center"
                      value={quantity}
                      min={1}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button
                      className="px-3 py-1 text-xl"
                      onClick={() => setQuantity((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="border-2 hover:scale-105 border-primaryGrey bg-white   lg:translate-x-[5rem] lg:h-[3rem] lg:w-[90%] lg:text-xl  text-primaryBlack font-bold p-3 rounded-xl transition duration-300"
                >
                  THÊM VÀO GIỎ HÀNG
                </button>
                <button
                  onClick={handlePaymentClick}
                  className="bg-primaryBlack hover:scale-105  lg:translate-x-[5rem] lg:h-[3rem] lg:w-[90%] lg:text-xl text-white font-bold py-3 px-3 rounded-xl transition duration-300"
                >
                  MUA NGAY
                </button>
              </div>
            </div>
            <div className="mt-8">
              <div className="border-b font-semibold border-gray-300">
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
                    CHI TIẾT
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
                <div className="py-6 px-4 lg:px-10">
                  <h1 className="lg:text-4xl text-2xl font-bold mb-4">Mô Tả</h1>
                  <h3 className="text-md text-gray-700 leading-relaxed">
                    {product.description}
                  </h3>
                </div>
              )}
              {activeTab === "introduction" && (
                <div className="p-6 px-4 lg:px-10">
                  <h1 className="lg:text-4xl text-2xl font-bold mb-4">
                    Giới Thiệu
                  </h1>
                  <h3 className="text-md text-gray-700 leading-relaxed">
                    {product.introduction}
                  </h3>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="p-6 px-4 lg:px-10">
                  <h1 className="lg:text-4xl text-2xl font-bold mb-4">
                    Hỏi Đáp
                  </h1>
                  <div className="mb-4">
                    <Input.TextArea
                      rows={4}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Viết câu hỏi của bạn..."
                      className="border-teal-500 rounded-xl w-[100%] hover:border-teal-700 focus:border-teal-700"
                    />
                    <button
                      onClick={handleReviewSubmit}
                      className="mt-4 h-10 w-[10rem] bg-gray-500 rounded-xl border-teal-500 text-white hover:bg-teal-700"
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
          <div className="invisible items-center absolute lg:static lg:visible flex flex-col ml-10">
            {/* Khuyến mãi đặc biệt */}
            <BackgroundGradient className=" w-[20rem] bg-primaryBlack p-4 rounded-xl">
              <h2 className="text-xl gradientText font-bold text-teal-500 flex items-center">
                {" "}
                {/* Thêm icon */}
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
            {/* Chính sách */}
            <div className="  mt-10 w-[20rem] border-4 border-gray-700 bg-white p-4 rounded-xl ">
              <h3 className="text-xl font-bold text-primaryBlack flex items-center">
                {/* Thêm icon */}
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
      <ProductSlider />
    </>
  );
};

export default DetailProductPage;
