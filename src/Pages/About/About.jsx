import { useEffect, useState } from "react";
// inner
import HeroTabs from "./Sections/HeroTabs";
import Brand from "./Sections/Brand/Brand";
import MissionAndVission from "./Sections/Mission/MissionAndVission";
import WhyUs from "./Sections/WhyUs/WhyUs";
import Channels from "./Sections/Channels/Channels";

const About = () => {
  const [selectedTabs, setSelectedTabs] = useState(1);

  const selectedTabsHandler = (id) => {
    setSelectedTabs(id);
  };

  const [selectedComponent, setSelectedComponent] = useState(<Brand />);

  const components = [
    {
      id: 1,
      component: <Brand />,
    },
    {
      id: 2,
      component: <MissionAndVission />,
    },
    {
      id: 3,
      component: <WhyUs />,
    },
    {
      id: 4,
      component: <Channels />,
    },
  ];

  useEffect(() => {
    const activeComponent = components.find((comp) => comp.id === selectedTabs);

    setSelectedComponent(activeComponent ? activeComponent.component : null);
  }, [selectedTabs]);

  return (
    <main>
      <HeroTabs
        activeTabs={selectedTabs}
        onSelectingTabs={selectedTabsHandler}
      />
      {selectedComponent}
    </main>
  );
};

export default About;
