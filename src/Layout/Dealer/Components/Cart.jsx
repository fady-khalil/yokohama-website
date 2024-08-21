import { useContext, useEffect } from "react";
import { ShoppingCart } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { DealerCartContext } from "context/DealerCart/DealerCartContext";

const CartIcon = () => {
  const { cart } = useContext(DealerCartContext);
  return (
    <Link
      to={"/my-cart"}
      className="text-white text-lg  px-6 border-l border-white items-center justify-center hidden lg:flex"
    >
      <div className="relative ">
        <ShoppingCart weight="fill" />
        <span className="absolute  -top-3 -right-3 text-white text-xs bg-primary flex items-center justify-center p-1 rounded-full w-4 h-4">
          {cart?.cart_items?.length}
        </span>
      </div>
    </Link>
  );
};

export default CartIcon;
