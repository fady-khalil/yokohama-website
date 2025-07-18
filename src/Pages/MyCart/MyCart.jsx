import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartTabs from "./Components/CartTabs";
import CartReview from "./Cart/CartReview";
import ShippingAndPayment from "./ShippingAndBilling/ShippingAndPayment";
import Receipt from "./Receipt/Reciept"; // <-- Make sure this path is correct
import { UserCartContext } from "context/User/CartContext";
import { UserLoginContext } from "context/Auth/UserLoginContext";

const MyCart = () => {
  const navigate = useNavigate();
  const [selectedTabs, setSelectedTabs] = useState(1);
  const [shippingId, setShippingId] = useState();
  const { userIsSignIn } = useContext(UserLoginContext);
  const { hasOdooCart, transferCartToOdoo, cart, isLoading } =
    useContext(UserCartContext);

  // Handle cash on delivery flow
  const handleCashOnDelivery = async () => {
    if (!userIsSignIn) {
      // User must be signed in for COD
      navigate("/auth/login?redirect=my-cart");
      return;
    }

    // Transfer local cart to Odoo and redirect to home
    const success = await transferCartToOdoo();
    if (success) {
      navigate("/");
    }
  };

  // Handle pay now flow
  const handlePayNow = async () => {
    if (!userIsSignIn) {
      // User must be signed in for payment
      navigate("/auth/login?redirect=my-cart");
      return;
    }

    // Transfer local cart to Odoo and move to shipping page
    const success = await transferCartToOdoo();
    if (success) {
      setSelectedTabs(2);
    }
  };

  // Get shipping address ID for receipt stage
  const getShippingAddressId = (id) => {
    setShippingId(id);
  };

  // Determine if user can access specific tabs
  const canAccessShipping =
    userIsSignIn && (hasOdooCart || (cart && cart.length > 0));
  const canAccessReceipt = canAccessShipping && shippingId;

  // Handle tab navigation with validation
  const handleTabChange = (tabId) => {
    if (tabId === 2 && !canAccessShipping) return;
    if (tabId === 3 && !canAccessReceipt) return;
    setSelectedTabs(tabId);
  };

  // Determine which component to render based on selected tab
  const renderTabContent = () => {
    switch (selectedTabs) {
      case 1:
        return (
          <CartReview
            onSelectingTabs={setSelectedTabs}
            onCashOnDelivery={handleCashOnDelivery}
            onPayNow={handlePayNow}
            showCashOption={!hasOdooCart}
          />
        );
      case 2:
        return (
          <ShippingAndPayment
            onSelectingTabs={setSelectedTabs}
            getShippingAddressId={getShippingAddressId}
          />
        );
      case 3:
        return (
          <Receipt onSelectingTabs={setSelectedTabs} shippingId={shippingId} />
        );
      default:
        return <CartReview onSelectingTabs={setSelectedTabs} />;
    }
  };

  return (
    <section>
      <CartTabs activeTabs={selectedTabs} onSelectingTabs={handleTabChange} />
      {renderTabContent()}
    </section>
  );
};

export default MyCart;
