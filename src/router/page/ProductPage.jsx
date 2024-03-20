import React from "react";
import Products from "../../components/Products/TopProducts";
import AllProducts from "../../components/Products/AllProducts";

const ProductPage = () => {
  return (
    <div>
      <div className="w-full mt-[10rem]">
        {" "}
        <Products />
        <AllProducts />
      </div>
    </div>
  );
};

export default ProductPage;
