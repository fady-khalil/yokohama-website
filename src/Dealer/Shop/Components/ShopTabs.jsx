import React from "react";
import Container from "Components/Container/Container";
const ShopTabs = ({ activeTabs, onSelectingTabs, tabs }) => {
  return (
    <section className="pt-primary">
      <Container>
        <div>
          <h1 className="text-4xl rb-bold text-center">Shop Products</h1>
        </div>

        <div className="bg-dark text-white flex items-center justify-center gap-x-16 mt-14">
          {tabs?.map(({ id, name }, index) => (
            <button
              onClick={() => onSelectingTabs(id)}
              className={`rb-bold uppercase text-sm  py-4 px-8 transition ease-in duration ${
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

export default ShopTabs;
