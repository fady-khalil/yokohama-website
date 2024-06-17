import { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import ReactSlider from "react-slider";
const Filter = () => {
  const [priceRange, setPriceRange] = useState([20, 5000]);

  const handleChange = (values) => {
    setPriceRange(values);
  };

  const titleHeader = "rb-bold text-lg uppercase ";
  const checkBox = "text-gray-500 rb-medium";
  return (
    <div className="lg:mt-[-120px] z-[10] sticky top-2 h-[max-content]  flex  lg:flex-col gap-8 border-r bg-white overflow-scroll lg:overflow-auto">
      <div className="flex items-center justify-between bg-primary p-6 text-white">
        <p className="rb-medium text-lg hidden">Search</p>
        <MagnifyingGlass />
      </div>

      {/* sort by */}
      <div className="px-6 min-w-[fit-content] py-2 lg:py-0">
        <p className={titleHeader}>Sort By </p>

        <div className="lg:p-4 flex flex-col gap-y-3 ">
          <div className="mb-2">
            <label className="flex items-center space-x-2 ">
              <input type="checkbox" className="form-checkbox h-4 w-4 " />
              <span className={checkBox}>Price (high to low)</span>
            </label>
          </div>
          <div className="">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox h-4 w-4" />
              <span className={checkBox}>Price (low to high)</span>
            </label>
          </div>
        </div>
      </div>

      {/* price ranfe */}
      <div className="px-6  min-w-[fit-content] py-2 lg:py-0">
        <p className={titleHeader}>Price Range</p>

        <div className="p-4">
          <ReactSlider
            className="w-full h-2 bg-gray-300 rounded-md flex items-center"
            thumbClassName="w-4 h-4 bg-red-600 rounded-full"
            trackClassName="bg-gray-500"
            defaultValue={[20, 5000]}
            min={0}
            max={10000}
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

      {/* offers */}
      <div className="px-6  min-w-[fit-content] py-2 lg:py-0 ">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox h-4 w-4 " />
          <span className="rb-bold">Special Offers</span>
        </label>
      </div>

      {/* brand */}
      <div className="px-6  min-w-[fit-content] py-2 lg:py-0">
        <div className="flex items-center justify-between  mb-4">
          <p className={titleHeader}>Brand</p>
          {/* <button>x</button> */}
        </div>
        <div className="flex flex-col gap-y-3">
          <div>
            <label className="flex items-center space-x-2 ">
              <input type="checkbox" className="form-checkbox h-4 w-4 " />
              <span className={checkBox}>Yokohama</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox h-4 w-4" />
              <span className={checkBox}>Triangle</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox h-4 w-4" />
              <span className={checkBox}>Hankook</span>
            </label>
          </div>
        </div>
      </div>

      {/* category */}
      <div className="px-6  min-w-[fit-content] py-2 lg:py-0">
        <div className="flex items-center justify-between mb-4">
          <p className={titleHeader}>Category</p>
          {/* <button>x</button> */}
        </div>
        <div className="flex flex-col gap-y-3">
          <div>
            <label className="flex items-center space-x-2 ">
              <input type="checkbox" className="form-checkbox h-4 w-4 " />
              <span className={checkBox}>Yokohama</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox h-4 w-4" />
              <span className={checkBox}>Triangle</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox h-4 w-4" />
              <span className={checkBox}>Hankook</span>
            </label>
          </div>
        </div>
      </div>

      {/* sub category */}
      <div className="px-6 mb-secondary  min-w-[fit-content] py-2 lg:py-0">
        <div className="flex items-center justify-between mb-4">
          <p className={titleHeader}>Subcategory</p>
          {/* <button>x</button> */}
        </div>
        <div className="flex flex-col gap-y-3">
          <div>
            <label className="flex items-center space-x-2 ">
              <input type="checkbox" className="form-checkbox h-4 w-4 " />
              <span className={checkBox}>Yokohama</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox h-4 w-4" />
              <span className={checkBox}>Triangle</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox h-4 w-4" />
              <span className={checkBox}>Hankook</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
