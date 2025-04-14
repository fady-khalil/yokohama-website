import { useState } from "react";

const Filter = ({ data, onFilterChange, onClearFilters, selectedFilters }) => {
  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {/* Brands Filter */}
        <div className="border rounded-lg p-3">
          <h3 className="font-semibold mb-2">Brands</h3>
          <select
            className="w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={selectedFilters?.brand || ""}
            onChange={(e) => onFilterChange("brand", e.target.value)}
          >
            <option value="">Select Brand</option>
            {data?.brands?.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        {/* Categories Filter */}
        <div className="border rounded-lg p-3">
          <h3 className="font-semibold mb-2">Categories</h3>
          <select
            className="w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={selectedFilters?.category || ""}
            onChange={(e) => onFilterChange("category", e.target.value)}
          >
            <option value="">Select Category</option>
            {data?.categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Conditional Size Filters */}
        {data?.sizes ? (
          // By Size Name Filter
          <div className="border rounded-lg p-3">
            <h3 className="font-semibold mb-2">By Size</h3>
            <select
              className="w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={selectedFilters?.sizeName || ""}
              onChange={(e) => onFilterChange("sizeName", e.target.value)}
            >
              <option value="">Select Size</option>
              {data?.sizes?.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        ) : (
          // Tire Size Filters
          <div className="border rounded-lg p-3">
            <h3 className="font-semibold mb-2">Tire Size</h3>
            <div className="grid grid-cols-3 gap-2">
              {/* Width */}
              <select
                className="w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={selectedFilters?.width || ""}
                onChange={(e) => {
                  const newWidth = e.target.value ? e.target.value : null;
                  onFilterChange("width", newWidth);
                }}
              >
                <option value="">Width</option>
                {data?.width?.map((width, index) => (
                  <option key={index} value={width}>
                    {width}
                  </option>
                ))}
              </select>

              {/* Aspect Ratio */}
              <select
                className={`w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  !selectedFilters?.width ? "opacity-50" : ""
                }`}
                value={selectedFilters?.aspectRatio || ""}
                onChange={(e) => {
                  const newAspect = e.target.value ? e.target.value : null;
                  onFilterChange("aspectRatio", newAspect);
                }}
                disabled={!selectedFilters?.width}
              >
                <option value="">Aspect</option>
                {selectedFilters?.width &&
                  data?.aspect?.map((aspect, index) => (
                    <option key={index} value={aspect}>
                      {aspect}
                    </option>
                  ))}
              </select>

              {/* Diameter */}
              <select
                className={`w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  !selectedFilters?.width || !selectedFilters?.aspectRatio
                    ? "opacity-50"
                    : ""
                }`}
                value={selectedFilters?.diameter || ""}
                onChange={(e) => {
                  const newDiameter = e.target.value ? e.target.value : null;
                  onFilterChange("diameter", newDiameter);
                }}
                disabled={
                  !selectedFilters?.width || !selectedFilters?.aspectRatio
                }
              >
                <option value="">Diameter</option>
                {selectedFilters?.width &&
                  selectedFilters?.aspectRatio &&
                  data?.inch?.map((inch, index) => (
                    <option key={index} value={inch}>
                      {inch}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        )}

        {/* Classifications Filter */}
        <div className="border rounded-lg p-3">
          <h3 className="font-semibold mb-2">Classifications</h3>
          <select
            className="w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={selectedFilters?.classification || ""}
            onChange={(e) => onFilterChange("classification", e.target.value)}
          >
            <option value="">Select Classification</option>
            {data?.classification?.map((classification) => (
              <option key={classification.id} value={classification.id}>
                {classification.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Add a clear filters button */}
      <div className="mt-4 text-right">
        <button
          onClick={onClearFilters}
          className="px-4 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
