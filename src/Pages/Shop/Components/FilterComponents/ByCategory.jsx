import React from "react";

const ByCategory = ({
  data,
  selectedCategory,
  onCategoryFilter,
  onCloseFiler,
}) => {
  const titleHeader = "rb-bold text-lg uppercase ";
  const checkBox = "text-gray-500 rb-medium";
  return (
    <div className="px-6  min-w-[fit-content] pt-2 pb-4  border-b-2 border-black">
      <div className="flex items-center justify-between mb-4">
        <p className={titleHeader}>Category</p>
      </div>
      <div className="flex flex-col gap-y-3">
        {data?.map((cat, index) => (
          <div key={index}>
            <label className="flex items-center space-x-2 ">
              <input
                onChange={() => {
                  onCloseFiler();
                  onCategoryFilter(cat.name);
                }}
                type="checkbox"
                className="form-checkbox h-4 w-4 "
                checked={selectedCategory === cat.name}
              />
              <span className={checkBox}>{cat?.name}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ByCategory;
