import React from "react";
import Container from "Components/Container/Container";
import "./style.css";
import brand1 from "assests/brand/1.png";
import brand2 from "assests/brand/2.png";
import brand3 from "assests/brand/3.png";
import brand4 from "assests/brand/4.png";
import brand5 from "assests/brand/5.png";
import brand6 from "assests/brand/6.png";
import brand7 from "assests/brand/7.png";
import icon from "assests/Auth/y1/y1.png";
import bg from "assests/find-your-tires-bg.jpg";

const Brands = () => {
  const images = [brand1, brand2, brand3, brand4, brand5, brand6, brand7];
  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="slider-container pt-mega bg-dark pb-primary"
    >
      <Container>
        <div className="slider-track">
          {/* Render each image twice for infinite loop */}
          {images.concat(images).map((image, index) => (
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
