import React, { useState } from "react";
import Logo from "assests/logo.png";
import usePostToken from "Hooks/Fetching/usePostToken";
import Spinner from "Components/RequestHandler/Spinner";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { postData } = usePostToken();
  const [isLoading, setIsLoading] = useState(false);

  const confirmOrderHandler = async () => {
    try {
      setIsLoading(true);
      const data = await postData(
        `/yokohama/cart/confirm?ship_id=${shippingId}&cart_id=${cartData?.cart_id}`,
        token
      );
      if (data?.is_success) {
        navigate("/Success-Page");
        clearCart();
      }
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

      <span className="mt-10 w-full flex flex-col">
        <thead className="w-full flex-1">
          <tr className="bg-[#efefef] text-[#333] flex justify-between">
            <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold">
              Product
            </th>
            <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold">
              Price
            </th>
            <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold">
              QTY
            </th>
            <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold">
              Subtotal
            </th>
          </tr>
        </thead>
        <tbody className="w-full flex-1">
          {cartData?.cart_items?.map((order, index) => (
            <tr className="flex justify-between border-b" key={index}>
              <td className="min-w-[150px] lg:min-w-auto text-center py-6  rb-bold">
                {order.name}
              </td>
              <td className="min-w-[150px] lg:min-w-auto text-center py-6  rb-bold">
                {order.price}
              </td>
              <td className="min-w-[150px] lg:min-w-auto text-center py-6  rb-bold">
                {order.quantity}
              </td>
              <td className="min-w-[150px] lg:min-w-auto text-center py-4  rb-bold">
                {order.subtotal}
              </td>
            </tr>
          ))}
        </tbody>

        <div className="w-1/4 mt-6 ml-auto flex flex-col gap-y-2">
          <span className="flex items-center justify-between text-[#333] rb-bold border-b pb-2">
            <p>Subtotal</p>
            <p>{totalSubtotal}</p>
          </span>
          <span className="flex items-center justify-between text-[#333] rb-bold border-b pb-2">
            <p>Taxes </p>
            <p>{cartData?.invoice_details?.[0]?.amount_tax}</p>
          </span>
          <span className="flex items-center justify-between text-[#333] rb-bold border-b pb-2">
            <p>Shipping </p>
            <p>0</p>
          </span>
          <span className="flex items-center justify-between text-[#333] rb-bold border-b pb-2">
            <p>Total</p>
            <p>{cartData?.invoice_details?.[0]?.amount_total}</p>
          </span>

          <button
            onClick={confirmOrderHandler}
            className="bg-primary py-2 text-white mt-4 flex items-center justify-center "
          >
            {isLoading ? <Spinner /> : " Pay"}
          </button>
        </div>
      </span>
    </div>
  );
};

export default DisplayReceipt;
