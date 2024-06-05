import React from "react";
import { ShoppingCart } from "@phosphor-icons/react";
const CartIcon = () => {
  return (
    <button className="bg-lightGrey p-2.5 text-lg  rounded-full">
      <ShoppingCart weight="bold" color="black" />
    </button>
  );
};

export default CartIcon;
