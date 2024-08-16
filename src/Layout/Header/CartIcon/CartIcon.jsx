import { useContext, useEffect } from "react";
import { ShoppingCart } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
// context
import { UserLoginContext } from "context/Auth/UserLoginContext";
import { GuestCartContext } from "context/Guest/GuestCartContext";
import { UserCartContext } from "context/User/CartContext";

import image from "assests/product-1-cropped-removebg-preview.png";

const CartIcon = ({ isHomePage }) => {
  const { userIsSignIn } = useContext(UserLoginContext);
  const { cart } = useContext(GuestCartContext);
  const {
    cart: userCart,
    displayProduct,
    displayProductHandler,
  } = useContext(UserCartContext);

  useEffect(() => {
    if (displayProduct) {
      const timer = setTimeout(() => {
        displayProductHandler("");
      }, 1000);

      return () => clearTimeout(timer); // Clean up the timer if the component unmounts or displayProduct changes
    }
  }, [displayProduct, displayProductHandler]);

  return (
    <Link
      to={"/my-cart"}
      className=" text-lg py-6 h-full border-r border-l border-[#777] px-6 relative"
    >
      <div className="relative ">
        <ShoppingCart weight="fill" color={isHomePage ? "black" : "white"} />
        <span className="absolute  -top-3 -right-3 text-white text-xs bg-primary flex items-center justify-center p-1 rounded-full w-4 h-4">
          {userIsSignIn ? userCart?.cart_items?.length : cart?.length}
        </span>
      </div>

      <div
        className={`absolute -translate-x-1/2 left-1/2 transition ease-in duration-300  top-[100%] ${
          displayProduct
            ? " translate-y-[0] opacity-100 "
            : "translate-y-[-50%]  opacity-[0]"
        } z-[100] bg-white drop-shadow-2xl `}
      >
        <div className="flex items-center gap-x-3  p-3 min-w-[max-content]">
          <img
            className="w-8  object-contain"
            src={image}
            // src={displayProduct.images}
            alt=""
          />
          <div className="">
            <p className="min-w-[max-content] text-xs">{displayProduct.name}</p>
          </div>
        </div>

        <p className="text-xs text-center bg-primary text-white p-3">
          Item added to your cart
        </p>
      </div>
    </Link>
  );
};

export default CartIcon;
