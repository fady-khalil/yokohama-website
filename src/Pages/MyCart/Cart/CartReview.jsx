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
  const { cart, cartSummary, isLoading } = useContext(UserCartContext);

  const cartItems = Array.isArray(cart) ? cart : [];

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
          <p className="text-red-600">
            Your order is now being processed. You can still add or modify your
            products. Our team will contact you shortly to move forward.{" "}
          </p>
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
                  {cartSummary?.[0]?.untaxed_amount_total}{" "}
                  {cartSummary?.[0]?.currency || "USD"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>
                  {cartSummary?.[0]?.amount_tax || 0}{" "}
                  {cartSummary?.[0]?.currency || "USD"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>0 {cartSummary?.[0]?.currency || "USD"}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                <span>Total:</span>
                <span>
                  {cartSummary?.[0]?.amount_total}{" "}
                  {cartSummary?.[0]?.currency || "USD"}
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
