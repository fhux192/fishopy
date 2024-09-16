import React from "react";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";

const formatPrice = (price) =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const ProductCard = ({ product, priceStage, animationDelay }) => {
  const discountPercentage =
    ((product.price - product.discountedPrice) / product.price) * 100;

  const handleAddToCart = () => {
    alert("Add to cart logic here");
  };

  return (
    <div
      className={`product-card`}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <Link
        to={`/fish/${product._id}`}
        key={product._id}
        className="image-wrapper"
      >
        <LazyLoadImage
          src={
            import.meta.env.VITE_BASE_URL + "/images/fish/" + product.images[0]
          }
          effect="blur"
          className="rounded-t-3xl "
        />
        <div className="text-content">
          <h2 className="title">{product.name}</h2>
          <div className="h-full w-full flex items-center">
            <p>
              {product.price === product.discountedPrice ? (
                <span>{formatPrice(product.price)}₫</span>
              ) : (
                <>
                  {priceStage === 0 && <span>{formatPrice(product.price)}₫</span>}
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
                <div className="flex">-{Math.round(discountPercentage)}%</div>
              </div>
            )}
          </div>
        </div>
        <div onClick={handleAddToCart} className="add-to-cart">
          <FaCartPlus /> Mua ngay
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
            <div className="product-grid grid gap-4 lg:mx-0">
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
