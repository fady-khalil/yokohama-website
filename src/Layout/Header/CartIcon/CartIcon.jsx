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
  // const displayProduct = true;
  const {
    cart: userCart,
    displayProduct,
    displayProductHandler,
  } = useContext(UserCartContext);
  useEffect(() => {
    if (displayProduct) {
      const timer = setTimeout(() => {
        displayProductHandler("");
      }, 2000);

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
          {userIsSignIn
            ? userCart?.cart_items?.length || cart.length
            : cart?.length}
        </span>
      </div>

      <div
        className={`absolute -translate-x-1/2 left-1/2 transition ease-in duration-300 min-w-[max-content] top-[100%] py-2 px-2 ${
          displayProduct
            ? " translate-y-[0] opacity-100 visible select-auto"
            : "translate-y-[-50%]  opacity-[0] select-none invisible"
        } z-[100] bg-white drop-shadow-2xl `}
      >
        <p className="text-sm text-center py-2 border-b border-[#ccc] twhite ">
          Item(s) added to your cart
        </p>
        <div className="flex items-center gap-x-10 min-w-[max-content] my-4">
          <img
            className="w-10  object-contain"
            src={image}
            // src={displayProduct.images}
            alt=""
          />
          <div className="">
            <p className="min-w-[max-content] text-sm">
              Lorem ipsum dolor sit.
            </p>
            {/* <p className="min-w-[max-content] text-xs">{displayProduct.name}</p> */}
          </div>
        </div>

        <div className="flex items-center justify-center my-1">
          <Link
            to={"/my-cart"}
            className="bg-primary text-white w-full  text-center py-2 text-sm"
          >
            View Cart
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default CartIcon;
