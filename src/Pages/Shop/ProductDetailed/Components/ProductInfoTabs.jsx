import React from "react";
import Container from "Components/Container/Container";

const ProductInfoTabs = ({ activeTabs, onTabClick, data }) => {
  const accountTabs = [
    {
      id: 1,
      name: data?.description_sale?.title ? "Description" : null,
    },
    {
      id: 2,
      name: data?.specs?.title ? "Specs" : null,
    },
    {
      id: 3,
      name: data?.size_info?.length > 0 ? "Size Info" : null,
    },
    {
      id: 4,
      name: "Gallery",
    },
    {
      id: 5,
      name: data?.warranty ? "Warranty" : null,
    },
    {
      id: 6,
      name: "Reviews",
    },
  ];

  // Filter out tabs that have a null name
  const filteredTabs = accountTabs.filter((tab) => tab.name !== null);

  return (
    <section className="my-10 lg:mt-14 sticky-tabs z-[1000]">
      <Container>
        <div className="bg-[#efefef] relative z-[10000] rb-bold flex lg:items-center lg:justify-center gap-x-16 overflow-scroll lg:overflow-hidden">
          {filteredTabs.map(({ id, name }, index) => (
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
