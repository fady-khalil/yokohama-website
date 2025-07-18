import { useState, useEffect, useContext } from "react";
import Reciept from "./Components/Reciept";
import { DealerCartContext } from "context/DealerCart/DealerCartContext";
import EmptyCart from "Components/Screens/EmptyCart";
import Spinner from "Components/RequestHandler/Spinner";

const Cart = () => {
  const { cart, cartIsLoading, localCart, isLocalCartMode } =
    useContext(DealerCartContext);

  // Determine if cart is empty
  const isCartEmpty = () => {
    if (isLocalCartMode) {
      return !localCart || localCart.length === 0;
    }
    return !cart?.cart_items || cart.cart_items.length === 0;
  };

  if (cartIsLoading) {
    return (
      <div className="flex items-center flex-col mt-14 h-[40vh]">
        <Spinner />
        <p className="mt-6">Loading cart data...</p>
      </div>
    );
  }

  return <section>{isCartEmpty() ? <EmptyCart /> : <Reciept />}</section>;
};

export default Cart;
