import React from "react";
import { ShoppingCart } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DealerCartContext } from "context/DealerCart/DealerCartContext";

const CartIcon = ({ onMouseLeft }) => {
  const { handleCartModalVisible } = useContext(DealerCartContext);

  return (
    <Link
      to={"/my-cart"}
      onClick={handleCartModalVisible}
      onMouseEnter={onMouseLeft}
      className="text-white text-lg   items-center hidden lg:flex"
    >
      <ShoppingCart weight="fill" />
    </Link>
    // <button
    //   onClick={handleCartModalVisible}
    //   onMouseEnter={onMouseLeft}
    //   className="text-white text-lg  flex items-center"
    // >
    //   <ShoppingCart weight="fill" />
    // </button>
  );
};

export default CartIcon;
