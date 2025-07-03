import { useContext, useState, useMemo } from "react";
import MainButton from "Components/Buttons/MainButton";
import { UserCartContext } from "context/User/CartContext";
import { UserLoginContext } from "context/Auth/UserLoginContext";
import Spinner from "Components/RequestHandler/Spinner";

const CartSummury = ({ onSelectingTabs, isShipping }) => {
  const {
    cart,
    setCart,
    transferCartToOdoo,
    clearCart,
    getCartSummary,
    setCartModeToOdoo,
    fetchOdooCart,
    cartMode,
  } = useContext(UserCartContext);

  const { userIsSignIn } = useContext(UserLoginContext);
  const [isProcessing, setIsProcessing] = useState(false);

  // Get cart summary information
  const { itemCount, subtotal } = getCartSummary();

  // Calculate total (same as subtotal for localStorage cart since VAT will be calculated on server)
  const total = subtotal;

  // Handle both localStorage array format and Odoo object format
  const cartItems = Array.isArray(cart) ? cart : cart?.cart_items || [];

  // Show both options when cart has items
  const showCheckoutOptions = cartItems.length > 0;

  const handlePayNow = async () => {
    if (!userIsSignIn) {
      alert("Please sign in to continue with checkout.");
      return;
    }

    setIsProcessing(true);

    try {
      // Check if cart is already in ODOO_ACTIVE mode
      if (cartMode === "odoo_active") {
        console.log(
          "Cart is already in ODOO_ACTIVE mode - proceeding directly to shipping"
        );
        // Items are already in Odoo, proceed directly to shipping
        onSelectingTabs(2);
        return;
      }

      console.log("Starting Pay Now flow - transferring cart to Odoo");

      const transferResult = await transferCartToOdoo();

      if (!transferResult.success) {
        console.error("Failed to transfer cart to Odoo");

        // Check if user is still signed in after the failed transfer
        if (!userIsSignIn) {
          alert(
            "Your session has expired. Please sign in again to continue with your order."
          );
          setIsProcessing(false);
          return;
        }

        alert(
          "Failed to process your cart. Please try again or contact support."
        );
        setIsProcessing(false);
        return;
      }

      console.log(
        `✅ Successfully transferred ${transferResult.transferredCount} items to Odoo`
      );

      // Clear localStorage cart after successful transfer
      clearCart();

      // Proceed to shipping address page
      onSelectingTabs(2);
    } catch (error) {
      console.error("Error in Pay Now flow:", error);
      alert("An error occurred while processing your order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCashOnDelivery = async () => {
    if (!userIsSignIn) {
      alert("Please sign in to continue with checkout.");
      return;
    }

    setIsProcessing(true);

    try {
      console.log("Starting Cash on Delivery flow - transferring cart to Odoo");

      const transferResult = await transferCartToOdoo();

      if (!transferResult.success) {
        console.error("Failed to transfer cart to Odoo");

        // Check if user is still signed in after the failed transfer
        if (!userIsSignIn) {
          alert(
            "Your session has expired. Please sign in again to continue with your order."
          );
          setIsProcessing(false);
          return;
        }

        alert(
          "Failed to process your cart. Please try again or contact support."
        );
        setIsProcessing(false);
        return;
      }

      console.log(
        `✅ Successfully transferred ${transferResult.transferredCount} items to Odoo for Cash on Delivery`
      );

      // Clear localStorage cart (items are now in Odoo)
      localStorage.removeItem("yokohama_cart");

      // Set cart mode to ODOO_ACTIVE so new items go directly to Odoo
      setCartModeToOdoo();

      // Refresh cart to show items from Odoo instead of clearing it
      const updatedCartData = await fetchOdooCart();
      setCart(updatedCartData);

      // Show success message briefly, then keep cart open for continued shopping
      alert(
        "Order placed successfully! Your cart is now ready for new items that will be processed immediately."
      );

      // Keep cart open - don't redirect, don't show success screen
    } catch (error) {
      console.error("Error in Cash on Delivery flow:", error);
      alert("An error occurred while processing your order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex-1 h-fit lg:sticky lg:top-10 bg-dark border-t-4 border-primary p-6">
      {/* Display cart items */}
      {cartItems.length > 0 && (
        <div className="border-b border-white pb-4">
          {cartItems.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-white flex-col items-center sm:flex-row gap-y-2 flex p-2 mb-3 gap-x-6"
            >
              <div className="">
                <img className="w-20" src={item.image} alt={item.name} />
              </div>
              <div className="rb-bold ">
                <p>{item.name}</p>
                <p className="my-2 ">
                  {item.retail_price || item.price} {item.currency || "$"}
                </p>
                <p>
                  QTY{" "}
                  {typeof item.quantity === "object"
                    ? item.quantity?.free_quantity || 1
                    : item.quantity || 1}
                </p>
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
            <p>${subtotal}</p>
          </span>
          <span className="flex items-center justify-between text-[#ddd]">
            <p>Tax Vat</p>
            <p className="text-sm italic">Calculated upon confirmation</p>
          </span>
          <span className="flex items-center justify-between text-[#ddd]">
            <p>Delivery Charge</p>
            <p>$0</p>
          </span>
          <span className="flex items-center justify-between text-[#ddd]">
            <p>Mounting Charge</p>
            <p>$0</p>
          </span>
        </div>
      </div>

      <div className="pb-4">
        <span className="flex items-center justify-between">
          <p className="text-white text-xl rb-bold mt-4 mb-2 uppercase">
            Total
          </p>
          <p className="text-white text-xl rb-bold mt-4 mb-2">
            ${total}
            <span className="text-xs ml-1 font-normal">(excl. VAT)</span>
          </p>
        </span>

        <div className="mt-6 w-full flex-col flex gap-3">
          {isProcessing ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : showCheckoutOptions ? (
            <>
              <MainButton onClick={handlePayNow} isSmall={true}>
                Pay Now
              </MainButton>

              {/* Only show Cash on Delivery when NOT in ODOO_ACTIVE mode */}
              {cartMode !== "odoo_active" && (
                <MainButton
                  onClick={handleCashOnDelivery}
                  isSmall={true}
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  Cash On Delivery
                </MainButton>
              )}
            </>
          ) : (
            <div className="text-center text-white">
              <p>Your cart is empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSummury;
