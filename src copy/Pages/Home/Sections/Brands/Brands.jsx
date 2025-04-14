import React from "react";
import Container from "Components/Container/Container";
import "./style.css";

import icon from "assests/Auth/y1/y1.png";
import bg from "assests/find-your-tires-bg.jpg";

const Brands = ({ data }) => {
  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="slider-container bg-dark pt-secondary xl:pt-mega"
    >
      <Container>
        <div className="slider-track">
          {/* Render each image twice for infinite loop */}
          {data?.concat(data).map(({ image }, index) => (
            <div className="slider-item" key={index}>
              <img className="brand-image" src={image} alt={`brand-${index}`} />
              <img className="h-1/3 w-1/4" src={icon} alt={`brand-${index}`} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Brands;
