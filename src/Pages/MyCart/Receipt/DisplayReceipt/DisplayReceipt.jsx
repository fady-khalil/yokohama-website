import React, { useState, useContext } from "react";
import Logo from "assests/logo.png";
import Spinner from "Components/RequestHandler/Spinner";
import { UserLoginContext } from "context/Auth/UserLoginContext.js";
import { UserCartContext } from "context/User/CartContext.js";
import useGetDataToken from "Hooks/Fetching/useGetDataToken.jsx";

const DisplayReceipt = ({
  userData,
  shippingData,
  billingData,
  cartData,
  shippingId,
  token,
  clearCart,
}) => {
  // date
  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US");

  const totalSubtotal = cartData?.cart_items?.reduce(
    (total, order) => total + order.subtotal,
    0
  );

  const { fetchData } = useGetDataToken();
  const { userToken } = useContext(UserLoginContext);
  const { setPaymentRef, setOrderId } = useContext(UserCartContext);
  const [isLoading, setIsLoading] = useState(false);

  const confirmOrderHandler = async () => {
    try {
      setIsLoading(true);
      const data = await fetchData(
        `yokohama/areeba/pay/${cartData?.cart_id}`,
        userToken
      );

      if (data) {
        setPaymentRef(data?.payment_ref);
        setOrderId(data?.order_id);
        window.location.href = data?.url_payment;
      }

      console.log(data);
      // const data = await postData(
      //   `/yokohama/cart/confirm?ship_id=${shippingId}&cart_id=${cartData?.cart_id}`,
      //   token
      // );
      // if (data?.is_success) {
      //   navigate("/Success-Page");
      //   clearCart();
      // }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" w-3/4 mx-auto ">
      <div className="flex items-center justify-between bg-[#efefef] px-6 py-4">
        <img className="w-56" src={Logo} alt="" />

        <div className="flex items-center gap-x-4">
          <p className="uppercase rb-bold border-r border-black px-2  text-[#333]">
            {userData?.username}
          </p>
          <p className="rb-bold uppercase border-r border-black px-2  text-[#333]">
            {formattedDate}
          </p>
          <p className="rb-bold uppercase  text-[#333]">
            order #{cartData?.cart_id}
          </p>
        </div>
      </div>

      <div className="flex my-10">
        <div className="flex-1">
          <p className="text-xl text-primary mb-2 rb-bold uppercase">
            Shipping address
          </p>

          <div className="text-sm rb-bold">
            <p>{shippingData.street}</p>
            <p>{shippingData.name}</p>
            <p>{shippingData.phone}</p>
            <p>{shippingData.email}</p>
          </div>

          {/* <img className="mt-4" src={mapImage} alt="" /> */}
        </div>
        <div className="flex-1">
          <p className="text-xl text-primary mb-2 rb-bold uppercase">
            Billing address
          </p>

          <div className="text-sm rb-bold">
            <p>{billingData?.street}</p>
            <p>{billingData?.name}</p>
            <p>{billingData?.phone}</p>
            <p>{billingData?.email}</p>
          </div>
        </div>
      </div>

      <div className="pt-10 border-t rb-bold">
        <p className="text-xl text-primary mb-2  uppercase">Payment method</p>
        <p className="text-sm">Online payment</p>
      </div>

      <div className="mt-10 w-full">
        <table className="w-full">
          <thead>
            <tr className="bg-[#efefef] text-[#333]">
              <th className="py-4 uppercase rb-bold w-1/4">Product</th>
              <th className="py-4 uppercase rb-bold w-1/4">Price</th>
              <th className="py-4 uppercase rb-bold w-1/4">QTY</th>
              <th className="py-4 uppercase rb-bold w-1/4">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartData?.cart_items?.map((order, index) => (
              <tr className="border-b" key={index}>
                <td className="py-6 rb-bold text-center">{order.name}</td>
                <td className="py-6 rb-bold text-center">
                  {Number(order.retail_price).toFixed(2)}$
                </td>
                <td className="py-6 rb-bold text-center">{order.quantity}</td>
                <td className="py-4 rb-bold text-center">
                  {(Number(order.retail_price) * order.quantity).toFixed(2)}$
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="w-1/3 mt-6 ml-auto flex flex-col gap-y-2">
          <span className="flex items-center justify-between text-[#333] rb-bold border-b pb-2">
            <p>Subtotal</p>
            <p>
              {Number(
                cartData?.invoice_details?.[0].untaxed_amount_total
              ).toFixed(2)}{" "}
              $
            </p>
          </span>
          <span className="flex items-center justify-between text-[#333] rb-bold border-b pb-2">
            <p>Taxes </p>
            <p>
              {Number(cartData?.invoice_details?.[0]?.amount_tax).toFixed(2)} $
            </p>
          </span>
          <span className="flex items-center justify-between text-[#333] rb-bold border-b pb-2">
            <p>Shipping </p>
            <p>0</p>
          </span>
          <span className="flex items-center justify-between text-[#333] rb-bold border-b pb-2">
            <p>Total</p>
            <p>
              {Number(cartData?.invoice_details?.[0]?.amount_total).toFixed(2)}{" "}
              $
            </p>
          </span>

          <button
            onClick={confirmOrderHandler}
            className="bg-primary py-2 text-white mt-4 flex items-center justify-center "
          >
            {isLoading ? <Spinner /> : " Pay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayReceipt;
