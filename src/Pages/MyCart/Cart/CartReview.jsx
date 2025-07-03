import { useContext } from "react";
import Container from "Components/Container/Container";
import { Trash } from "@phosphor-icons/react";
import Spinner from "Components/RequestHandler/Spinner";
import EmptyCart from "Components/Screens/EmptyCart";
import { Link } from "react-router-dom";
// context
import { UserCartContext } from "context/User/CartContext";

// ui
import CartSummury from "./Summry/CartSummury";

const CartReview = ({ onSelectingTabs }) => {
  const { cart, isLoading, removeFromCart, loadingItems, updateQuantity } =
    useContext(UserCartContext);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, quantity);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center flex-col mt-14 h-[40vh]">
        <Spinner />
        <p className="mt-6">Loading cart data...</p>
      </div>
    );
  }

  return (
    <div className="py-secondary">
      <Container>
        {cart && cart.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="flex-[2] flex flex-col gap-y-3">
              {cart.map((item, index) => (
                <div
                  className="flex flex-wrap gap-6 items-center justify-between w-full border-b pb-3"
                  key={item.id || index}
                >
                  {/* image */}
                  <Link
                    className="lg:flex-1"
                    to={`/product-detailed/${item.id || item.product_id}`}
                  >
                    <img className="w-32" src={item.image} alt={item.name} />
                  </Link>

                  {/* name and price */}
                  <div className="flex-[3]">
                    <Link
                      to={`/product-detailed/${item.id || item.product_id}`}
                      className="f min-w-[fit-content] font-medium"
                    >
                      {item.name}
                    </Link>
                    <div className="flex items-center gap-x-8">
                      {item.price && (
                        <span className="mt-2 flex items-center line-through text-red-500">
                          <p>{item.price}</p>
                          <p>{item.currency}</p>
                        </span>
                      )}
                      <span className="mt-2 flex items-center gap-x-1">
                        <p>{item.retail_price || item.price}</p>
                        <p>{item.currency}</p>
                      </span>
                    </div>
                  </div>

                  {/* quantity and delete from cart */}
                  <div className="flex-1 gap-x-2 flex items-center justify-end lg:justify-start">
                    <div className="border py-2 px-4 flex items-center justify-between gap-x-6">
                      <button
                        onClick={() => {
                          const currentQty =
                            typeof item.quantity === "object"
                              ? item.quantity?.free_quantity || 1
                              : item.quantity;
                          handleQuantityChange(
                            item.id || item.product_id,
                            currentQty + 1
                          );
                        }}
                      >
                        +
                      </button>
                      <p>
                        {typeof item.quantity === "object"
                          ? item.quantity?.free_quantity || 1
                          : item.quantity}
                      </p>
                      <button
                        onClick={() => {
                          const currentQty =
                            typeof item.quantity === "object"
                              ? item.quantity?.free_quantity || 1
                              : item.quantity;
                          handleQuantityChange(
                            item.id || item.product_id,
                            currentQty - 1
                          );
                        }}
                      >
                        -
                      </button>
                    </div>
                    <button
                      title="remove from cart"
                      onClick={() => removeFromCart(item.id || item.product_id)}
                      className=" flex items-center justify-center"
                    >
                      {loadingItems[item.id || item.product_id] ? (
                        <Spinner />
                      ) : (
                        <Trash weight="fill" size={26} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <CartSummury onSelectingTabs={onSelectingTabs} />
          </div>
        ) : (
          <EmptyCart />
        )}
      </Container>
    </div>
  );
};

export default CartReview;
