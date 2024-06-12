import Container from "Components/Container/Container";
import React from "react";
import bg from "assests/listing/header.jpg";

const Header = ({ header }) => {
  return (
    <div className="relative" style={{ backgroundImage: `url(${bg})` }}>
      <div className="absolute w-full h-full top-0 left-0 bg-[#00000033] z-[0]"></div>
      <Container>
        <div className="py-primary text-4xl rb-bold text-center text-white relative z-[10]">
          <h1>{header}</h1>
        </div>
      </Container>
    </div>
  );
};

export default Header;
