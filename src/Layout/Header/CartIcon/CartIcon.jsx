import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "@phosphor-icons/react";

const CartIcon = ({ itemCount = 0 }) => {
  return (
    <div className="relative flex items-center justify-center py-2 px-6">
      <Link to="/my-cart" title="go to cart">
        <ShoppingCart size={20} />
      </Link>
      <span
        className={`absolute bg-primary flex items-center justify-center p-2 text-[10px] w-2 h-2 rounded-full -top-[2px] right-3 ${
          itemCount === 0 ? "hidden" : ""
        }`}
      >
        <p>{itemCount}</p>
      </span>
    </div>
  );
};

export default CartIcon;
