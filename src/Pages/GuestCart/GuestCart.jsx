import React, { useContext, useMemo } from "react";
import { GuestCartContext } from "context/Guest/GuestCartContext";
import Container from "Components/Container/Container";
import { Trash } from "@phosphor-icons/react";
import MainButton from "Components/Buttons/MainButton";
import EmptyCart from "Components/Screens/EmptyCart";
const GuestCart = () => {
  const { cart, removeFromCart, updateCart } = useContext(GuestCartContext);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
    } else {
      updateCart(productId, quantity);
    }
  };

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <div className="py-primary">
      <Container>
        <h2 className="mb-secondary text-3xl text-center font-bold">
          Your Cart
        </h2>
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-[2] flex flex-col gap-y-3">
            {cart.length > 0 ? (
              <ul>
                {cart.map((item, index) => (
                  <div
                    className="flex flex-wrap gap-6 items-center justify-between w-full border-b pb-3"
                    key={index}
                  >
                    <img className="w-32 mr-12" src={item.images} alt="" />
                    <div className="flex-1">
                      <img
                        className="w-16 object-contain"
                        src={item.category?.[0]?.image}
                        alt=""
                      />
                      <p className="font-bold text-primary">
                        {item?.classification}
                      </p>
                      <p className="font-bold text-lg">{item?.name}</p>
                      <span className="mt-2 flex items-center gap-x-2">
                        <p>{item.price}</p>
                        <p>{item.currency}</p>
                      </span>
                    </div>
                    <div className="border py-2 px-4 flex items-center justify-between gap-x-6">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                      <p>{item.quantity}</p>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center justify-center"
                    >
                      <Trash weight="fill" size={26} />
                    </button>
                  </div>
                ))}
              </ul>
            ) : (
              <EmptyCart />
            )}
          </div>

          {cart.length > 0 && (
            <div className="flex-1 h-fit lg:sticky lg:top-10 bg-dark border-t-4 border-primary p-6">
              <div className="border-b border-white pb-4">
                <p className="text-white text-lg rb-bold mt-4 mb-2 uppercase">
                  Order Summary
                </p>

                <div className="mt-3 flex flex-col gap-y-2">
                  <span className="flex items-center justify-between text-[#ddd]">
                    <p>Subtotal</p>
                    <p>{subtotal.toFixed(2)}$</p>
                  </span>
                  <span className="flex items-center justify-between text-[#ddd]">
                    <p>Tax Vat</p>
                    <p>200$</p>
                  </span>
                  <span className="flex items-center justify-between text-[#ddd]">
                    <p>Shipping Charge</p>
                    <p>0</p>
                  </span>
                </div>
              </div>

              <div className="pb-4">
                <span className="flex items-center justify-between">
                  <p className="text-white text-xl rb-bold mt-4 mb-2 uppercase">
                    Total
                  </p>
                  <p className="text-white text-xl rb-bold mt-4 mb-2">
                    {subtotal.toFixed(2)}$
                  </p>
                </span>

                <div className="mt-6 w-full flex-1 flex">
                  <MainButton isSmall={true}>Continue to checkout</MainButton>
                </div>
                <button className="text-white rb-bold text-center underline mt-3 mx-auto flex items-center justify-center">
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default GuestCart;
