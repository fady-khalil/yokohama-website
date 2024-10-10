import React, { useState } from "react";

const ByClassification = ({ data, onCloseFiler, onHandleClassificationID }) => {
  const [selectedClassificationID, setSelectedClassificationID] =
    useState(null);
  const titleHeader = "rb-bold text-lg uppercase";
  const checkBox = "text-gray-500 rb-medium";

  const handleChange = (id) => {
    const newSelectedID = selectedClassificationID === id ? null : id;
    setSelectedClassificationID(newSelectedID);
    onCloseFiler();
    onHandleClassificationID(newSelectedID);
  };

  return (
    <div className="px-6 mb-primary min-w-[fit-content] py-2 lg:py-0">
      <div className="flex items-center justify-between mb-4">
        <p className={titleHeader}>Classification</p>
      </div>
      <div className="flex flex-col gap-y-3">
        {data?.map(({ id, name }) => (
          <div key={id}>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4"
                checked={selectedClassificationID === id} // Set checked based on the selected ID
                onChange={() => handleChange(id)} // Handle selection change
              />
              <span className={checkBox}>{name}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ByClassification;
