import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "react-image-gallery/styles/css/image-gallery.css";
import "../scss/detailProducts.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BackgroundGradient } from "../components/ui/background-gradient.tsx";
import { callAddToCart, callFetchProductById } from "../services/api.js";
import { addToCart, updateAccount } from "../redux/features/user/userSlice.js";
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
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const user = useSelector((state) => state.account.user);

  const dispatch = useDispatch();

  const handlePaymentClick = () => {
    navigate("/payment", { state: { product, quantity } });
  };

  const handleAddToCart = async () => {
    if (user) {
      try {
        const res = await callAddToCart({ product: product._id, quantity });
        if (res.vcode === 0) {
          toast.success(res.message);
          dispatch(updateAccount({ cart: res.data }));
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

  useEffect(() => {
    const getDetailProduct = async () => {
      try {
        const res = await callFetchProductById(id);
        if (res.vcode == 0) {
          setProduct(res.data);
        } else console.error(res.message);
      } catch (error) {
        console.error(error);
      }
    };
    getDetailProduct();
  }, []);

  return (
    <>
      <div className="bg-gray-100 flex flex-col items-center lg:px-0 px-4 lg:py-10 py-4">
        {product && (
          <div className="flex w-full max-w-6xl">
            <div className="lg:mt-[4.3rem] mt-[4rem] bg-white border-2 border-gray-200 rounded-xl w-full max-w-5xl p-6 lg:py-[3rem]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="lg:w-[32rem] lg:h-[18rem] rounded-xl lg:translate-x-[-5rem] relative pt-[56.25%]">
                  {" "}
                  <iframe
                    width="100%"
                    height="100%"
                    src={`${product.video}?autoplay=1&mute=1&vq=hd1080`}
                    title={product.name}
                    className="absolute top-0 left-0 w-full h-full rounded-xl"
                  ></iframe>
                </div>

                <div className="flex flex-col lg:gap-2 gap-2">
                  <h1 className="text-3xl lg:ml-[5rem] font-bold text-primaryGrey">
                    {product.name}
                  </h1>
                  <div className="flex items-center lg:ml-[5rem]">
                    <h2 className="text-2xl font-bold text-primaryTeal mr-4">
                      {product.discountedPrice}₫
                    </h2>
                    {product.price !== product.discountedPrice && (
                      <h2 className="text-xl font-semibold text-gray-500 line-through">
                        {product.price}₫
                      </h2>
                    )}
                  </div>
                  <div className="flex  lg:ml-[5rem] items-center gap-2">
                    <span className="text-lg text-primaryBlack font-semibold">Tình trạng:</span>
                    <span className="text-lg text-primaryBlack font-semibold">
                      {product.status ? "Còn hàng" : "Hết hàng"}
                    </span>
                  </div>
                  <div className="flex mb-6 lg:ml-[5rem] items-center gap-1">
                    <span className="text-lg text-primaryBlack font-semibold">Số lượng:</span>
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
                    <p>THÊM VÀO GIỎ HÀNG</p>
                  </button>
                  <button
                    onClick={handlePaymentClick}
                    className="group hover:border-teal-500 hover:border-2 bg-primaryBlack lg:translate-x-[5rem] lg:h-[3rem] lg:w-[90%] lg:text-xl text-lg text-white font-bold py-2 px-3 rounded-xl transition duration-300"
                  >
                    <p className=" duration-300">MUA NGAY</p>
                  </button>
                </div>
              </div>
              <div className="mt-8">
                <div className="border-b font-semibold  border-gray-300">
                  <nav className="flex lg:justify-center lg:text-lg lg:gap-10 justify-between text-sm">
                    <button
                      className={`py-2 px-4 ${
                        activeTab === "details"
                          ? "border-b-2 border-primaryTeal text-primaryTeal"
                          : "text-gray-500"
                      }`}
                      onClick={() => setActiveTab("details")}
                    >
                      MÔ TẢ
                    </button>
                    <button
                      className={`py-2 px-4 ${
                        activeTab === "introduction"
                          ? "border-b-2 border-primaryTeal text-primaryTeal"
                          : "text-gray-500"
                      }`}
                      onClick={() => setActiveTab("introduction")}
                    >
                      CÁCH NUÔI
                    </button>
                    <button
                      className={`py-2 px-4 ${
                        activeTab === "reviews"
                          ? "border-b-2 border-primaryTeal text-primaryTeal"
                          : "text-gray-500"
                      }`}
                      onClick={() => setActiveTab("reviews")}
                    >
                      LIÊN HỆ
                    </button>
                  </nav>
                </div>
                {activeTab === "details" && (
                  <div className="overflow-auto h-[20rem] md:h-[30rem] lg:h-[40rem] px-4 lg:px-10">
                    <img src={product.proImg} className="rounded-xl my-8" alt="" />
                    <ProductDescription description={product.desc} />
                  </div>
                )}
                {activeTab === "introduction" && (
                  <div className=" px-4 lg:px-10">
                    <ProductDetail detail={product.detail} />
                  </div>
                )}
                {activeTab === "reviews" && (
                  <div className="p-6 px-4 lg:px-10">
                    <a
                      href="https://zalo.me/0388811160"
                      className="flex justify-center font-semibold text-[1.2rem]"
                    >
                      {" "}
                      Nhấn vào để được tư vấn
                    </a>
                    <div className="relative flex justify-center items-center gap-2">
                      <p className="font-bold text-[1.5rem]">Zalo:</p>
                      <a className="text-[1.2rem]" href="https://zalo.me/0388811160">
                        {" "}
                        https://zalo.me/0388811160
                      </a>
                    </div>{" "}
                  </div>
                )}
              </div>
            </div>
            <div className="invisible items-center absolute lg:mt-[4.3rem] lg:static lg:visible flex flex-col ml-10">
              <BackgroundGradient className="w-80 bg-primaryBlack p-4 rounded-xl">
                <h2 className="text-[1.4rem] gradientText font-bold text-teal-500 flex items-center">
                  Khuyến mãi đặc biệt
                </h2>
                <ul className="list-disc text-md text-white pl-6">
                  <li>Giảm 10% khi mua từ 2 sản phẩm trở lên.</li>
                  <li>Giảm trực tiếp 10%, tối đa 200.000 VNĐ khi thanh toán từ 1 triệu đồng.</li>
                  <li>Miễn phí giao hàng hóa đơn 300.000 VNĐ</li>
                  <li>Tặng cá Dumbo với hóa đơn trên 1.000.000 đ.</li>
                </ul>
              </BackgroundGradient>
              <div className="mt-10 w-80 border-4 border-primaryBlack bg-white p-4 rounded-xl">
                <h3 className="text-[1.4rem] font-bold text-primaryBlack flex items-center">
                  Chính sách Guppy Hóc Môn
                </h3>
                <ul className="list-disc text-primaryGrey text-md pl-6">
                  <li>Nhận hàng - Kiểm tra - Thanh toán</li>
                  <li>Quà tặng: Hủ cám với hóa đơn</li>
                  <li>Bảo hành: Giao lại nếu cá có vấn đề</li>
                  <li>Hotline: 0388.811.160.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailProductPage;
