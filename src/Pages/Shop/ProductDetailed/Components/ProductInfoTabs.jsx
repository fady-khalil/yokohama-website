import React from "react";
import Container from "Components/Container/Container";

const ProductInfoTabs = ({ activeTabs, onTabClick }) => {
  const accountTabs = [
    {
      id: 1,
      name: "Description",
    },
    {
      id: 2,
      name: "Specs",
    },
    {
      id: 3,
      name: "Size Info",
    },
    {
      id: 4,
      name: "Gallery",
    },
    {
      id: 5,
      name: "Warranty",
    },
    {
      id: 6,
      name: "Reviews",
    },
  ];

  return (
    <section className="my-10 lg:mt-14 sticky-tabs">
      <Container>
        <div className="bg-[#efefef] rb-bold flex lg:items-center lg:justify-center gap-x-16  overflow-scroll lg:overflow-hidden">
          {accountTabs.map(({ id, name }, index) => (
            <button
              onClick={() => onTabClick(id)}
              className={`rb-bold min-w-[200px] lg:min-w-[auto] uppercase text-sm py-6 px-8 transition ease-in duration ${
                activeTabs === id ? "bg-white text-primary underline" : ""
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

export default ProductInfoTabs;
