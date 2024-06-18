import { useState } from "react";
import { MagnifyingGlass, Faders } from "@phosphor-icons/react";
import ReactSlider from "react-slider";
import Container from "Components/Container/Container";
import Input from "form/Inputs/Input";
import useInput from "form/Hooks/user-input";
import MainButton from "Components/Buttons/MainButton";
const Filter = () => {
  const [priceRange, setPriceRange] = useState([20, 5000]);

  const [filterIsVisible, setFilterIsVisible] = useState(false);
  const openFilterHandler = () => {
    setFilterIsVisible(true);
  };
  const closeFilterHandler = () => {
    setFilterIsVisible(false);
  };

  const handleChange = (values) => {
    setPriceRange(values);
  };

  const titleHeader = "rb-bold text-lg uppercase ";
  const checkBox = "text-gray-500 rb-medium";

  const {
    value: searchInput,
    isValid: searchIsValid,
    isTouched: searchIsTouched,
    HasError: searchHasError,
    inputChangeHandler: searchChangeHandler,
    inputBlurHandler: searchBlurHanlder,
    reset: searchReset,
  } = useInput((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  return (
    <>
      <div className="flex lg:hidden items-center justify-between  bg-primary  gap-x-6 border-b px-6 sm:px-8 sticky top-0 min-h-[100px] py-2 sm:py-6">
        <div className="flex items-center justify-center flex-1  text-white">
          <input
            className={
              " text-white px-2 py-3 rounded-sm bg-white placeholder:text-sm flex-1"
            }
            id={"shop-search"}
            type={"search"}
            name={"shop-search"}
            placeholder={"Search"}
            value={searchInput}
            onChange={searchChangeHandler}
            onBlur={searchBlurHanlder}
          />
        </div>

        <div>
          <button onClick={openFilterHandler}>
            <Faders color="white" size={32} />
          </button>
        </div>
      </div>
      {filterIsVisible && (
        <div className="fixed top-0 left-0 bg-[#000000a3] w-[100vw] h-[100vh] z-[10]"></div>
      )}
      <div
        className={`fixed  top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[95vw] h-[90vh] md:w-[60vw]  overflow-scroll  z-[10] lg:sticky lg:top-2 lg:mt-[-120px] lg:h-[max-content] lg:top-0 lg:translate-y-0 lg:left-0 lg:translate-x-0 lg:w-auto lg:overflow-auto  flex-col gap-8 border-r bg-white  ${
          filterIsVisible ? "flex" : "hidden lg:flex"
        }`}
      >
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

        <MainButton onClick={closeFilterHandler}>Apply</MainButton>
      </div>
    </>
  );
};

export default Filter;
