import { useEffect, useState } from "react";
// inner
import HeroTabs from "./Sections/HeroTabs";
import Brand from "./Sections/Brand/Brand";
import MissionAndVission from "./Sections/Mission/MissionAndVission";
import WhyUs from "./Sections/WhyUs/WhyUs";
import Channels from "./Sections/Channels/Channels";
import useGetData from "Hooks/Fetching/useGetData";
import IsLoading from "Components/RequestHandler/IsLoading";
import IsError from "Components/RequestHandler/IsError";

const About = () => {
  // fetch data
  const { fetchData, error } = useGetData();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await fetchData(`yokohama/content/AboutUs`);
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

  const [selectedTabs, setSelectedTabs] = useState(1);
  const selectedTabsHandler = (id) => {
    setSelectedTabs(id);
  };
  const [selectedComponent, setSelectedComponent] = useState(
    <Brand
      hero={{
        title: data?.hero_title,
        text: data?.hero_Text,
      }}
      story={data?.story_ids}
      statics={data?.statistics_ids}
      content={data?.content_ids}
    />
  );
  const components = [
    {
      id: 1,
      component: (
        <Brand
          hero={{
            // title: data?.hero_title,
            text: data?.hero_Text,
          }}
          story={data?.story_ids}
          statics={data?.statistics_ids}
          content={data?.content_ids}
        />
      ),
    },
    {
      id: 2,
      component: <MissionAndVission data={data?.mission_ids} />,
    },
    {
      id: 3,
      component: <WhyUs data={data?.why_us} />,
    },
    {
      id: 4,
      component: <Channels data={data?.distributionchannels_ids} />,
    },
  ];

  useEffect(() => {
    const activeComponent = components.find((comp) => comp.id === selectedTabs);

    setSelectedComponent(activeComponent ? activeComponent.component : null);
  }, [selectedTabs]);

  if (isLoading) return <IsLoading />;
  if (error) return <IsError />;
  if (data) {
    return (
      <main>
        {/* <HeroTabs
          activeTabs={selectedTabs}
          onSelectingTabs={selectedTabsHandler}
        />

        {selectedComponent} */}
      </main>
    );
  }
};

export default About;
