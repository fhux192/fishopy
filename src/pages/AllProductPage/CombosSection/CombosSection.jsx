import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAccount,
  updateCartLocal,
} from "../../../redux/features/user/userSlice.js";
import { callAddToCart } from "../../../services/api.js";
import { toast } from "react-toastify";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../../../scss/allProduct.scss";

const formatPrice = (price) =>
  price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".") || 0;

const ProductCard = ({ product, priceStage, animationDelay }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.account); // Corrected selector
  const [lightPosition, setLightPosition] = useState({ x: -100, y: -100 });

  const discountPercentage =
    ((product.price - product.discountedPrice) / product.price) * 100;

  const handleAddToCart = async (event) => {
    event.preventDefault(); // Prevent default <a> action
    event.stopPropagation(); // Prevent event bubbling
    if (user) {
      try {
        const res = await callAddToCart({
          product: product._id,
          quantity: 1,
        });
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
      toast.success(`Thêm ${product.name} vào giỏ hàng thành công! `);
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const productExist = cart.find(
        (item) => item.product._id === product._id
      );
      if (productExist) {
        productExist.quantity += 1;
      } else
        cart = [
          ...cart,
          { product: { ...product }, quantity: 1, _id: product._id },
        ];
      dispatch(updateCartLocal(cart));
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // Giới hạn vị trí x và y để hiệu ứng không vượt ra ngoài card
    const effectSize = 150; // Kích thước của hiệu ứng sáng (px)
    x = Math.max(effectSize / 2, Math.min(x, rect.width - effectSize / 2));
    y = Math.max(effectSize / 2, Math.min(y, rect.height - effectSize / 2));

    setLightPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setLightPosition({ x: -100, y: -100 }); // Hide effect when not hovering
  };

  return (
    <div
      className="product-card"
      style={{ animationDelay: `${animationDelay}s` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="light-effect"
        style={{
          left: `${lightPosition.x}px`,
          top: `${lightPosition.y}px`,
        }}
      ></div>
      <Link className="image-wrapper">
        <Image.PreviewGroup>
          {/* <Image
            src={product.images[0]}
            className="rounded-t-3xl w-full h-64 object-cover"
            alt={`${product.name} image`}
          /> */}
        </Image.PreviewGroup>
        <div className="text-content">
          <h2 className="title pb-[1.5px]">{product.name}</h2>
          <div className="h-full w-full flex items-center ">
            <div className="">
              <div className="flex items-center">
                {" "}
                <p className=" font-bold">
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
                  <div className="discount">
                    -{Math.round(discountPercentage)}%
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={(e) => handleAddToCart(e)}
            className={`add-to-cart ${
              !product.status ? " opacity-30 cursor-not-allowed" : ""
            }`}
            aria-label={`Add ${product.name} to cart`}
            disabled={!product.status}
          >
            <FaCartShopping />
            {product.status ? "Thêm vào giỏ" : "Hết hàng"}
          </button>
        </div>
      </Link>
    </div>
  );
};

const CombosSection = ({ currentPageProducts, priceStage }) => {
  return (
    <div className="lg:bg-transparent pb-4">
      <div className="product-section rounded-xl">
        <div className="product-container">
          <div className="flex w-full justify-center">
            <div className="product-grid grid gap-2 mx-2 lg:mx-0 ">
              {currentPageProducts.map((product, index) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  priceStage={priceStage}
                  animationDelay={index * 0.2}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombosSection;
