import React from "react";
import safetyData from "Constant/SafetyData";
import Container from "Components/Container/Container";
const Safety = () => {
  return (
    <section className="mb-primary">
      <Container>
        <div className="py-secondary">
          <h1 className="rb-bold text-3xl text-center">Safety</h1>
        </div>

        <div className="flex flex-col gap-y-6">
          {safetyData.map(({ image, title, text }, index) => (
            <div
              className="flex items-end even:flex-row-reverse gap-x-10"
              key={index}
            >
              <div className="flex-1 min-full border-b-4 border-primary pb-14">
                <h4 className="rb-bold text-2xl mb-4">{title}</h4>
                <p className="rb-light">{text}</p>
              </div>
              <div className="flex-1">
                <img className="w-full h-full" src={image} alt="" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Safety;
