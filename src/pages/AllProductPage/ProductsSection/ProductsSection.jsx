import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { updateAccount } from "../../../redux/features/user/userSlice.js";
import { callAddToCart } from "../../../services/api.js";
import { toast } from "react-toastify";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../../../scss/allProduct.scss";

const formatPrice = (price) =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const ProductCard = ({ product, priceStage, animationDelay }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.account.user); // Corrected selector

  const discountPercentage =
    ((product.price - product.discountedPrice) / product.price) * 100;

  const handleAddToCart = async (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
    event.stopPropagation(); // Ngăn chặn sự kiện lan truyền
    if (user) {
      try {
        const res = await callAddToCart({ product: product._id, quantity: 1 });
        if (res.vcode === 0) {
          toast.success(res.message);
          dispatch(updateAccount({ cart: res.data }));
        } else {
          toast.error(res.message || "Failed to add to cart");
        }
      } catch (error) {
        toast.error("Error adding to cart");
        console.error(error);
      }
    } else {
      toast.info("Vui lòng đăng nhập để thêm vào giỏ hàng"); // "Please log in to add to cart"
      navigate("/login");
    }
  };

  return (
    <div
      className={`product-card`}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <Link to={`/fish/${product._id}`} className="image-wrapper">
        <LazyLoadImage
          src={`${import.meta.env.VITE_BASE_URL}/images/fish/${product.images[0]}`}
          effect="blur"
          className="rounded-t-3xl w-full h-64 object-cover"
          alt={`${product.name} image`}
        />
        <div className="text-content">
          <h2 className="title">{product.name}</h2>
          <div className="h-full w-full flex items-center ">
            <p className="text-primaryTeal font-bold">
              {product.price === product.discountedPrice ? (
                <span>{formatPrice(product.price)}₫</span>
              ) : (
                <>
                  {priceStage === 0 && (
                    <span>{formatPrice(product.price)}₫</span>
                  )}
                  {priceStage === 1 && (
                    <span className="line-through">
                      {formatPrice(product.price)}₫
                    </span>
                  )}
                  {priceStage === 2 && (
                    <span>{formatPrice(product.discountedPrice)}₫</span>
                  )}
                </>
              )}
            </p>
            {product.price !== product.discountedPrice && (
              <div className="discount">-{Math.round(discountPercentage)}%</div>
            )}
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={(e) => handleAddToCart(e)}
            className={`add-to-cart  ${
              !product.status ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label={`Add ${product.name} to cart`}
            disabled={!product.status}
          >
            <FaCartShopping /> Mua ngay
          </button>
        </div>
      </Link>
    </div>
  );
};

// Fisher-Yates Shuffle Function
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const ProductsSection = ({ currentPageProducts, priceStage }) => {
  const shuffledProducts = React.useMemo(
    () => shuffleArray(currentPageProducts),
    [currentPageProducts]
  );

  return (
    <div className="lg:bg-transparent pb-4">
      <div className="product-section rounded-xl">
        <div className="product-container">
          <div className="flex w-full justify-center">
            <div className="product-grid grid gap-4 lg:mx-0 ">
              {currentPageProducts.map((product, index) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  priceStage={priceStage}
                  animationDelay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
