import Container from "Components/Container/Container";
import React from "react";
import heroBrand from "assests/about/Brand/about.jpg";

const Hero = ({ data }) => {
  return (
    <section
      className="h-[75vh] brand-bg relative z-[100]"
      style={{ backgroundImage: `url(${heroBrand})` }}
    >
      <Container className={"h-full"}>
        <div className="py-secondary h-full flex flex-col items-center justify-center lg:w-1/2 mx-auto">
          <h2 className="rb-bold text-4xl lg:text-5xl mb-4">{data?.title}</h2>
          <p className="rb-medium">{data?.text}</p>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
