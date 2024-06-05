import React from "react";
import Container from "Components/Container/Container";
import aboutData from "Constant/About";

const WhyUs = () => {
  return (
    <section className="my-secondary">
      <Container>
        {aboutData?.vision.map(({ image, title, list }, index) => (
          <div className="flex flex-col lg:flex-row gap-x-16 items-center lg:even:flex-row-reverse mb-14">
            <div className="flex-1">
              <img className="w-full" src={image} alt="" />
            </div>
            <div className="flex-1">
              <p className="rb-bold text-4xl">{title}</p>
              <ul className="mt-6 list-disc list-inside flex flex-col gap-y-2">
                {list.map((li, index) => (
                  <li key={index}>{li}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
};

export default WhyUs;
