import React from "react";
import Container from "Components/Container/Container";
import offerImage from "assests/offer.jpg";
import MainButton from "Components/Buttons/MainButton";
const Offer = () => {
  return (
    <section className="bg-lightDark">
      <div className="flex items-center ">
        <div className="flex-1">
          <img className="w-full h-full" src={offerImage} alt="" />
        </div>
        <div className="flex-1">
          <Container>
            <p className="text-5xl rb-bold text-primary">50% OFF</p>
            <h6 className="text-white rb-bold text-4xl">
              Last chance to benefit
            </h6>
            <p className="text-white mb-14 mt-2">
              The Geolandar X-CV is built with technological advances combining
              optimized all-season performance with a refined quiet ride;
              exactly what your luxurious SUV needs.
            </p>
            <MainButton>Learn More</MainButton>
          </Container>
        </div>
      </div>
    </section>
  );
};

export default Offer;
