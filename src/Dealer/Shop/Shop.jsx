import { useState, useEffect } from "react";
import ShopTabs from "./Components/ShopTabs";
import ShopLanding from "./Components/ShopLanding";
import dealerTiresProductData from "Constant/DealerProduct";

// fetching data
import useGetData from "Hooks/Fetching/useGetData";
import Spinner from "Components/RequestHandler/Spinner";

const Shop = () => {
  const [selectedTabs, setSelectedTabs] = useState(1);
  const selectedTabsHandler = (id) => {
    setSelectedTabs(id);
  };

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { fetchData, error } = useGetData();

  const getData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await fetchData("yokohama/ctegories/all");
      setData(data?.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <ShopTabs
        tabs={data}
        onSelectingTabs={selectedTabsHandler}
        activeTabs={selectedTabs}
      />
      <ShopLanding selectedId={selectedTabs} data={dealerTiresProductData} />
    </main>
  );
};

export default Shop;
