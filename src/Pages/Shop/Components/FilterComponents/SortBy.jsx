import React, { useState } from "react";

const SortBy = ({ onPriceHighToLow }) => {
  const titleHeader = "rb-bold text-lg uppercase ";
  const checkBox = "text-gray-500 rb-medium";
  const [selectedSortOrder, setSelectedSortOrder] = useState("");

  const handleSortChange = (order) => {
    setSelectedSortOrder(order);
    onPriceHighToLow(order);
  };

  return (
    <div className="px-6 min-w-[fit-content] py-2 lg:py-0">
      <p className={titleHeader}>Sort By </p>

      <div className="lg:p-4 flex flex-col gap-y-3 ">
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
