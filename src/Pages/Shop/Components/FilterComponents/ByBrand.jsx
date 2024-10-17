import React from "react";

const ByBrand = ({
  data,
  selectedBrandId,
  setSelectedBrandId,
  onCloseFiler,
  onHandleBrandId,
}) => {
  const handleChange = (e) => {
    const newSelectedBrandId = e.target.value ? parseInt(e.target.value) : null;
    setSelectedBrandId(newSelectedBrandId);
    onCloseFiler();
    onHandleBrandId(newSelectedBrandId);
  };

  return (
    <div className="flex flex-col gap-y-3 border-b-[1.5px] border-black pb-2">
      <select
        onChange={handleChange}
        value={selectedBrandId || ""} // Use the selectedBrandId from props
        className="outline-0"
      >
        <option value="">Brand</option>
        {data?.map(({ name, id }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ByBrand;
