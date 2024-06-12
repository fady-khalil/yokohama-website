import Container from "Components/Container/Container";
import React from "react";
import heroImage from "assests/hero.jpg";
import MainButton from "Components/Buttons/MainButton";
import WhiteButton from "Components/Buttons/WhiteButton";
const Hero = () => {
  return (
    <section
      className="bg-cover bg-center h-[90vh] relative z-[10] overflow-hidden"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {" "}
      <div className="absolute top-0 left-0 w-full h-full bg-[#00000044] z-[-1]"></div>
      <Container className={"h-full"}>
        <div className="flex flex-col items-center justify-center h-full gap-y-14 w-[70%] mx-auto">
          <div>
            <h1 className="rb-bold text-white text-5xl text-center mb-2">
              Hello User Name
            </h1>
            <p className="rb-bold text-white text-3xl text-center">
              You have 100 points in your account
            </p>
          </div>
          <div className="flex items-center gap-x-6">
            <MainButton>Shop Your Products</MainButton>
            <WhiteButton>Redeem your products</WhiteButton>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
