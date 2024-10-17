import React, { useState } from "react";

const SortBy = ({ onPriceHighToLow }) => {
  const titleHeader = "font-bold uppercase text-lg mb-4";
  const [selectedSortOrder, setSelectedSortOrder] = useState("");

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSelectedSortOrder(order);
    onPriceHighToLow(order);
  };

  return (
    <div className="mt-8 lg:mt-0">
      <p className={titleHeader}>Sort By</p>
      <select
        value={selectedSortOrder}
        onChange={handleSortChange}
        className="flex flex-col gap-y-3 border-b-[1.5px] border-black pb-2 outline-0 w-full"
      >
        <option value="">Price</option>
        <option value="high-to-low">Price (high to low)</option>
        <option value="low-to-high">Price (low to high)</option>
      </select>
    </div>
  );
};

export default SortBy;
