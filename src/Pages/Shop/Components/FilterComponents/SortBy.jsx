import React, { useState } from "react";

const SortBy = ({ onPriceHighToLow }) => {
  const titleHeader = "rb-bold text-lg uppercase mb-4";
  const checkBox = "text-gray-500 rb-medium";
  const [selectedSortOrder, setSelectedSortOrder] = useState("");

  const handleSortChange = (order) => {
    setSelectedSortOrder(order);
    onPriceHighToLow(order);
  };

  return (
    <div className="px-6 min-w-[fit-content] pt-2 pb-4  border-b-2 border-black">
      <p className={titleHeader}>Sort By </p>

      <div className=" flex flex-col gap-y-2 ">
        <div className="mb-2">
          <label className="flex items-center space-x-2 ">
            <input
              type="checkbox"
              name="sortOrder"
              checked={selectedSortOrder === "high-to-low"}
              onChange={() => handleSortChange("high-to-low")}
              className=" h-4 w-4"
            />
            <span className={checkBox}>Price (high to low)</span>
          </label>
        </div>
        <div className="">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="sortOrder"
              checked={selectedSortOrder === "low-to-high"}
              onChange={() => handleSortChange("low-to-high")}
              className=" h-4 w-4"
            />
            <span className={checkBox}>Price (low to high)</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SortBy;
