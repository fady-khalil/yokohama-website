import React, { useState } from "react";

const ByBrand = ({ data, onCloseFiler, onHandleBrandId }) => {
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const titleHeader = "rb-bold text-lg uppercase";
  const checkBox = "text-gray-500 rb-medium";

  const handleChange = (id) => {
    const newSelectedBrandId = selectedBrandId === id ? null : id;
    setSelectedBrandId(newSelectedBrandId);
    onCloseFiler();
    onHandleBrandId(newSelectedBrandId);
  };

  return (
    <div className="px-6 min-w-[fit-content] pt-2 pb-4 border-b-2 border-black">
      <div className="flex items-center justify-between mb-4">
        <p className={titleHeader}>Brand</p>
      </div>
      <div className="flex flex-col gap-y-3">
        {data?.map(({ name, id }) => (
          <div key={id}>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4"
                checked={selectedBrandId === id}
                onChange={() => handleChange(id)}
              />
              <span className={checkBox}>{name}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ByBrand;
