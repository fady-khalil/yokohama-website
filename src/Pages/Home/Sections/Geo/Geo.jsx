import React from "react";
import geoImage from "assests/b22.jpg";
import Container from "Components/Container/Container";
import Features from "./components/Features";
import Description from "./components/Description";
import MainButton from "Components/Buttons/MainButton";
import OutlineButton from "Components/Buttons/OutlineButton";
const Geo = () => {
  return (
    <section className="py-primary relative ">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="flex-1">
          <img src={geoImage} alt="" className="w-full object-cover" />
        </div>
        <div className="flex-1">
          <Container>
            <Description />
            <Features />
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-6">
              <MainButton>Shop Now</MainButton>
              <OutlineButton>Ask an Expert</OutlineButton>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
};

export default Geo;
