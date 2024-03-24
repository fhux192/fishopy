import { current } from "@reduxjs/toolkit";
import React from "react";

const Pagination = ({ totalPost, postPerPage ,setCurrentPage,currentPage}) => {
  let page = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    page.push(i);
  }

  return (
    <div className="flex items-center justify-center w-max-[100rem]">
      {page.map((number) => (
        <div
          key={number}
          onClick={() => setCurrentPage(number) }
          className={`flex items-center justify-center ${ number == currentPage? "bg-teal-500" : "bg-primaryBlack"} shadow-sm shadow-black hover:shadow-teal-700 hover:shadow-md w-8 h-8 mb-10 mx-[1rem] bg-primaryBlack text-white cursor-pointer`}
        >
          {number}
          
        </div>
      ))}
    </div>
  );
};

export default Pagination;
