import React from "react";

const BySizeName = ({
  data,
  selectedSizeName,
  setSelectedSizeName,
  onHandleSizeName,
  onCloseFiler,
}) => {
  const handleChange = (e) => {
    const newSelectedWidth = e.target.value;
    setSelectedSizeName(newSelectedWidth);
    onCloseFiler();
    onHandleSizeName(newSelectedWidth);
  };
  return (
    <div>
      <h2 className="font-bold uppercase text-lg mb-4">By Size</h2>

      <div className="flex flex-col gap-y-3 border-b-[1.5px] border-black pb-2">
        <select
          onChange={handleChange}
          value={selectedSizeName || ""}
          className="outline-0"
        >
          <option value="">Size</option>
          {data?.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BySizeName;
