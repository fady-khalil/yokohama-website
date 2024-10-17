import React, { useState } from "react";

const ByClassification = ({
  data,
  onCloseFiler,
  onHandleClassificationID,
  selectedClassificationId,
  setSelectedClassificationId,
}) => {
  const handleChange = (e) => {
    const newSelectedID = e.target.value ? parseInt(e.target.value) : null;
    setSelectedClassificationId(newSelectedID);
    onCloseFiler();
    onHandleClassificationID(newSelectedID);
  };

  return (
    <div className="flex flex-col gap-y-3 border-b-[1.5px] border-black pb-2">
      <select
        onChange={handleChange}
        value={selectedClassificationId || ""}
        className="outline-0"
      >
        <option value="">By classification</option>
        {data?.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ByClassification;
