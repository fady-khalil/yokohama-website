import { useState } from "react";
import ShopTabs from "./Components/ShopTabs";
import ShopLanding from "./Components/ShopLanding";
import dealerTiresProductData from "Constant/DealerProduct";

const Shop = () => {
  const [selectedTabs, setSelectedTabs] = useState(1);

  const selectedTabsHandler = (id) => {
    setSelectedTabs(id);
  };
  return (
    <main>
      <ShopTabs
        onSelectingTabs={selectedTabsHandler}
        activeTabs={selectedTabs}
      />
      <ShopLanding data={dealerTiresProductData} />
    </main>
  );
};

export default Shop;
