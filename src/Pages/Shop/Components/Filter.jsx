import { useEffect, useState } from "react";
import { MagnifyingGlass, Faders } from "@phosphor-icons/react";
import useInput from "form/Hooks/user-input";
import MainButton from "Components/Buttons/MainButton";

// filter
import SortBy from "./FilterComponents/SortBy";
import PriceRange from "./FilterComponents/PriceRange";
import ByBrand from "./FilterComponents/ByBrand";
import ByCategory from "./FilterComponents/ByCategory";
import ByClassification from "./FilterComponents/ByClassification";

const Filter = ({
  onPriceHighToLow,
  onBrandFilter,
  onCategoryFilter,
  onClassificationFilter,
  data,
  selectedBrand,
  selectedCategory,
  selectedClassification,
  categories,
  classifications,
  filterType,
  onHandlePriceRange,
}) => {
  const [filterIsVisible, setFilterIsVisible] = useState(false);
  const openFilterHandler = () => {
    setFilterIsVisible(true);
  };
  const closeFilterHandler = () => {
    setFilterIsVisible(false);
  };

  const {
    value: searchInput,
    isValid: searchIsValid,
    isTouched: searchIsTouched,
    HasError: searchHasError,
    inputChangeHandler: searchChangeHandler,
    inputBlurHandler: searchBlurHanlder,
    reset: searchReset,
  } = useInput((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));

  const [priceRange, setPriceRange] = useState();
  const [brands, setBrands] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    if (data) {
      // price range
      const prices = data.flatMap((item) =>
        item?.products?.map((product) => product.price)
      );
      setPriceRange(prices);

      // brand
      const brands = data?.flatMap((item) =>
        item?.products?.map((product) => product.brand)
      );
      const uniqueBrands = Array.from(new Set(brands));
      setBrands(uniqueBrands);
    }

    // cat
    const categories = data?.flatMap((item) =>
      item?.products?.flatMap((product) => product.category)
    );

    // Flatten and remove duplicates
    const uniqueCategories = Array.from(
      new Set(categories?.map((category) => JSON.stringify(category)))
    ).map((category) => JSON.parse(category));

    setCategory(uniqueCategories);
  }, [data]);

  return (
    <>
      <div className="flex lg:hidden items-center justify-between  bg-primary  gap-x-6  border-b px-3 ss:px-6 sm:px-8 sticky top-0 py-3 sm:py-6 z-[10]">
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
        <SortBy onPriceHighToLow={onPriceHighToLow} />
        <PriceRange data={priceRange} />

        {/* offers */}
        <div className="px-6  min-w-[fit-content] py-2 lg:py-0 ">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox h-4 w-4 " />
            <span className="rb-bold">Special Offers</span>
          </label>
        </div>
        <ByBrand
          selectedBrand={selectedBrand}
          onBrandFilter={onBrandFilter}
          data={brands}
        />
        <ByCategory
          selectedCategory={selectedCategory}
          onCategoryFilter={onCategoryFilter}
          data={category}
        />
        <ByClassification
          onClassificationFilter={onClassificationFilter}
          classifications={classifications}
          selectedClassification={selectedClassification}
        />
        {/* <MainButton onClick={closeFilterHandler}>Apply</MainButton> */}
      </div>
    </>
  );
};

export default Filter;
