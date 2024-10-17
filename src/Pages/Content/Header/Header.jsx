import React from "react";
import banner from "assests/about/why-2.jpg";
import Container from "Components/Container/Container";

const Header = ({ title, cat }) => {
  return (
    <section
      style={{ backgroundImage: `url(${banner})` }} // Correct way to apply the background image
      className="relative h-[40vh] bg-cover bg-center"
    >
      <div className="absolute left-0 top-0 w-full h-full bg-[#00000080] z-[0]"></div>
      <Container className="h-full relative z-[1]">
        <div className="text-white flex w-3/4 flex-col justify-center h-full">
          <h6 className="font-bold text-3xl">{cat}</h6>
          <h1 className="text-6xl mt-2">{title}</h1>{" "}
        </div>
      </Container>
    </section>
  );
};

export default Header;
