import React from "react";
import Container from "Components/Container/Container";
import { CaretLeft } from "@phosphor-icons/react";

const ShopTabs = ({ activeTabs, onSelectingTabs, tabs }) => {
  return (
    <section className="pt-primary">
      <Container>
        <div className="flex flex-col md:flex-row items-center md:justify-center gap-4 md:gap-x-4 md:mr-10">
          <button
            onClick={() => window.history.back()}
            className="text-2xl md:text-3xl p-1 rb-bold text-center rounded-lg"
          >
            <CaretLeft />
          </button>
          <h1 className="text-2xl md:text-4xl rb-bold text-center">
            Shop Products
          </h1>
        </div>

        <div className="bg-dark text-white flex flex-wrap items-center justify-center gap-2 md:gap-x-16 mt-8 md:mt-14 px-2 py-2 md:py-0">
          {tabs?.map(({ id, name }, index) => (
            <button
              onClick={() => onSelectingTabs(id)}
              className={`rb-bold uppercase text-xs md:text-sm py-2 md:py-4 px-4 md:px-8 transition ease-in duration ${
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

export default ShopTabs;
