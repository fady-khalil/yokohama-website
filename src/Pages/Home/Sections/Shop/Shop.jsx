import React from "react";
import MainButton from "Components/Buttons/MainButton";
import Container from "Components/Container/Container";
import tiresImage from "assests/tires-shop.jpg";
import batteryImage from "assests/battery-shop.jpg";
import lubriInage from "assests/lubri-shop.jpg";
const Shop = () => {
  const data = [
    {
      image: tiresImage,
      name: "TIRES",
      path: "",
    },
    {
      image: batteryImage,
      name: "BATTERIES",
      path: "",
    },
    {
      image: lubriInage,
      name: "LUBRICANTS",
      path: "",
    },
  ];
  return (
    <section className="bg-dark pt-x pb-mega">
      <Container>
        <div className="flex flex-col lg:flex-row gap-6">
          {data.map((item, index) => (
            <div
              className="flex-1 shop-bg py-20 lg:py-40 px-24 flex items-center justify-center"
              style={{ backgroundImage: `url(${item.image})` }}
              key={index}
            >
              <MainButton to={"/shop"}>{item.name}</MainButton>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Shop;
