import { useState, useEffect } from "react";
import { Faders, X } from "@phosphor-icons/react";

// filter
import SortBy from "./FilterComponents/SortBy";
import ByBrand from "./FilterComponents/ByBrand";
import ByCategory from "./FilterComponents/ByCategory";
import ByClassification from "./FilterComponents/ByClassification";
import ByTireSize from "./FilterComponents/ByTireSize";
import BySizeName from "./FilterComponents/BySizeName";

const Filter = ({
  onPriceHighToLow,
  allData,
  onHandleBrandId,
  onHandleClassificationID,
  onHanldeCategoryId,
  isVisible,
  onClearFilter,
  onHandleAspectRatio,
  onHandleWidth,
  onHandleFilterVisible,
  onHandleDiameter,
  onHandleSizeName,
}) => {
  // State for filter sub-components
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedClassificationId, setSelectedClassificationId] =
    useState(null);
  // tires
  const [selectedWidth, setSelectedWidth] = useState(null);
  const [selectedAspectRation, setSelectedAspectRation] = useState(null);
  const [selectedDiameter, setSelectedDiameter] = useState(null);

  // size
  const [selectedSizeName, setSelectedSizeName] = useState(null);

  // Clear filter handler
  const clearFiltersHandler = () => {
    setSelectedBrandId(null);
    setSelectedCategoryId(null);
    setSelectedClassificationId(null);
    setSelectedWidth(null);
    setSelectedAspectRation(null);
    setSelectedDiameter(null);
    setSelectedSizeName(null);

    // Also trigger the parent clear filter function to reset the data
    onClearFilter();

    window.scrollTo({
      top: 0,
      behavior: "smooth", // This will create a smooth scrolling effect
    });
  };
  console.log(allData);

  return (
    <div
      className={`transition ease-in duration-300 ${
        isVisible
          ? "fixed shadow-2xl shadow-black rounded-xl	  lg:sticky lg:top-10 w-[90vw] lg:w-auto  left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-auto px-3 py-6 lg:px-0 lg:py-0 lg:left-0 lg:translate-x-0 lg:translate-y-0 lg:h-[100vh] z-[100] lg:z-[0] lg:top-10 lg:visible lg:shadow-none"
          : "fixed lg:sticky  invisible translate-x-[-100%]   top-1/2 -translate-y-1/2 lg:w-auto lg:left-0 lg:translate-x-0 lg:translate-y-0 lg:h-[100vh] lg:top-10 lg:visible z-[100] lg:z-[0] lg:shadow-none"
      }  h-[100vh] flex flex-col gap-y-6 lg:gap-y-10 bg-white  `}
    >
      <button
        onClick={onHandleFilterVisible}
        className="w-max ml-auto flex items-center justify-end absolute right-4 top-4 lg:hidden"
      >
        <X size={24} />
      </button>

      {allData && allData?.size_name?.length > 0 && (
        <BySizeName
          selectedSizeName={selectedSizeName}
          setSelectedSizeName={setSelectedSizeName}
          data={allData?.size_name}
          onHandleSizeName={onHandleSizeName}
          onCloseFiler={onHandleFilterVisible}
        />
      )}

      {/* tire size */}
      {allData && allData?.size_name?.length === 0 && (
        <ByTireSize
          selectedWidth={selectedWidth}
          setSelectedWidth={setSelectedWidth}
          setSelectedAspectRation={setSelectedAspectRation}
          selectedAspectRation={selectedAspectRation}
          selectedDiameter={selectedDiameter}
          setSelectedDiameter={setSelectedDiameter}
          onCloseFiler={onHandleFilterVisible}
          onHandleWidth={onHandleWidth}
          onHandleAspectRatio={onHandleAspectRatio}
          onHandleDiameter={onHandleDiameter}
          data={allData}
        />
      )}
      <SortBy onPriceHighToLow={onPriceHighToLow} />

      {/* offers */}
      <div className="min-w-[fit-content] py-2 lg:py-0 ">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox h-4 w-4 " />
          <span className="rb-bold">Special Offers</span>
        </label>
      </div>

      <div>
        <h2 className="font-bold uppercase text-lg mb-4">Filter By</h2>
        <span className="flex flex-col gap-y-6">
          <ByBrand
            selectedBrandId={selectedBrandId}
            setSelectedBrandId={setSelectedBrandId}
            onHandleBrandId={onHandleBrandId}
            data={allData?.brands}
            onCloseFiler={onHandleFilterVisible}
          />
          <ByCategory
            selectedCategoryId={selectedCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
            onHanldeCategoryId={onHanldeCategoryId}
            data={allData?.ctegories}
            onCloseFiler={onHandleFilterVisible}
          />
          <ByClassification
            selectedClassificationId={selectedClassificationId}
            setSelectedClassificationId={setSelectedClassificationId}
            onHandleClassificationID={onHandleClassificationID}
            data={allData?.classification}
            onCloseFiler={onHandleFilterVisible}
          />
        </span>
      </div>

      <button
        onClick={clearFiltersHandler}
        className="w-3/4 border border-black py-2"
      >
        Clear Filter
      </button>
    </div>
  );
};

export default Filter;
