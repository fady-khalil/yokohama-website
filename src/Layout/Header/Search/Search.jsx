import React from "react";

import SearchIcon from "./Components/SearchIcon";
import SearchInput from "./Components/SearchInput";
const Search = ({ isHomePage }) => {
  return (
    <div className="h-full flex items-center justify-center">
      <SearchIcon isHomePage={isHomePage} />
    </div>
  );
};

export default Search;
