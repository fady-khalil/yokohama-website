import React, { useContext, useEffect, useMemo, useState } from "react";
import { GuestCartContext } from "context/Guest/GuestCartContext";
import Container from "Components/Container/Container";
import AddressForm from "form/AddressForm";
import { useNavigate } from "react-router-dom";
const GuestCheckout = () => {
  const { cart, clearCart } = useContext(GuestCartContext);
  const navigate = useNavigate();

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const totalVAT = useMemo(() => {
    return cart.reduce((acc, item) => {
      const vatPercentage = parseFloat(item.VAT) / 100;
      const vatAmount = item.price * item.quantity * vatPercentage;
      return acc + vatAmount;
    }, 0);
  }, [cart]);

  const products = useMemo(() => {
    return cart.map((item) => ({
      product_id: item.id, // Adjust based on your actual data structure
      qty: item.quantity,
    }));
  }, [cart]);

  const [isScucces, setIsSuccess] = useState(false);
  const handleIsScucces = () => {
    setIsSuccess(true);
  };

  useEffect(() => {
    if (isScucces) {
      navigate("/Success-Page");
      clearCart();
    }
  }, [isScucces]);

  return (
    <div className="py-primary">
      <Container>
        <h2 className="mb-secondary text-3xl text-center font-bold">
          Checkout
        </h2>
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-[2] flex flex-col ">
            <AddressForm
              route={"yokohama/guest/cart"}
              extraData={products}
              onHandleSuccess={handleIsScucces}
              row={10}
              title={"Your Address"}
            />
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
                    <p>Tax VAT</p>
                    <p>{totalVAT.toFixed(2)}$</p>
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
                    {(subtotal + totalVAT).toFixed(2)}$
                  </p>
                </span>

                {/* <div className="mt-6 w-full flex-1 flex">
                  <MainButton isSmall={true}>Continue to checkout</MainButton>
                </div>
                <button className="text-white rb-bold text-center underline mt-3 mx-auto flex items-center justify-center">
                  Continue Shopping
                </button> */}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default GuestCheckout;
