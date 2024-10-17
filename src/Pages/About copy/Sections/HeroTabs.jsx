import React from "react";
import Container from "Components/Container/Container";
const HeroTabs = ({ activeTabs, onSelectingTabs }) => {
  const aboutTabs = [
    {
      id: 1,
      name: "Brand overview",
    },
    {
      id: 2,
      name: "Mission and vision",
    },
    {
      id: 3,
      name: "Why Us",
    },
    {
      id: 4,
      name: "Distribution channels",
    },
  ];

  return (
    <section className="pt-secondary lg:pt-primary">
      <Container>
        <div>
          <h1 className="text-4xl rb-bold text-center">About us</h1>
        </div>

        <div className="bg-dark text-white flex lg:items-center lg:justify-center   gap-x-16 my-10 lg:mt-14 overflow-scroll lg:overflow-hidden">
          {aboutTabs.map(({ id, name }, index) => (
            <button
              onClick={() => onSelectingTabs(id)}
              className={`min-w-[200px] lg:min-w-[auto] rb-bold uppercase text-sm  py-4 px-8 transition ease-in duration ${
                activeTabs === id ? "bg-white text-primary underline " : ""
              }`}
              key={index}
            >
              {name}
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HeroTabs;
