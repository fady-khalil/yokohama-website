import React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
const SearchIcon = () => {
  return (
    <button className="bg-lightGrey p-2.5 text-lg rounded-full">
      <MagnifyingGlass weight="bold" color="black" />
    </button>
  );
};

export default SearchIcon;
