import Container from "Components/Container/Container";
import React from "react";
import MainButton from "Components/Buttons/MainButton";

const About = ({ data }) => {
  return (
    <div className="bg-dark">
      <Container>
        <section
          className="bg-cover  bg-center py-superMega relative z-[10]"
          style={{ backgroundImage: `url(${data?.[0].image})` }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[#00000061] z-[-1]"></div>
          <div className="flex flex-col items-center justify-center text-white lg:w-[50%] mx-auto text-center">
            <h4 className="text-4xl lg:text-5xl mb-4 rb-bold">
              {data?.[0]?.title}
            </h4>
            <p className="text-xl mb-8">{data?.[0]?.text}</p>

            <MainButton to={"/brand_overview"}>Learn More</MainButton>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default About;
