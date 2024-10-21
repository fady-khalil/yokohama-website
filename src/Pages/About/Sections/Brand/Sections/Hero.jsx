import Container from "Components/Container/Container";
import React from "react";
import heroBrand from "assests/about/Brand/about.jpg";

const Hero = ({ data }) => {
  return (
    <section
      className="h-[75vh] brand-bg relative z-[]"
      style={{ backgroundImage: `url(${data?.image})` }}
    >
      <Container className={"h-full"}>
        <div className="py-secondary h-full flex flex-col items-csenter justify-center lg:w-1/2 mx-auto">
          <h2 className="rb-bold text-4xl text-start lg:text-5xl mb-4">
            {data?.hero_title}
          </h2>
          <p className="rb-medium">{data?.hero_Text}</p>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
