import { useContext } from "react";
import MainButton from "Components/Buttons/MainButton";
import { UserCartContext } from "context/User/CartContext";

const CartSummury = ({ onSelectingTabs, isShipping }) => {
  const { cart } = useContext(UserCartContext);

  return (
    <div className="flex-1 h-fit lg:sticky lg:top-10 bg-dark border-t-4 border-primary p-6">
      {isShipping && (
        <div className="border-b border-white pb-4">
          {cart.cart_items.map(
            ({ name, quantity, price, currency, image }, index) => (
              <div
                key={index}
                className="bg-white flex-col items-center sm:flex-row gap-y-2 flex p-2 mb-3 gap-x-6"
              >
                <div className="">
                  <img className="w-20" src={image} alt="" />
                </div>
                <div className="rb-bold ">
                  <p>{name}</p>
                  <p className="my-2 ">
                    {price} {currency}
                  </p>
                  <p>QTY {quantity}</p>
                </div>
              </div>
            )
          )}
        </div>
      )}
      <div className="border-b border-white pb-4">
        <p className="text-white text-lg rb-bold mt-4 mb-2 uppercase">
          Order summary
        </p>

        <div className="mt-3">
          <span className="flex items-center justify-between text-[#ddd]">
            <p>Subtotal</p>
            <p>
              {Number(cart?.invoice_details?.[0]?.untaxed_amount_total).toFixed(
                2
              )}
              $
            </p>
          </span>
          <span className="flex items-center justify-between text-[#ddd]">
            <p>Tax Vat</p>
            <p>{Number(cart?.invoice_details?.[0]?.amount_tax).toFixed(2)}$</p>
          </span>
          <span className="flex items-center justify-between text-[#ddd]">
            <p>Delivery Charge</p>
            <p>0</p>
          </span>
          <span className="flex items-center justify-between text-[#ddd]">
            <p>Mounting Charge</p>
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
            {Number(cart?.invoice_details?.[0]?.amount_total).toFixed(2)}$
          </p>
        </span>

        <div className="mt-6 w-full flex-1 flex">
          <MainButton onClick={() => onSelectingTabs(2)} isSmall={true}>
            Confirm
          </MainButton>
        </div>
      </div>
    </div>
  );
};

export default CartSummury;
