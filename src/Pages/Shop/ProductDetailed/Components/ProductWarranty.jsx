import Container from "Components/Container/Container";
import React from "react";

const ProductWarranty = () => {
  return (
    <div className="pt-secondary lg:pt-primary bg-[#efefef]">
      <Container>
        <div className="border-b border-[#777] pb-4">
          <h4 className="rb-bold text-center text-3xl ">
            Geolander x-at® warranty
          </h4>
        </div>

        <div className="py-secondary lg:w-[60%] mx-auto">
          <div className="text-center ">
            <h6 className="rb-bold text-lg uppercase">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
              odio.
            </h6>
            <p className="mt-2 font-medium text-[#555] ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Necessitatibus odio aperiam cupiditate dolor ipsam nam animi
              dolorum, magnam in, neque officia repudiandae esse perspiciatis
              facere! Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Necessitatibus odio aperiam cupiditate dolor ipsam nam animi
              dolorum, magnam in, neque officia repudiandae esse perspiciatis
              facere!
            </p>
            <p className="mt-3 font-medium text-[#555]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
              qui illo voluptates.
            </p>
          </div>
          <div className="text-center  mt-secondary">
            <h6 className="rb-bold text-lg uppercase">Lorem ipsum</h6>
            <p className="mt-2 font-medium text-[#555] ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Necessitatibus odio aperiam cupiditate dolor ipsam nam animi
              dolorum, magnam in, neque officia repudiandae esse perspiciatis
              facere! Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Necessitatibus odio aperiam cupiditate dolor ipsam nam animi
              dolorum, magnam in, neque officia repudiandae esse perspiciatis
              facere! Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Necessitatibus odio aperiam cupiditate dolor ipsam nam animi
              dolorum, magnam in, neque officia repudiandae esse perspiciatis
              facere! Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Necessitatibus odio aperiam cupiditate dolor ipsam nam animi
              dolorum, magnam in, neque officia repudiandae esse perspiciatis
              facere!
            </p>
          </div>

          <button className="text-primary rb-bold text-center underline uppercase py-secondary mx-auto w-max flex items-center justify-content">
            Read more
          </button>
        </div>
      </Container>
    </div>
  );
};

export default ProductWarranty;
