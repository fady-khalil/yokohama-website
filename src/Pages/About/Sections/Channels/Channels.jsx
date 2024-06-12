import React from "react";
import Container from "Components/Container/Container";
import aboutData from "Constant/About";
const Channels = () => {
  return (
    <section className="my-secondary">
      <Container>
        <div className="">
          <h5 className="text-3xl text-primary rb-bold text-center">
            Distribution channels
          </h5>
        </div>

        <div
          className="py-24 mt-12  gap-y-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-between"
          style={{ backgroundImage: `url(${aboutData?.channels.background})` }}
        >
          {aboutData?.channels?.list?.map(({ icon, name }, index) => (
            <div
              className="flex flex-col gap-y-2 items-center text-white"
              key={index}
            >
              <img src={icon} alt="" />
              <p className="rb-medium ">{name}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Channels;
