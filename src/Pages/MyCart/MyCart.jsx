import { useState, useEffect } from "react";
import CartTabs from "./Components/CartTabs";
import CartReview from "./Components/CartReview";
import ShippingAndPayment from "./Components/ShippingAndPayment";
import Reciept from "./Components/Reciept";

const MyCart = ({ onSelectingTabs, activeTabs }) => {
  const [selectedTabs, setSelectedTabs] = useState(1);

  const selectedTabsHandler = (id) => {
    setSelectedTabs(id);
  };

  const [selectedComponent, setSelectedComponent] = useState(<CartReview />);

  const components = [
    {
      id: 1,
      component: <CartReview />,
    },
    {
      id: 2,
      component: <ShippingAndPayment />,
    },
    {
      id: 3,
      component: <Reciept />,
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
