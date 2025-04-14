import { useContext, useState, useMemo } from "react";
import MainButton from "Components/Buttons/MainButton";
import { UserCartContext } from "context/User/CartContext";
import { UserLoginContext } from "context/Auth/UserLoginContext";
import Spinner from "Components/RequestHandler/Spinner";
import { useNavigate } from "react-router-dom";

const CartSummury = ({ onSelectingTabs, isShipping }) => {
  const {
    cart,
    addProductsToOdooCart,
    clearCart,
    localCart,
    isLocalCartMode,
    hasExistingOdooCart,
  } = useContext(UserCartContext);

  const { userIsSignIn } = useContext(UserLoginContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const navigate = useNavigate();

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

  // Calculate total (same as subtotal for local cart since VAT will be calculated later)
  const total = useMemo(() => {
    if (isLocalCartMode) {
      return subtotal; // For local cart, total is initially same as subtotal
    }
    return Number(cart?.invoice_details?.[0]?.amount_total || 0).toFixed(2);
  }, [isLocalCartMode, subtotal, cart]);

  // Check if we should show the Cash on Delivery option
  // Only show if using local cart (no existing Odoo cart)
  const showCashOnDelivery = isLocalCartMode && !hasExistingOdooCart;

  const handlePayNow = async () => {
    setIsProcessing(true);

    try {
      // If we're using local cart, transfer items to Odoo cart
      if (isLocalCartMode && localCart?.length > 0) {
        console.log("Transferring items from local cart to Odoo");
        const success = await addProductsToOdooCart(localCart);

        if (!success) {
          console.error("Failed to transfer items to Odoo cart");
          setIsProcessing(false);
          return;
        }

        // Clear local storage but not cart state (we need it for the next steps)
        localStorage.removeItem("userCart");
      }

      // Proceed to shipping selection
      onSelectingTabs(2);
    } catch (error) {
      console.error("Error in Pay Now flow:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCashOnDelivery = async () => {
    setIsProcessing(true);

    try {
      // If we're using local cart, transfer items to Odoo cart
      if (isLocalCartMode && localCart?.length > 0) {
        console.log(
          "Transferring items from local cart to Odoo for Cash on Delivery"
        );
        const success = await addProductsToOdooCart(localCart);

        if (!success) {
          console.error("Failed to transfer items to Odoo cart");
          setIsProcessing(false);
          return;
        }

        // Clear the cart completely (local storage and state)
        localStorage.removeItem("userCart");
        clearCart();

        // Show success state
        setOrderSuccess(true);

        // After showing success message, redirect to home
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.error("Error in Cash on Delivery flow:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="flex-1 h-fit lg:sticky lg:top-10 bg-dark border-t-4 border-primary p-6">
        <div className="text-center py-10">
          <div className="text-white text-xl mb-6">
            Your order has been placed successfully!
          </div>
          <div className="text-white mb-8">
            Thank you for your order. Our team will contact you shortly to
            arrange delivery.
          </div>
          <div className="text-white text-sm">Redirecting to homepage...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 h-fit lg:sticky lg:top-10 bg-dark border-t-4 border-primary p-6">
      {/* Display cart items when in shipping view */}
      {isShipping && cart?.cart_items && (
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

      {/* Display local cart items when not in shipping view and using local cart */}
      {!isShipping && isLocalCartMode && localCart?.length > 0 && (
        <div className="border-b border-white pb-4">
          {localCart.map((item, index) => (
            <div
              key={index}
              className="bg-white flex-col items-center sm:flex-row gap-y-2 flex p-2 mb-3 gap-x-6"
            >
              <div className="">
                <img className="w-20" src={item.image} alt="" />
              </div>
              <div className="rb-bold ">
                <p>{item.name}</p>
                <p className="my-2 ">
                  {item.retail_price || item.price} {item.currency || "$"}
                </p>
                <p>QTY {item.quantity || 1}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="border-b border-white pb-4">
        <p className="text-white text-lg rb-bold mt-4 mb-2 uppercase">
          Order summary
        </p>

        <div className="mt-3">
          <span className="flex items-center justify-between text-[#ddd]">
            <p>Subtotal</p>
            <p>{subtotal}$</p>
          </span>
          <span className="flex items-center justify-between text-[#ddd]">
            <p>Tax Vat</p>
            {isLocalCartMode ? (
              <p className="text-sm italic">Calculated upon confirmation</p>
            ) : (
              <p>
                {Number(cart?.invoice_details?.[0]?.amount_tax || 0).toFixed(2)}
                $
              </p>
            )}
          </span>
          <span className="flex items-center justify-between text-[#ddd]">
            <p>Delivery Charge</p>
            <p>0$</p>
          </span>
          <span className="flex items-center justify-between text-[#ddd]">
            <p>Mounting Charge</p>
            <p>0$</p>
          </span>
        </div>
      </div>

      <div className="pb-4">
        <span className="flex items-center justify-between">
          <p className="text-white text-xl rb-bold mt-4 mb-2 uppercase">
            Total
          </p>
          <p className="text-white text-xl rb-bold mt-4 mb-2">
            {total}$
            {isLocalCartMode && (
              <span className="text-xs ml-1 font-normal">(excl. VAT)</span>
            )}
          </p>
        </span>

        <div className="mt-6 w-full flex-col flex gap-3">
          {isProcessing ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              <MainButton onClick={handlePayNow} isSmall={true}>
                Pay Now
              </MainButton>

              {showCashOnDelivery && (
                <MainButton
                  onClick={handleCashOnDelivery}
                  isSmall={true}
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  Cash On Delivery
                </MainButton>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSummury;
