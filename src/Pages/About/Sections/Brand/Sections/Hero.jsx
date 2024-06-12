import Container from "Components/Container/Container";
import React from "react";

const Hero = ({ data }) => {
  return (
    <section
      className="h-[75vh] brand-bg relative z-[100]"
      style={{ backgroundImage: `url(${data.image})` }}
    >
      <Container className={"h-full"}>
        <div className="py-secondary h-full flex flex-col items-center justify-center text-center lg:w-1/2 mx-auto">
          <h2 className="rb-bold text-4xl lg:text-5xl mb-4">{data?.title}</h2>
          <p className="rb-medium">{data?.text}</p>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
