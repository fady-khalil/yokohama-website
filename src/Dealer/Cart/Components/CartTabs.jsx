import React from "react";
import Container from "Components/Container/Container";

const CartTabs = ({ onSelectingTabs, activeTabs }) => {
  const accountTabs = [
    {
      id: 1,
      name: "Cart Review",
    },
    {
      id: 2,
      name: "Shipping & Payment",
    },
    {
      id: 3,
      name: "Receipt",
    },
  ];

  return (
    <section className="lg:pt-primary">
      <Container>
        <div>
          <h1 className="text-4xl rb-bold lg:text-center">Your Cart</h1>
        </div>

        <div className="bg-dark text-white flex lg:items-center lg:justify-center   gap-x-16 my-10 lg:mt-14 overflow-scroll lg:overflow-hidden">
          {accountTabs.map(({ id, name }, index) => (
            <button
              onClick={() => onSelectingTabs(id)}
              className={`rb-bold min-w-[200px] lg:min-w-[auto] uppercase text-sm  py-4 px-8 transition ease-in duration ${
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

export default CartTabs;
