import React, { memo } from "react";

import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const SortSection = ({ sortOption, setSortOption }) => {
  const sortButtons = [
    { option: {}, label: "Mặc Định", field: "default" },
    {
      option: { price: -1 },
      field: "price",
      label: "Cao - Thấp",
      icon: <FaSortAmountDown className="mr-2" />,
    },
    {
      option: { price: 1 },
      field: "price",
      label: "Thấp - Cao",
      icon: <FaSortAmountUp className="mr-2" />,
    },
    { option: { name: 1 }, field: "name", label: "Tên từ A - Z" },
    { option: { name: -1 }, field: "name", label: "Tên từ Z - A" },
  ];

  return (
    <div className="flex w-full justify-center">
      <div className="sort-section">
        <div className="sort-buttons">
          {sortButtons.map(({ option, label, icon, field }) => (
            <button
              key={label}
              className={`sort-button ${
                Number(sortOption[field]) == option[field] ||
                (field === "default" && Object.keys(sortOption).length === 0)
                  ? "selected"
                  : "unselected"
              }`}
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

export default memo(SortSection);
