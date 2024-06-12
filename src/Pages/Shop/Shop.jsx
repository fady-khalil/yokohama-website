import React from "react";
import Header from "./Components/Header";
import Filter from "./Components/Filter";
import Listing from "./Components/Listing";

import Container from "Components/Container/Container";
const Shop = () => {
  return (
    <main>
      <Header header={"Shop"} />
      {/* <Container> */}
      <div className="grid grid-cols-4 ">
        <Filter />
        <Listing />
      </div>
      {/* </Container> */}
    </main>
  );
};

export default Shop;
