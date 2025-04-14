import React from "react";

import { Link } from "react-router-dom";
import { MagnifyingGlass } from "@phosphor-icons/react";
const Search = ({ isHomePage }) => {
  return (
    <Link
      to={"/search"}
      className="text-lg  border-r border-[#777] flex items-center justify-center h-full px-6 py-6 "
    >
      <MagnifyingGlass weight="bold" color={isHomePage ? "black" : "white"} />
    </Link>
  );
};

export default Search;
