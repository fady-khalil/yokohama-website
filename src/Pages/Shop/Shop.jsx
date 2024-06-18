import React from "react";
import Header from "./Components/Header";
import Filter from "./Components/Filter";
import Listing from "./Components/Listing";

import Container from "Components/Container/Container";
const Shop = () => {
  return (
    <main className="relative">
      <Header header={"Shop"} />
      <div className="grid grid-cols-1 lg:grid-cols-4 ">
        <Filter />
        <Listing />
      </div>
    </main>
  );
};

export default Shop;
