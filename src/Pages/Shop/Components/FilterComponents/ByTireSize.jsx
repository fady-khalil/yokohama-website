import React, { useState } from "react";

const ByTireSize = ({
  data,
  onHandleWidth,
  onCloseFiler,
  selectedWidth,
  setSelectedWidth,
  selectedAspectRation,
  setSelectedAspectRation,
  onHandleAspectRatio,
  selectedDiameter,
  setSelectedDiameter,
  onHandleDiameter,
}) => {
  const handleWidthChange = (e) => {
    const newSelectedWidth = e.target.value ? parseFloat(e.target.value) : null;
    setSelectedWidth(newSelectedWidth);
    setSelectedAspectRation(null); // Reset aspect ratio
    setSelectedDiameter(null); // Reset inch size
    onHandleWidth(newSelectedWidth);
    onHandleDiameter(null);
    onHandleAspectRatio(null);
  };

  const handleAspectChange = (e) => {
    const newSelectedAspect = e.target.value
      ? parseFloat(e.target.value)
      : null;
    setSelectedAspectRation(newSelectedAspect);
    setSelectedDiameter(null);
    onHandleDiameter(null);
    onHandleAspectRatio(newSelectedAspect);
  };

  const handleDiamterChange = (e) => {
    const newSelectedDiamter = e.target.value
      ? parseFloat(e.target.value)
      : null;
    setSelectedDiameter(newSelectedDiamter);
    onHandleDiameter(newSelectedDiamter);
    onCloseFiler();
  };

  return (
    <div>
      <h2 className="font-bold uppercase text-lg mb-4">Tire Size</h2>

      {/* Width Selector */}
      <div className="flex flex-col gap-y-3 border-b-[1.5px] border-black pb-2">
        <select
          onChange={handleWidthChange}
          value={selectedWidth || ""}
          className="outline-0"
        >
          <option value="">Width</option>
          {data?.width?.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Aspect Ratio Selector */}
      <div className="flex flex-col gap-y-3 border-b-[1.5px] border-black pb-2 mt-4">
        <select
          onChange={handleAspectChange}
          value={selectedAspectRation || ""}
          className={`outline-0 ${
            !selectedWidth || !data?.aspect?.length ? "text-gray-400" : ""
          }`}
        >
          <option value="" disabled>
            Aspect Ratio
          </option>
          {selectedWidth &&
            data?.aspect?.map((aspect, index) => (
              <option key={index} value={aspect}>
                {aspect}
              </option>
            ))}
        </select>
      </div>

      {/* Inch Size Selector (Always Visible but Conditionally Enabled) */}
      <div className="flex flex-col gap-y-3 border-b-[1.5px] border-black pb-2 mt-4">
        <select
          onChange={handleDiamterChange}
          value={selectedDiameter || ""}
          className={`outline-0 ${
            !selectedWidth || !selectedAspectRation || !data?.inch?.length
              ? "text-gray-400"
              : ""
          }`}
          disabled={
            !selectedWidth || !selectedAspectRation || !data?.inch?.length
          }
        >
          <option value="">Diameter</option>
          {selectedWidth &&
            selectedAspectRation &&
            data?.inch?.map((inch, index) => (
              <option key={index} value={inch}>
                {inch}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default ByTireSize;
