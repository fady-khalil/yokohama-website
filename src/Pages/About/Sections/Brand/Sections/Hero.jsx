import Container from "Components/Container/Container";
import React from "react";
import heroBrand from "assests/about/Brand/about.jpg";

const Hero = ({ data }) => {
  return (
    <section
      className="brand-bg relative z-[]"
      style={{ backgroundImage: `url(${data?.image})` }}
    >
      <Container>
        <div className="py-secondary lg:py-primary h-full flex flex-col  items-center justify-center lg:w-1/2 mx-auto">
          <h2 className="rb-bold text-2xl lg:text-4xl text-start lg:text-5xl mb-4">
            {data?.hero_title}
          </h2>
          <p className="">{data?.hero_Text}</p>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
