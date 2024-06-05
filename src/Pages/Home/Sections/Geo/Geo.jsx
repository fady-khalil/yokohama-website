import React from "react";
import geoImage from "assests/geo-removebg-preview.png";
import Container from "Components/Container/Container";
import Features from "./components/Features";
import Description from "./components/Description";
import MainButton from "Components/Buttons/MainButton";
import OutlineButton from "Components/Buttons/OutlineButton";
const Geo = () => {
  return (
    <section className="py-primary relative ">
      <Container>
        <div className="flex items-center">
          <div className="flex-1">
            <img src={geoImage} alt="" className="w-full object-cover" />
          </div>
          <div className="flex-1">
            <Description />
            <Features />
            <div className="mt-8 flex items-center gap-x-6">
              <MainButton>Shop Now</MainButton>
              <OutlineButton>Ask an Expert</OutlineButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Geo;
