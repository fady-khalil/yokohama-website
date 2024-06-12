import React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
const SearchIcon = ({ isHomePage }) => {
  return (
    <button className="text-lg  border-r border-[#777] flex items-center justify-center h-full px-6 py-6">
      <MagnifyingGlass weight="bold" color={isHomePage ? "black" : "white"} />
    </button>
  );
};

export default SearchIcon;
