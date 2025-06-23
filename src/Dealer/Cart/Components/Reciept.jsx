import Container from "Components/Container/Container";
import Logo from "assests/logo.png";
import { DealerCartContext } from "context/DealerCart/DealerCartContext";
import { DealerLoginContext } from "context/Auth/DealerContext";
import { useContext, useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "Components/RequestHandler/Spinner";
import { Trash, X } from "@phosphor-icons/react";
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
    localCart,
    isLocalCartMode,
    addProductsToOdooCart,
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
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowConfirmModal(false);
      }
    };

    if (showConfirmModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showConfirmModal]);

  // Calculate subtotal for local cart
  const subtotal = useMemo(() => {
    if (isLocalCartMode && localCart?.length > 0) {
      return localCart
        .reduce((total, item) => {
          const price = Number(item.retail_price || item.price || 0);
          return total + price * (item.quantity || 1);
        }, 0)
        .toFixed(2);
    }
    return Number(
      cart?.invoice_details?.[0]?.untaxed_amount_total || 0
    ).toFixed(2);
  }, [isLocalCartMode, localCart, cart]);

  // Calculate total (same as subtotal for local cart since tax will be calculated later)
  const total = useMemo(() => {
    if (isLocalCartMode) {
      return subtotal; // For local cart, total is initially same as subtotal
    }
    return Number(cart?.invoice_details?.[0]?.amount_total || 0).toFixed(2);
  }, [isLocalCartMode, subtotal, cart]);

  // Handle Pay Now
  const payNowHandler = async () => {
    try {
      setPaymentIsLoading(true);
      setShowConfirmModal(false);

      // If in local mode, first transfer items to Odoo cart
      if (isLocalCartMode && localCart?.length > 0) {
        console.log("Transferring items from local cart to Odoo for payment");
        const success = await addProductsToOdooCart(localCart);

        if (!success) {
          console.error("Failed to transfer items to Odoo cart");
          setPaymentIsLoading(false);
          return;
        }

        // Clear local storage (but Odoo cart should still be available)
        localStorage.removeItem("dealerCart");
      }

      // Now proceed with payment
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
      console.error("Error processing payment:", error);
    } finally {
      setPaymentIsLoading(false);
    }
  };

  // Handle On Account
  const onAccountHandler = async () => {
    try {
      setOnAccountLoading(true);
      setShowConfirmModal(false);
      console.log(isLocalCartMode && localCart?.length > 0);
      // If in local mode, first transfer items to Odoo cart
      if (isLocalCartMode && localCart?.length > 0) {
        console.log(
          "Transferring items from local cart to Odoo for on-account order"
        );
        const success = await addProductsToOdooCart(localCart);

        if (!success) {
          console.error("Failed to transfer items to Odoo cart");
          setOnAccountLoading(false);
          return;
        }
      }

      // Confirm the cart
      const data = await postData(
        `yokohama/cart/confirm?cart_id=${cart?.cart_id}`,
        dealerToken
      );

      if (data?.is_success) {
        // Clear local storage
        localStorage.removeItem("dealerCart");
        // Clear cart state
        clearCart();
        // Show success state
        setOrderSuccess(true);

        // Navigate to success page after delay
        setTimeout(() => {
          navigate("/success");
        }, 2000);
      }
    } catch (error) {
      console.error("Error processing on-account order:", error);
    } finally {
      setOnAccountLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="my-secondary">
        <Container>
          <div className="w-3/4 mx-auto text-center py-16">
            <h2 className="text-2xl mb-6">Order Placed Successfully!</h2>
            <p className="mb-8">
              Thank you for your order. Our team will contact you shortly.
            </p>
            <p className="text-sm">Redirecting to success page...</p>
          </div>
        </Container>
      </div>
    );
  }

  // Determine which items to display
  const cartItems = isLocalCartMode ? localCart : cart?.cart_items || [];

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
              </p>
              <p className="rb-bold uppercase border-r border-black px-2  text-[#333]">
                {formattedDate}
              </p>
              <p className="rb-bold uppercase  text-[#333]">
                {" "}
                order #{cart?.cart_id || "New"}
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
                {cartItems.map((order, index) => {
                  const itemPrice = Number(
                    order.retail_price || order.price || 0
                  );
                  const itemQuantity = order.quantity || 1;
                  const itemSubtotal = (itemPrice * itemQuantity).toFixed(2);

                  return (
                    <tr className="border-b" key={index}>
                      <td className="py-6 rb-bold text-center">{order.name}</td>
                      <td className="py-6 rb-bold text-center">
                        {itemPrice.toFixed(2)}$
                      </td>
                      <td className="py-6 rb-bold text-center">
                        <div className="flex items-center justify-center gap-x-2">
                          <p>{itemQuantity}</p>
                        </div>
                      </td>
                      <td className="py-4 rb-bold text-center">
                        {itemSubtotal}$
                      </td>

                      <td className="py-4 rb-bold text-center">
                        <button
                          onClick={() =>
                            removeFromCart(order.product_id || order.id)
                          }
                          className="text-red-500"
                        >
                          {loadingItems[order.product_id || order.id] ? (
                            <Spinner isSmall={true} />
                          ) : (
                            <Trash size={20} />
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="w-1/3 mt-6 ml-auto flex flex-col gap-y-2">
              <span className="flex items-center justify-between text-[#333] rb-bold border-b pb-2">
                <p>Subtotal</p>
                <p>{subtotal} $</p>
              </span>
              <span className="flex items-center justify-between text-[#333] rb-bold border-b pb-2">
                <p>Taxes </p>
                {isLocalCartMode ? (
                  <p className="text-sm italic">Calculated upon confirmation</p>
                ) : (
                  <p>
                    {Number(
                      cart?.invoice_details?.[0]?.amount_tax || 0
                    ).toFixed(2)}{" "}
                    $
                  </p>
                )}
              </span>
              <span className="flex items-center justify-between text-[#333] rb-bold border-b pb-2">
                <p>Shipping </p>
                <p>0 $</p>
              </span>
              <span className="flex items-center justify-between text-[#333] rb-bold border-b pb-2">
                <p>Total</p>
                <p>
                  {total} $
                  {isLocalCartMode && (
                    <span className="text-xs ml-1 font-normal">
                      (excl. tax)
                    </span>
                  )}
                </p>
              </span>

              <div className=" mt-4 flex items-center gap-x-2">
                <button
                  onClick={() => setShowConfirmModal(true)}
                  disabled={cartItems.length === 0}
                  className={`flex-1 bg-primary py-2 text-white flex items-center justify-center ${
                    cartItems.length === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Confirm Your Order
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modal with Overlay */}
        {showConfirmModal && (
          <>
            {/* Black overlay */}
            <div className="fixed inset-0 bg-black/80 z-40"></div>

            {/* Modal */}
            <div
              ref={modalRef}
              className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl rounded-lg p-8 w-[450px] max-w-[90vw]"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl rb-bold text-primary">Confirm Order</h3>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="text-gray-500 hover:text-gray-800 transition-colors"
                >
                  <X size={22} weight="bold" />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 mb-2">
                  You're about to place an order for:
                </p>
                <p className="text-lg rb-bold">
                  {total} ${" "}
                  {isLocalCartMode && (
                    <span className="text-xs font-normal">(excl. tax)</span>
                  )}
                </p>
                <p className="text-sm text-gray-600 mt-4">
                  Please select how you would like to proceed with this order:
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={onAccountHandler}
                  disabled={onAccountLoading}
                  className="w-full bg-primary py-3 text-white rounded-md rb-bold hover:bg-primary/90 transition-colors flex items-center justify-center"
                >
                  {onAccountLoading ? <Spinner /> : "Yes, Confirm Order"}
                </button>

                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="w-full bg-gray-200 py-3 text-gray-800 rounded-md rb-bold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>

              <div className="mt-16">
                <h4 className="text-lg rb-bold text-[#2563EB] mb-3">
                  Payment Options
                </h4>
                <p className="text-gray-700 mb-4">
                  Would you like to complete your purchase with an immediate
                  payment? Our secure payment gateway ensures your transaction
                  is safe and efficient.
                </p>
                <button
                  onClick={payNowHandler}
                  disabled={paymentIsLoading}
                  className="w-full bg-[#2563EB] py-3 text-white rounded-md rb-bold hover:bg-[#2563EB]/90 transition-colors flex items-center justify-center"
                >
                  {paymentIsLoading ? <Spinner /> : "Pay Now"}
                </button>
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default Reciept;
