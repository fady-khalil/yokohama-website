import React from "react";
import { ShoppingCart } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
const CartIcon = ({ isHomePage }) => {
  return (
    <Link
      to={"/my-cart"}
      className=" text-lg py-6 h-full border-r border-l border-[#777] px-6"
    >
      <ShoppingCart weight="fill" color={isHomePage ? "black" : "white"} />
    </Link>
  );
};

export default CartIcon;
