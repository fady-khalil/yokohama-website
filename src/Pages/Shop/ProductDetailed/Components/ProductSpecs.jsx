import React from "react";
import image from "assests/details/3.jpg";
import Container from "Components/Container/Container";
const ProductSpecs = () => {
  return (
    <div className="border-t pt-secondary">
      <Container>
        <h2 className="text-center rb-bold text-3xl pt-14 mb-10">
          The Ideal fusion of technology & performance
        </h2>

        <div>
          <img src={image} className="lg:w-3/4 mx-auto" alt="" />
        </div>
      </Container>
    </div>
  );
};

export default ProductSpecs;
