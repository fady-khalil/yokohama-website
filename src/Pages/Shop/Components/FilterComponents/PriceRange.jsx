import { useState, useEffect } from "react";
import ReactSlider from "react-slider";

const PriceRange = ({ data }) => {
  const titleHeader = "rb-bold text-lg uppercase ";
  const [priceRange, setPriceRange] = useState([0, 0]); // Initial state to avoid undefined issues

  useEffect(() => {
    if (data && data.length > 0) {
      const minPrice = Math.min(...data);
      const maxPrice = Math.max(...data);
      setPriceRange([minPrice, maxPrice]);
    }
  }, [data]);

  const handleChange = (values) => {
    setPriceRange(values);
  };

  return (
    <div className="px-6 min-w-[fit-content] py-2 lg:py-0">
      <p className={titleHeader}>Price Range</p>
      <div className="p-4">
        <ReactSlider
          className="w-full h-2 bg-gray-300 rounded-md flex items-center"
          thumbClassName="w-4 h-4 bg-red-600 rounded-full"
          trackClassName="bg-gray-500"
          min={priceRange[0]}
          max={priceRange[1]}
          step={10}
          value={priceRange}
          onChange={handleChange}
        />
        <div className="flex justify-between mt-2">
          <span>{priceRange[0]} $</span>
          <span>{priceRange[1]} $</span>
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
