import React from "react";
import useInput from "form/Hooks/user-input";
import { Faders } from "@phosphor-icons/react";

const Search = ({ openFilterHandler, filterIsVisible }) => {
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
    <div>
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
    </div>
  );
};

export default Search;
