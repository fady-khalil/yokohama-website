import React from "react";
import Container from "Components/Container/Container";
import roadMapData from "Constant/RoadMapData";
import rdImage from "assests/rd-tires.jpg";
import MainButton from "Components/Buttons/MainButton";
const RoadMap = () => {
  return (
    <section className="bg-lightBlue">
      <Container>
        <div className="hidden lg:flex">
          {roadMapData.map(({ icon, name }, index) => (
            <div
              key={index}
              className="flex-1 flex items-center justify-center flex-col even:mt-32"
            >
              <img className="w-1/2" src={icon} alt="" />
              <p className="rb-bold">{name}</p>
            </div>
          ))}
        </div>
      </Container>

      <div className="relative  bg-lightBlue">
        <div className="absolute left-0 top-0 w-full h-full z-[0]">
          <img src={rdImage} alt="" className="object-cover w-full h-full" />
        </div>

        <Container>
          <div className="pt-[10rem] relative z-[1]">
            <div className="flex flex-col lg:flex-row border-t-[5px] border-white pt-[12rem] lg:items-center lg:justify-center lg:w-[70% ] mx-auto gap-x-32 gap-y-10 ">
              <div className="text-white flex flex-col  justify-center">
                <p className="rb-black text-7xl">01</p>
                <p className="text-lg font-semibold w-3/4">
                  Find your perfect tires
                </p>
              </div>
              <div className="text-white flex flex-col  justify-center">
                <p className="rb-black text-7xl">02</p>
                <p className="text-lg font-semibold w-3/4">
                  Add to your cart & checkout
                </p>
              </div>
              <div className="text-white flex flex-col  justify-center">
                <p className="rb-black text-7xl">03</p>
                <p className="text-lg font-semibold w-3/4">
                  Install at the nearest dealer or at home
                </p>
              </div>
            </div>

            <div className=" flex items-center justify-center pt-32 pb-[10rem] lg:w-1/4 mx-auto">
              <MainButton>Find tires</MainButton>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default RoadMap;
