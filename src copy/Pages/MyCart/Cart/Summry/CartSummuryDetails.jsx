import { useContext, useEffect } from "react";
import MainButton from "Components/Buttons/MainButton";
import { UserCartContext } from "context/User/CartContext";
import Spinner from "Components/RequestHandler/Spinner";
const CartSummuryDetails = ({
  addShippingIdToCartLoading,
  addShippingIdToCart,
  addShippingIdToCartIsError,
}) => {
  const { cart } = useContext(UserCartContext);
  return (
    <div className="flex-1 h-fit lg:sticky lg:top-10 bg-dark border-t-4 border-primary p-6">
      {addShippingIdToCartIsError && (
        <p className="text-primary mb-6 text-center">
          Failed to add the shipping, Try again later
        </p>
      )}
      <div className="border-b border-white pb-4">
        {cart?.cart_items?.map(
          ({ name, quantity, price, currency, image }, index) => (
            <div
              key={index}
              className="bg-white flex-col items-center sm:flex-row gap-y-2 flex p-2 mb-3 gap-x-6"
            >
              <div className="">
                <img className="w-20" src={image} alt="" />
              </div>
              <div className="flex-[2] rb-bold ">
                <p>{name}</p>
                <p className="my-2">
                  {price} {currency}
                </p>
                <p>QTY {quantity}</p>
              </div>
            </div>
          )
        )}
      </div>

      <div className="border-b border-white pb-4">
        <p className="text-white text-lg rb-bold mt-4 mb-2 uppercase">
          Order Summury
        </p>

        <div className="mt-3">
          <span className="flex items-center justify-between text-[#ddd]">
            <p>Subtotal</p>
            <p>{cart?.invoice_details?.[0]?.amount_total}$</p>
          </span>
          <span className="flex items-center justify-between text-[#ddd]">
            <p>Tax Vat</p>
            <p>{cart?.invoice_details?.[0]?.amount_tax}$</p>
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
            {cart?.invoice_details?.[0]?.amount_total}$
          </p>
        </span>

        <div className="mt-6 w-full flex-1 flex">
          <MainButton onClick={() => addShippingIdToCart()} isSmall={true}>
            {addShippingIdToCartLoading ? <Spinner /> : "Confirm"}
          </MainButton>
        </div>
      </div>
    </div>
  );
};

export default CartSummuryDetails;
