import { useEffect, useState } from "react";
import AccountsTabs from "./Sections/AccountsTabs";

import OrderHistory from "./Sections/OrderHistory/OrderHistory";
import EditAccounts from "./Sections/EditAccounts/EditAccounts";
import AddressBook from "./Sections/AddressBook/AddressBook";
import Wishlist from "./Sections/Wishlist/Wishlist";
import Logout from "./Sections/Logout/Logout";
const Account = () => {
  const [selectedTabs, setSelectedTabs] = useState(1);

  const selectedTabsHandler = (id) => {
    setSelectedTabs(id);
  };

  const [selectedComponent, setSelectedComponent] = useState(<EditAccounts />);

  const components = [
    {
      id: 1,
      component: <EditAccounts />,
    },
    {
      id: 2,
      component: <OrderHistory />,
    },
    {
      id: 3,
      component: <AddressBook />,
    },
    {
      id: 4,
      component: <Wishlist />,
    },
    {
      id: 5,
      component: <Logout />,
    },
  ];

  useEffect(() => {
    const activeComponent = components.find((comp) => comp.id === selectedTabs);

    setSelectedComponent(activeComponent ? activeComponent.component : null);
  }, [selectedTabs]);
  return (
    <main>
      <div className="">
        <AccountsTabs
          activeTabs={selectedTabs}
          onSelectingTabs={selectedTabsHandler}
        />
        {selectedComponent}
      </div>
    </main>
  );
};

export default Account;
