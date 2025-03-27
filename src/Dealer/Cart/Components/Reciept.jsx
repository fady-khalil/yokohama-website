import Container from "Components/Container/Container";
import Logo from "assests/logo.png";
import { DealerCartContext } from "context/DealerCart/DealerCartContext";
import { DealerLoginContext } from "context/Auth/DealerContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "Components/RequestHandler/Spinner";
import { Trash } from "@phosphor-icons/react";
import useGetDataToken from "Hooks/Fetching/useGetDataToken.jsx";
import usePostToken from "Hooks/Fetching/usePostToken";
const Reciept = () => {
  const {
    cart,
    clearCart,
    removeFromCart,
    loadingItems,
    updateCart,
    updateCartLoading,
  } = useContext(DealerCartContext);
  const { fetchData } = useGetDataToken();
  const { postData } = usePostToken();
  const { dealerData, dealerToken } = useContext(DealerLoginContext);
  const navigate = useNavigate();
  // date
  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US");
  // payment
  const [paymentIsLoading, setPaymentIsLoading] = useState(false);
  const [onAccountLoading, setOnAccountLoading] = useState(false);

  const payNowHandler = async () => {
    try {
      setPaymentIsLoading(true);
      const data = await fetchData(
        `yokohama/areeba/pay/${cart?.cart_id}`,
        dealerToken
      );
      if (data) {
        localStorage.setItem("payment_ref", data?.payment_ref);
        localStorage.setItem("order_id", data?.order_id);
        window.location.href = data?.url_payment;
      }
    } catch (error) {
    } finally {
      setPaymentIsLoading(false);
    }
  };

  const onAccountHandler = async () => {
    try {
      setOnAccountLoading(true);
      const data = await postData(
        `yokohama/cart/confirm?&cart_id=${cart?.cart_id}`,
        dealerToken
      );
      if (data) {
        navigate("/success");
        clearCart();
      }
    } catch (error) {
    } finally {
      setOnAccountLoading(false);
    }
  };
  return (
    <div className="my-secondary">
      <Container>
        <div className=" w-3/4 mx-auto ">
          <div className="flex items-center justify-between bg-[#efefef] px-6 py-4">
            <img className="w-44" src={Logo} alt="" />

            <div className="flex items-center gap-x-4">
              <p className="uppercase rb-bold border-r border-black px-2  text-[#333]">
                {dealerData?.username}
              </p>
              <p className="uppercase rb-bold border-r border-black px-2  text-[#333]">
                {dealerData?.email}
              </p>
              <p className="uppercase rb-bold border-r border-black px-2  text-[#333]">
                {dealerData?.phone}
                {/* 123 */}
              </p>
              <p className="rb-bold uppercase border-r border-black px-2  text-[#333]">
                {formattedDate}
              </p>
              <p className="rb-bold uppercase  text-[#333]">
                {" "}
                order #{cart?.cart_id}
              </p>
            </div>
          </div>

          <div className="mt-10 w-full flex flex-col">
            <table>
              <thead>
                <tr className="bg-[#efefef] text-[#333]">
                  <th className="py-4 uppercase rb-bold w-1/4">Product</th>
                  <th className="py-4 uppercase rb-bold w-1/4">Price</th>
                  <th className="py-4 uppercase rb-bold w-1/4">QTY</th>
                  <th className="py-4 uppercase rb-bold w-1/4">Subtotal</th>
                  <th className="py-4 uppercase rb-bold w-1/4"></th>
                </tr>
              </thead>
              <tbody>
                {cart?.cart_items?.map((order, index) => (
                  <tr className="border-b" key={index}>
                    <td className="py-6 rb-bold text-center">{order.name}</td>
                    <td className="py-6 rb-bold text-center">
                      {Number(order.retail_price).toFixed(2)}$
                    </td>
                    <td className="py-6 rb-bold text-center">
                      <div className="flex items-center justify-center gap-x-2">
                        <p>
                          {/* {updateCartLoading[order.product_id] ? (
                            <Spinner isSmall={true} />
                          ) : (
                          )} */}
                          {order.quantity}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 rb-bold text-center">
                      {(Number(order.retail_price) * order.quantity).toFixed(2)}
                      $
                    </td>

                    <td className="py-4 rb-bold text-center">
                      <button
                        onClick={() => removeFromCart(order.product_id)}
                        className="text-red-500"
                      >
                        {loadingItems[order.product_id] ? (
                          <Spinner isSmall={true} />
                        ) : (
                          <Trash size={20} />
                        )}
                      </button>
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
                    cart?.invoice_details?.[0]?.untaxed_amount_total
                  ).toFixed(2)}{" "}
                  $
                </p>
              </span>
              <span className="flex items-center justify-between text-[#333] rb-bold border-b pb-2">
                <p>Taxes </p>
                <p>
                  {Number(cart?.invoice_details?.[0]?.amount_tax).toFixed(2)} $
                </p>
              </span>
              <span className="flex items-center justify-between text-[#333] rb-bold border-b pb-2">
                <p>Shipping </p>
                <p>0</p>
              </span>
              {/* <span className="flex items-center justify-between text-[#333] rb-bold border-b pb-2">
                <p>Mounting Charge</p>
                <p>0</p>
              </span> */}
              <span className="flex items-center justify-between text-[#333] rb-bold border-b pb-2">
                <p>Total</p>
                <p>
                  {Number(cart?.invoice_details?.[0]?.amount_total).toFixed(2)}{" "}
                  $
                </p>
              </span>

              <div className=" mt-4 flex items-center gap-x-2">
                <button
                  onClick={onAccountHandler}
                  className="flex-1 bg-primary py-2 text-white flex items-center justify-center "
                >
                  {onAccountLoading ? <Spinner /> : "On Account"}
                </button>

                <button
                  onClick={payNowHandler}
                  className="flex-1 bg-primary py-2 text-white flex items-center justify-center "
                >
                  {paymentIsLoading ? <Spinner /> : " Pay Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Reciept;
