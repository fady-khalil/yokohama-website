import React from "react";
import Container from "Components/Container/Container";
import channelBg from "assests/about/channels/bg.jpg";

const Channels = ({ data }) => {
  return (
    <section className="my-secondary">
      <Container>
        <div className="">
          <h5 className="text-3xl text-primary rb-bold text-center">
            Distribution channels
          </h5>
        </div>

        <div
          className="py-24 mt-12  gap-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-between"
          style={{ backgroundImage: `url(${channelBg})` }}
        >
          {data?.map(({ logo, title }, index) => (
            <div
              className="flex flex-col gap-y-2 items-center text-white"
              key={index}
            >
              <img
                className="w-32 h-32 mx-auto object-contain"
                src={logo}
                alt=""
              />
              <p className="rb-medium ">{title}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Channels;
