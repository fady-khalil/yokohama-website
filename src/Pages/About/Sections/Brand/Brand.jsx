import aboutData from "Constant/About";
import bg from "assests/about/Brand/bg3.jpg";
// inner
import Hero from "./Sections/Hero";
import Feature from "./Sections/Feature";
import Celebrating from "./Sections/Celebrating";
import Brands from "Pages/Home/Sections/Brands/Brands";
import OurClients from "./Sections/OurClients";
import Content from "./Sections/Content";

import { useEffect, useState } from "react";
import useGetData from "Hooks/Fetching/useGetData";
import IsLoading from "Components/RequestHandler/IsLoading";
import IsError from "Components/RequestHandler/IsError";

const Brand = ({ hero, statics, story, content }) => {
  const { fetchData, error } = useGetData();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await fetchData(`yokohama/content/brand_overview`);
      setData(result?.data[0]);
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
    <section>
      <Hero data={data?.hero} />
      <Feature data={data?.statistics_ids} />
      <div
        className="brand-bg py-mega "
        style={{ backgroundImage: `url(${bg})` }}
      >
        <Celebrating data={data?.story_ids} />
        <Brands noSpace={true} />
      </div>
      <OurClients data={aboutData.brand.ourClients} />
      <Content data={data?.content_ids} />
    </section>
  );
};

export default Brand;
