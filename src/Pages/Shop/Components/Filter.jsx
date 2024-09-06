import { useEffect, useState } from "react";
import { MagnifyingGlass, Faders, X } from "@phosphor-icons/react";
import useInput from "form/Hooks/user-input";

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
  onPriceRangeChange,
}) => {
  const [filterIsVisible, setFilterIsVisible] = useState(false);
  const openFilterHandler = () => {
    setFilterIsVisible(true);
  };
  const closeFilterHandler = () => {
    setFilterIsVisible(false);
  };

  const [priceRange, setPriceRange] = useState();
  const [brands, setBrands] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    if (data) {
      // price range
      const prices = data?.flatMap((item) =>
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
      <div className="flex lg:hidden items-center justify-end  bg-primary  gap-x-6  border-b px-3 ss:px-6 sm:px-8 sticky top-0 py-3 sm:py-6 z-[10]">
        <button onClick={openFilterHandler}>
          <Faders color="white" size={32} />
        </button>
      </div>
      {filterIsVisible && (
        <div className="fixed top-0 left-0 bg-[#000000a3] w-[100vw] h-[100vh] z-[10]"></div>
      )}
      <div
        className={`fixed  top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[95vw] h-[90vh] md:w-[60vw]  overflow-scroll  z-[10] lg:sticky lg:top-2 lg:mt-[-120px] lg:h-[max-content] lg:top-0 lg:translate-y-0 lg:left-0 lg:translate-x-0 lg:w-auto lg:overflow-auto  flex-col gap-8 border-r bg-white  ${
          filterIsVisible ? "flex" : "hidden lg:flex"
        }`}
      >
        <button
          onClick={closeFilterHandler}
          className="flex items-center justify-end bg-primary p-6 text-white"
        >
          <span className="lg:hidden">
            <X size={32} />
          </span>
        </button>
        <SortBy onPriceHighToLow={onPriceHighToLow} />
        {/* <PriceRange onPriceRangeChange={onPriceRangeChange} data={priceRange} /> */}

        {/* offers */}
        <div className="px-6  min-w-[fit-content] py-2 lg:py-0 ">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox h-4 w-4 " />
            <span className="rb-bold">Special Offers</span>
          </label>
        </div>
        <ByBrand
          onCloseFiler={closeFilterHandler}
          selectedBrand={selectedBrand}
          onBrandFilter={onBrandFilter}
          data={brands}
        />
        <ByCategory
          onCloseFiler={closeFilterHandler}
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
