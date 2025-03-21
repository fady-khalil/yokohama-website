import { useState, useEffect } from "react";
import ShopTabs from "./Components/ShopTabs";
import ShopLanding from "./Components/ShopLanding";
import dealerTiresProductData from "Constant/DealerProduct";

// fetching data
import useGetData from "Hooks/Fetching/useGetData";
import Spinner from "Components/RequestHandler/Spinner";

const Shop = () => {
  const [selectedTabs, setSelectedTabs] = useState(null);
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
      // Set the initial selected tab to the first tab's ID
      if (data?.data?.length > 0) {
        setSelectedTabs(data.data[0].id);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-32 h-[100vh]">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

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
