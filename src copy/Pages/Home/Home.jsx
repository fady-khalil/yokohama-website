import { useEffect, useState } from "react";
// sections
import Hero from "./Sections/Hero/Hero";
import SearchTires from "./Sections/SearchTires/SearchTires";
import About from "./Sections/About/About";
import Brands from "./Sections/Brands/Brands";
import Shop from "./Sections/Shop/Shop";
import Offer from "./Sections/Offer/Offer";
import BestSeller from "./Sections/BestSeller/BestSeller";
import Oil from "./Sections/Oil/Oil";
import useGetData from "Hooks/Fetching/useGetData";
import IsLoading from "Components/RequestHandler/IsLoading";
import IsError from "Components/RequestHandler/IsError";

const Home = () => {
  const { fetchData, error } = useGetData();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await fetchData(`home`);
      setData(result?.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) return <IsLoading />;
  if (error) return <IsError />;
  if (data) {
    return (
      <main>
        <Hero data={data?.banner} />
        <Brands data={data?.brand_logo} />

        <SearchTires />

        <About data={data?.home_about_us} />

        <Shop />

        <Offer data={data?.special_offer} />

        <BestSeller />

        <Oil data={data?.essentials_for_your_vehicle} />
      </main>
    );
  }
};

export default Home;
