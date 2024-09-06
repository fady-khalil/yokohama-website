import { useState, useEffect } from "react";
import ReactSlider from "react-slider";

const PriceRange = ({ data, onPriceRangeChange }) => {
  const titleHeader = "rb-bold text-lg uppercase ";
  const [priceRange, setPriceRange] = useState([0, 0]);

  useEffect(() => {
    if (data && data.length > 0) {
      // Extract all product prices from the data
      const allPrices = data.flatMap((item) =>
        item.products?.map((product) => product.price)
      );

      if (allPrices.length > 0) {
        const minPrice = Math.min(...allPrices);
        const maxPrice = Math.max(...allPrices);

        // Avoid setting state if the range is the same as before
        if (priceRange[0] !== minPrice || priceRange[1] !== maxPrice) {
          setPriceRange([minPrice, maxPrice]);
          onPriceRangeChange([minPrice, maxPrice]); // Notify parent with initial range
        }
      }
    }
  }, [data, priceRange, onPriceRangeChange]); // Include priceRange to prevent infinite loop

  const handleChange = (values) => {
    setPriceRange(values);
    onPriceRangeChange(values); // Notify parent with updated range
  };

  // Safeguard against empty data
  const minPrice = priceRange[0] || 0;
  const maxPrice = priceRange[1] || 100; // Default max value

  return (
    <div className="px-6 min-w-[fit-content] py-2 lg:py-0">
      <p className={titleHeader}>Price Range</p>
      <div className="p-4">
        <ReactSlider
          className="w-full h-2 bg-gray-300 rounded-md flex items-center"
          thumbClassName="w-4 h-4 bg-red-600 rounded-full"
          trackClassName="bg-gray-500"
          step={10}
          min={minPrice}
          max={maxPrice}
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
