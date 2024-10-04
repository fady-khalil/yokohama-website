import { useContext, useEffect } from "react";
import Container from "Components/Container/Container";
import { Trash } from "@phosphor-icons/react";
import Spinner from "Components/RequestHandler/Spinner";
import MainButton from "Components/Buttons/MainButton";
import EmptyCart from "Components/Screens/EmptyCart";
import { Link } from "react-router-dom";
// context
import { UserCartContext } from "context/User/CartContext";

// ui
import CartSummury from "./Summry/CartSummury";
const CartReview = ({ onSelectingTabs }) => {
  const { cart, cartIsLoading, removeFromCart, loadingItems, updateCart } =
    useContext(UserCartContext);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
    } else {
      updateCart(productId, quantity);
    }
  };

  if (cartIsLoading)
    return (
      <div className="flex items-center flex-col mt-14 h-[40vh]">
        <Spinner />
        <p className="mt-6">Loading cart data...</p>
      </div>
    );

  if (cart) {
    return (
      <div className="py-secondary">
        <Container>
          {cart?.cart_items?.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="flex-[2] flex flex-col gap-y-3">
                {cart?.cart_items?.map(
                  (
                    { name, image, price, currency, quantity, product_id },
                    index
                  ) => (
                    <div
                      className="flex flex-wrap gap-6 items-center justify-between w-full border-b pb-3"
                      key={index}
                    >
                      <Link to={`/product-detailed/${product_id}`}>
                        <img className="w-28" src={image} alt="" />
                      </Link>
                      <div>
                        <Link
                          to={`/product-detailed/${product_id}`}
                          className="f min-w-[fit-content] font-medium"
                        >
                          {name}
                        </Link>
                        <span className="mt-2 flex items-center gap-x-2">
                          <p>{price}</p>
                          <p>{currency}</p>
                        </span>
                      </div>
                      <div className="border py-2 px-4 flex items-center justify-between gap-x-6">
                        <button
                          onClick={() =>
                            handleQuantityChange(product_id, quantity + 1)
                          }
                        >
                          +
                        </button>
                        <p>{quantity}</p>
                        <button
                          onClick={() =>
                            handleQuantityChange(product_id, quantity - 1)
                          }
                        >
                          -
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(product_id)}
                        className=" flex items-center justify-center"
                      >
                        {loadingItems[product_id] ? (
                          <Spinner />
                        ) : (
                          <Trash weight="fill" size={26} />
                        )}
                      </button>
                    </div>
                  )
                )}
              </div>
              <CartSummury onSelectingTabs={onSelectingTabs} cart={cart} />
            </div>
          ) : (
            <EmptyCart />
          )}
        </Container>
      </div>
    );
  }
};

export default CartReview;
