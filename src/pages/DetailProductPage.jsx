import { useParams, useNavigate } from "react-router-dom";
import ProductsData from "../data/ProductsData"; // Import ProductsData
import "react-image-gallery/styles/css/image-gallery.css"; // Import CSS for ImageGallery
import "../scss/customImageGallery.scss"; // Import custom CSS file
import ProductSlider from "../components/Header/SliderBar/ProductSlider.jsx";
import { Input } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLocalCart } from "../redux/features/user/userSlice.js";

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

  const originalPrice = Math.floor(product.price * 1.2);

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
      <div className="bg-gray-200 flex flex-col items-center lg:px-0 px-4 lg:py-10 py-4">
        <div className="flex w-full max-w-5xl">
          <div className="bg-white shadow-xl rounded-lg w-full max-w-3xl p-6 lg:py-[3rem]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="lg:w-[32rem] rounded-xl lg:translate-x-[-7rem]">
                <img className="rounded-xl" src={product.proImg} alt={product.title} />
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl lg:ml-[5rem] font-bold">{product.title}</h1>
                <div className="flex items-center lg:ml-[5rem]">
                  <p className="text-2xl font-bold text-teal-700 mr-4">{product.price}₫</p>
                  <p className="text-xl text-gray-500 line-through">{originalPrice}.000₫</p>
                </div>
                <div className="flex lg:ml-[5rem] items-center gap-2">
                  <span className="text-lg">Tình trạng:</span>
                  <span
                    className={`${
                      product.status === "Còn hàng" ? "text-teal-500" : "text-red-500"
                    } text-lg font-semibold`}
                  >
                    {product.status}
                  </span>
                </div>
                <div className="flex lg:ml-[5rem] items-center gap-1">
                  <span className="text-lg">Số lượng:</span>
                  <div className="flex items-center">
                    <button
                      className="px-3 text-xl rounded-full border-primaryBlack py-1"
                      onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : prev))}
                    >
                      -
                    </button>
                    <input
                      className="flex w-[3rem] border-2 rounded-xl text-xl border-gray-400 text-center justify-center"
                      value={quantity}
                      min={1}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button className="px-3 py-1 text-xl" onClick={() => setQuantity((prev) => prev + 1)}>
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="bg-gray-500 shadow-md shadow-gray-700 hover:shadow-teal-700 lg:translate-x-[5rem] lg:h-[3rem] lg:w-[90%] lg:text-xl hover:bg-gray-700 text-white font-bold py-3 px-3 rounded-xl transition duration-300"
                >
                  THÊM VÀO GIỎ HÀNG
                </button>
                <button
                  onClick={handlePaymentClick}
                  className="bg-primaryBlack shadow-md shadow-black lg:translate-x-[5rem] lg:h-[3rem] lg:w-[90%] lg:text-xl hover:bg-teal-700 text-white font-bold py-3 px-3 rounded-xl transition duration-300"
                >
                  MUA NGAY
                </button>
              </div>
            </div>
            <div className="mt-8">
              <div className="border-b border-gray-300">
                <nav className="flex lg:justify-center lg:text-lg lg:gap-10 justify-between text-sm">
                  <button
                    className={`py-2 px-4 ${
                      activeTab === "details" ? "border-b-2 border-teal-500 text-teal-500" : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab("details")}
                  >
                    MÔ TẢ
                  </button>
                  <button
                    className={`py-2 px-4 ${
                      activeTab === "introduction" ? "border-b-2 border-teal-500 text-teal-500" : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab("introduction")}
                  >
                    CHI TIẾT
                  </button>
                  <button
                    className={`py-2 px-4 ${
                      activeTab === "reviews" ? "border-b-2 border-teal-500 text-teal-500" : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab("reviews")}
                  >
                    HỎI ĐÁP
                  </button>
                </nav>
              </div>
              {activeTab === "details" && (
                <div className="py-6 px-4 lg:px-10">
                  <h2 className="lg:text-4xl text-2xl font-bold mb-4">Mô Tả</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">{product.description}</p>
                </div>
              )}
              {activeTab === "introduction" && (
                <div className="p-6 px-4 lg:px-10">
                  <h2 className="lg:text-3xl text-2xl font-semibold mb-4">Giới Thiệu</h2>
                  <p className="text-md text-gray-700 leading-relaxed">{product.introduction}</p>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="p-6 px-4 lg:px-10">
                  <h2 className="lg:text-3xl text-2xl font-semibold mb-4">Hỏi Đáp</h2>
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
                          <p className="text-md text-gray-700">{review}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-md text-gray-700">Chưa có câu hỏi nào.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="invisible absolute lg:static lg:visible flex flex-col ml-10">
            {/* Khuyến mãi đặc biệt */}
            <div className="shadow-gray-700 w-[20rem] bg-primaryBlack p-4 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-teal-500 flex items-center">
                {" "}
                {/* Thêm icon */}
                Khuyến mãi đặc biệt
              </h3>
              <ul className="list-disc text-md text-white pl-6">
                <li>Giảm 10% khi mua từ 2 sản phẩm trở lên.</li>
                <li>Giảm trực tiếp 10%, tối đa 200.000 VNĐ khi thanh toán từ 1 triệu đồng.</li>
                <li>Miễn phí giao hàng hóa đơn 300.000 VNĐ</li>
                <li>Tặng cá Dumbo với hóa đơn trên 1.000.000 đ.</li>
              </ul>
            </div>
            {/* Chính sách */}
            <div className="shadow-gray-700 mt-10 w-[20rem] bg-white p-4 rounded-xl shadow-md">
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
