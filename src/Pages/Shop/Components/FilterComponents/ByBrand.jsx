import React from "react";

const ByBrand = ({ data, onBrandFilter, selectedBrand }) => {
  const titleHeader = "rb-bold text-lg uppercase ";
  const checkBox = "text-gray-500 rb-medium";

  return (
    <div className="px-6 min-w-[fit-content] py-2 lg:py-0">
      <div className="flex items-center justify-between mb-4">
        <p className={titleHeader}>Brand</p>
      </div>
      <div className="flex flex-col gap-y-3">
        {data?.map((brand, index) => (
          <div key={index}>
            <label className="flex items-center space-x-2">
              <input
                onChange={() => onBrandFilter(brand)}
                type="checkbox"
                className="form-checkbox h-4 w-4"
                checked={selectedBrand === brand}
              />
              <span className={checkBox}>{brand}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ByBrand;
