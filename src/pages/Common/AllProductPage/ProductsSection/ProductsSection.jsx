import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { Image, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateAccount } from "@redux/features/user/userSlice.js";
import { user_addToCart, user_updateCartItem } from "@services/api.js";
import { toast } from "react-toastify";
import "react-lazy-load-image-component/src/effects/blur.css";
import "@scss/allProduct.scss";

const formatPrice = (price) =>
  price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") || 0;

const ProductCard = ({ product, priceStage, animationDelay }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.account);
  const [lightPosition, setLightPosition] = useState({ x: -100, y: -100 });

  const discountPercentage =
    ((product.price_sale - product.price) / product.price_sale) * 100;

  const handleAddToCart = async (event, product) => {
    event.preventDefault(); // Prevent default <a> action
    event.stopPropagation();

    if (isAuthenticated) {
      try {
        // nếu đã có thì update giỏ hàng
        if (user.cart.some((e) => e.id_product?._id === product._id)) {
          let itemEdit = {};
          const newCart = user.cart.map((item) => {
            if (item.id_product._id === product._id) {
              itemEdit = { ...item, quantity: item.quantity + 1 }; // Create a new object with updated quantity
              return itemEdit;
            }
            return item;
          });
          if (!itemEdit._id) return;
          const res = await user_updateCartItem(itemEdit?._id, {
            quantity: itemEdit.quantity,
          });
          if (res.vcode != 0) {
            return message.error(res.msg);
          }
          toast.success(res.msg);
          dispatch(updateAccount({ cart: newCart }));
        } else {
          // nếu chưa có thì thêm mới
          const res = await user_addToCart({
            id_user: user._id,
            id_product: product._id,
            quantity: 1,
          });
          if (res.vcode != 0) {
            return message.error(res.msg);
          }
          toast.success(res.msg);
          dispatch(
            updateAccount({
              cart: [
                ...user.cart,
                {
                  ...res.data,
                  id_product: { ...product },
                },
              ],
            })
          );
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.success(`Thêm ${product.name} vào giỏ hàng thành công! `);
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const productExist = cart.find(
        (item) => item.id_product._id === product._id
      );
      if (productExist) {
        productExist.quantity += 1;
      } else
        cart = [
          ...cart,
          { id_product: { ...product }, quantity: 1, _id: product._id },
        ];
      dispatch(updateAccount({ cart }));
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

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
          <Image
            src={product.imgs?.[0]}
            className="rounded-t-3xl w-full h-64 object-cover"
            alt={`${product.name} image`}
          />
        </Image.PreviewGroup>
        <div className="text-content">
          <h2 className="title pb-[1.5px]">{product.name}</h2>
          <div className="h-full w-full flex items-center ">
            <div className="">
              <div className="flex items-center">
                {" "}
                <p className=" font-bold">
                  {product.price_sale === product.price ? (
                    <span>{formatPrice(product.price_sale)}₫</span>
                  ) : (
                    <>
                      {priceStage === 0 && (
                        <span>{formatPrice(product.price_sale)}₫</span>
                      )}
                      {priceStage === 1 && (
                        <span className="line-through">
                          {formatPrice(product.price_sale)}₫
                        </span>
                      )}
                      {priceStage === 2 && (
                        <span>{formatPrice(product.price)}₫</span>
                      )}
                    </>
                  )}
                </p>
                {product.price_sale !== product.price && (
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
            onClick={(e) => handleAddToCart(e, product)}
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

const ProductsSection = ({ currentPageProducts, priceStage }) => {
  return (
    <div className="lg:bg-transparent pb-4">
      <div className="product-section rounded-xl">
        <div className="product-container">
          <div className="flex w-full justify-center">
            <div className="product-grid grid gap-2 mx-2 lg:mx-0 ">
              {currentPageProducts?.map((product, index) => (
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

export default ProductsSection;
