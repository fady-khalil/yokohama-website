import React from "react";
import Container from "Components/Container/Container";

import image2 from "assests/details/5.jpg";
import image from "assests/details/3.jpg";

const ProductSpecs = ({ data }) => {
  return (
    <div className="border-t pt-secondary">
      <Container>
        <h2 className="text-center rb-bold text-3xl pt-14 mb-6">
          {data?.title}
        </h2>

        <div>
          <img
            // src={image}
            src={data?.image}
            className="lg:w-3/4 mx-auto object-contain mb-12"
            alt=""
          />
        </div>

        <div className="flex items-center justify-center flex-wrap gap-8 ">
          {data?.icons.map(({ icon }, index) => (
            <div
              className="flex-1 flex items-center justify-center"
              key={index}
            >
              <img className="object-contain w-[6rem]" src={icon} alt="" />
            </div>
          ))}
        </div>

        <div className="flex items-stretch justify-between mt-primary gap-x-6">
          {data?.specs_feature_ids?.map(
            ({ name, title, text, icon }, index) => (
              <div className="bg-white" key={index}>
                <div className="bg-dark text-white rb-bold text-center py-2 ">
                  <p>{title}</p>
                </div>

                <div className="bg-white px-4 py-6">
                  <div>
                    <img className="w-3/4 mx-auto" src={image2} alt="" />
                  </div>

                  <div className="">
                    <p className="rb-bold text-primary text-lg text-center my-3">
                      {name}
                    </p>
                    <p className="rb-bold text-sm text-center">{text}</p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProductSpecs;
