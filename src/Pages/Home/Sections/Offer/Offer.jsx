import React from "react";
import Container from "Components/Container/Container";
import offerImage from "assests/offer.jpg";
import bg from "assests/find-your-tires-bg.jpg";
import MainButton from "Components/Buttons/MainButton";
const Offer = () => {
  return (
    <section
      style={{ backgroundImage: `url(${bg})` }}
      className="py-secondary bg-dark"
    >
      <Container>
        <div className="pb-6 mb-6  border-b border-white">
          <h1 className="text-center  rb-bold text-white text-5xl">
            Special Offer
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row items-center ">
          <div className="flex-1">
            <img
              className="w-full h-full rounded-2xl"
              src={offerImage}
              alt=""
            />
          </div>
          <div className="flex-1 py-8 lg:py-0">
            <Container>
              <p className="text-5xl rb-bold text-primary">50% OFF</p>
              <h6 className="text-white rb-bold text-4xl">
                Last chance to benefit
              </h6>
              <p className="text-white mb-14 mt-2">
                The Geolandar X-CV is built with technological advances
                combining optimized all-season performance with a refined quiet
                ride; exactly what your luxurious SUV needs.
              </p>
              <MainButton>Learn More</MainButton>
            </Container>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Offer;
