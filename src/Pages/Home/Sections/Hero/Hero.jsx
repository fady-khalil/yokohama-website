import Container from "Components/Container/Container";
import React from "react";
import MainButton from "Components/Buttons/MainButton";
import WhiteButton from "Components/Buttons/WhiteButton";
import heroImage from "assests/hero.jpg";
const Hero = () => {
  return (
    <section
      className="bg-cover bg-center h-[100vh] relative z-[10] border-b border-primary"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[#00000044] z-[-1]"></div>
      <Container className={"h-full"}>
        <div className="flex flex-col items-center justify-center h-full gap-y-14 w-[70%] mx-auto">
          <h1 className="rb-bold text-white text-5xl text-center">
            WE BRING YOU PERFORMANCE YOU'VE BEEN DREAMING OF, ON AND OFF THE
            TRACK
          </h1>
          <div className="flex items-center gap-x-6">
            <MainButton>Shop Yokohama Tires</MainButton>
            <WhiteButton>Learn More</WhiteButton>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
