import { useState, useEffect, useContext } from "react";
import CartTabs from "./Components/CartTabs";
import CartReview from "./Cart/CartReview";
import ShippingAndPayment from "./ShippingAndBilling/ShippingAndPayment";
import Reciept from "./Receipt/Reciept";
import { UserCartContext } from "context/User/CartContext";
import { UserLoginContext } from "context/Auth/UserLoginContext";

const MyCart = () => {
  const [selectedTabs, setSelectedTabs] = useState(1);
  const { hasExistingOdooCart } = useContext(UserCartContext);
  const { userIsSignIn } = useContext(UserLoginContext);

  const selectedTabsHandler = (id) => {
    setSelectedTabs(id);
  };
  const [selectedComponent, setSelectedComponent] = useState(<CartReview />);

  // confirm swicth
  const [shippingId, setShippingId] = useState();
  const getShippingAddressId = (shippingId) => {
    setShippingId(shippingId);
  };

  // Determine if user should be able to navigate to specific tabs
  const canAccessShipping = userIsSignIn || hasExistingOdooCart;
  const canAccessReceipt = canAccessShipping && shippingId;

  const handleTabChange = (tabId) => {
    // Only allow tab navigation based on conditions
    if (tabId === 2 && !canAccessShipping) {
      return; // Don't allow navigation to shipping if not signed in without existing cart
    }

    if (tabId === 3 && !canAccessReceipt) {
      return; // Don't allow navigation to receipt without shipping info
    }

    selectedTabsHandler(tabId);
  };

  const components = [
    {
      id: 1,
      component: <CartReview onSelectingTabs={selectedTabsHandler} />,
    },
    {
      id: 2,
      component: (
        <ShippingAndPayment
          onSelectingTabs={selectedTabsHandler}
          getShippingAddressId={getShippingAddressId}
        />
      ),
    },
    {
      id: 3,
      component: (
        <Reciept
          onSelectingTabs={selectedTabsHandler}
          shippingId={shippingId}
        />
      ),
    },
  ];

  useEffect(() => {
    const activeComponent = components.find((comp) => comp.id === selectedTabs);
    setSelectedComponent(activeComponent ? activeComponent.component : null);
  }, [selectedTabs]);

  return (
    <section className="">
      <CartTabs activeTabs={selectedTabs} onSelectingTabs={handleTabChange} />
      {selectedComponent}
    </section>
  );
};

export default MyCart;
