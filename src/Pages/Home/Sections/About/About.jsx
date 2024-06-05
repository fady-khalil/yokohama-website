import Container from "Components/Container/Container";
import React from "react";
import MainButton from "Components/Buttons/MainButton";
import bgImage from "assests/about-us.jpg";

const About = () => {
  return (
    <section
      className="bg-cover bg-center py-superMega relative z-[10]"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[#00000061] z-[-1]"></div>
      <Container className={"h-full"}>
        <div className="flex flex-col items-center justify-center text-white w-[50%] mx-auto text-center">
          <h4 className="text-5xl mb-4 rb-bold"> Leading company since 2005</h4>
          <p className="text-xl mb-8">
            Yokohama team is dedicated to provide the most friendly and
            professional service to our customers and offer them constantly the
            excellent quality tires adequate to the Lebanese roads and weather
            conditions.
          </p>

          <MainButton>About us</MainButton>
        </div>
      </Container>
    </section>
  );
};

export default About;
