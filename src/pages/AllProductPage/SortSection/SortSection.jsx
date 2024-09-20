import React from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const SortSection = ({ sortOption, setSortOption }) => {
  const sortButtons = [
    { option: "", label: "Mặc Định" },
    {
      option: "-discountedPrice",
      label: "Cao - Thấp",
      icon: <FaSortAmountDown className="mr-2" />,
    },
    {
      option: "discountedPrice",
      label: "Thấp - Cao",
      icon: <FaSortAmountUp className="mr-2" />,
    },
    { option: "name", label: "Tên từ A - Z" },
    { option: "-name", label: "Tên từ Z - A" },
  ];

  return (
    <div className="flex w-full justify-center">
      <div className="sort-section">
        <div className="sort-buttons">
          {sortButtons.map(({ option, label, icon }) => (
            <button
              key={option}
              className={`sort-button ${sortOption === option ? "selected" : "unselected"}`}
              onClick={() => setSortOption(option)}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortSection;
