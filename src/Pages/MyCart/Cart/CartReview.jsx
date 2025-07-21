import React, { useContext } from "react";
import Container from "Components/Container/Container";
import { UserCartContext } from "context/User/CartContext";
import { UserLoginContext } from "context/Auth/UserLoginContext";
import CartItem from "../Components/CartItem"; // <-- Make sure this path is correct
import Spinner from "Components/RequestHandler/Spinner";

const CartReview = ({
  onSelectingTabs,
  onCashOnDelivery,
  onPayNow,
  showCashOption = true,
}) => {
  const { userIsSignIn } = useContext(UserLoginContext);
  const { cart, cartSummary, isLoading, hasOdooCart } =
    useContext(UserCartContext);

  const cartItems = Array.isArray(cart) ? cart : [];

  // Helper functions for cart calculations when not using Odoo cart
  const calculateSubtotal = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.price || 0);
        const quantity = parseInt(item.quantity || 1);
        return total + price * quantity;
      }, 0)
      .toFixed(2);
  };

  const calculateTax = () => {
    // Fixed tax rate of 11%
    const TAX_RATE = 0.11;

    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.price || 0);
        const quantity = parseInt(item.quantity || 1);
        // Use fixed tax rate instead of item.tax_rate
        return total + price * quantity * TAX_RATE;
      }, 0)
      .toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const tax = parseFloat(calculateTax());
    return (subtotal + tax).toFixed(2);
  };

  // Get currency from Odoo or use default
  const currency = cartSummary?.[0]?.currency || "USD";

  // Empty cart state
  if (!isLoading && cartItems.length === 0) {
    return (
      <Container className="py-primary">
        <div className="text-center py-24">
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-gray-500">
            Browse our products and discover our best deals!
          </p>
        </div>
      </Container>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <Container className="py-primary ">
        <div className="text-center py-24  flex flex-col utem justify-center items-center">
          <Spinner size="large" />
          <p>Loading your cart...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-primary">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-[3] mb-24">
          <h2 className="text-2xl font-medium mb-2">Shopping Cart</h2>
          {hasOdooCart && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded-md shadow-sm">
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500 mr-3 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="font-medium text-blue-800">
                    Your order is being processed
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    You can still modify your cart. Or pay now and close the
                    deal. <br /> Our team will contact you shortly to finalize
                    your order.
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id || item.product_id} product={item} />
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="flex-[1]">
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-medium mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>
                  {hasOdooCart
                    ? cartSummary?.[0]?.untaxed_amount_total
                    : calculateSubtotal()}{" "}
                  {currency}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>
                  {hasOdooCart
                    ? cartSummary?.[0]?.amount_tax || 0
                    : calculateTax()}{" "}
                  {currency}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>0 {currency}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                <span>Total:</span>
                <span>
                  {hasOdooCart
                    ? cartSummary?.[0]?.amount_total
                    : calculateTotal()}{" "}
                  {currency}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <button
                onClick={onPayNow}
                className="w-full py-3 bg-primary text-white rounded font-medium"
              >
                {userIsSignIn ? "Pay Now" : "Sign In to Continue"}
              </button>

              {/* Only show Cash on Delivery if applicable */}
              {showCashOption && (
                <button
                  onClick={onCashOnDelivery}
                  className="w-full py-3 border border-gray-300 rounded font-medium"
                >
                  Cash on Delivery
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CartReview;
