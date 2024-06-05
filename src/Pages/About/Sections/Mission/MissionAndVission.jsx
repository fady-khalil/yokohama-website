import React from "react";
import Container from "Components/Container/Container";
import aboutData from "Constant/About";

const MissionAndVission = () => {
  return (
    <section className="my-secondary">
      <Container>
        {aboutData?.mission.map(({ image, title, text }, index) => (
          <div className="flex flex-col lg:flex-row gap-x-16 items-center lg:even:flex-row-reverse mb-14">
            <div className="flex-1">
              <img className="w-full" src={image} alt="" />
            </div>
            <div className="flex-1">
              <p className="rb-bold text-4xl">{title}</p>
              <p className="mt-4">{text}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
};

export default MissionAndVission;
