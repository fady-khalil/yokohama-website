import React from "react";
import Container from "Components/Container/Container";
const Content = ({ data }) => {
  return (
    <section>
      <Container>
        {data?.map(({ image, title, text }, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row gap-x-16 items-center lg:even:flex-row-reverse mb-14"
          >
            <div className="flex-1">
              <img className="w-full" src={image} alt="" />
            </div>
            <div className="flex-1">
              <p className="rb-bold text-4xl mt-2">{title}</p>
              <p className="mt-4">{text}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
};

export default Content;
