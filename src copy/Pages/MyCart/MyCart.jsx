import { useState, useEffect, useContext } from "react";
import CartTabs from "./Components/CartTabs";
import CartReview from "./Cart/CartReview";
import ShippingAndPayment from "./ShippingAndBilling/ShippingAndPayment";
import Reciept from "./Receipt/Reciept";

const MyCart = () => {
  const [selectedTabs, setSelectedTabs] = useState(1);
  const selectedTabsHandler = (id) => {
    setSelectedTabs(id);
  };
  const [selectedComponent, setSelectedComponent] = useState(<CartReview />);

  // confirm swicth
  const [shippingId, setShippingId] = useState();
  const getShippingAddressId = (shippingId) => {
    setShippingId(shippingId);
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
      <CartTabs
        activeTabs={selectedTabs}
        onSelectingTabs={selectedTabsHandler}
      />
      {selectedComponent}
    </section>
  );
};

export default MyCart;
