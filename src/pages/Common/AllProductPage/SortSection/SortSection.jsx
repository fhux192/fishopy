import React, { memo } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const SortSection = ({ sortOption, setSortOption }) => {
  const sortButtons = [
    { key: "default", option: {}, label: "Mặc Định" },
    { key: "priceDesc", option: { price: -1 }, label: "Cao - Thấp", icon: <FaSortAmountDown className="mr-2" /> },
    { key: "priceAsc", option: { price: 1 }, label: "Thấp - Cao", icon: <FaSortAmountUp className="mr-2" /> },
    { key: "nameAsc", option: { name: 1 }, label: "Tên từ A - Z" },
    { key: "nameDesc", option: { name: -1 }, label: "Tên từ Z - A" },
  ];

  const currentSortButton = sortButtons.find(
    (btn) => JSON.stringify(btn.option) === JSON.stringify(sortOption)
  );
  const currentKey = currentSortButton ? currentSortButton.key : "default";

  const handleSelectChange = (e) => {
    const selectedKey = e.target.value;
    const selectedButton = sortButtons.find((btn) => btn.key === selectedKey);
    if (selectedButton) {
      setSortOption(selectedButton.option);
    }
  };

  return (
    <div className="sort-section">
      <div className="sort-buttons desktop">
        {sortButtons.map(({ key, option, label, icon }) => (
          <button
            key={key}
            className={`sort-button ${
              JSON.stringify(sortOption) === JSON.stringify(option)
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
      <div className="sort-select mobile">
        <select value={currentKey} onChange={handleSelectChange}>
          {sortButtons.map(({ key, label }) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default memo(SortSection);