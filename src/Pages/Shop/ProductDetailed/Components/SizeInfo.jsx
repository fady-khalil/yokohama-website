import React from "react";
import Container from "Components/Container/Container";
import i1 from "assests/details/i1.jpg";
import i2 from "assests/details/i2.jpg";
import i3 from "assests/details/i3.jpg";
import i4 from "assests/details/i4.jpg";
import i5 from "assests/details/i5.jpg";
import i6 from "assests/details/i6.jpg";
import i7 from "assests/details/i7.jpg";
import i8 from "assests/details/i8.jpg";
import i9 from "assests/details/i9.jpg";
import i10 from "assests/details/i10.jpg";
import i11 from "assests/details/i11.jpg";

import productInfoSize from "Constant/ProductSize";
import { size } from "Constant/ProductSize";
const SizeInfo = () => {
  const images = [i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11];
  return (
    <section className="pt-primary mt-primary bg-[#efefef]">
      <Container>
        <div className="flex items-center gap-x-4 ">
          {images.map((i, index) => (
            <div
              className="flex-1 flex items-center justify-center"
              key={index}
            >
              <img className="object-contain w-3/4" src={i} alt="" />
            </div>
          ))}
        </div>

        <div className="flex items-stretch justify-between mt-primary gap-x-6">
          {productInfoSize.map(({ boxHeader, image, text, title }, index) => (
            <div className="flex-1 bg-white" key={index}>
              <div className="bg-dark text-white rb-bold text-center py-2 ">
                <p>{boxHeader}</p>
              </div>

              <div className="bg-white px-4 py-6">
                <div>
                  <img className="w-3/4 mx-auto" src={image} alt="" />
                </div>

                <div className="">
                  <p className="rb-bold text-primary text-lg text-center my-3">
                    {title}
                  </p>
                  <p className="rb-bold text-sm text-center">{text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="py-primary">
          <p className="text-2xl rb-bold text-center">Size info</p>

          <div className="overflow-scroll lg:overflow-hidden mt-10">
            <table className="w-[60%] mx-auto  ">
              <thead className="border-t-4 border-primary">
                <tr className="bg-dark text-white">
                  <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold text-sm border-r">
                    size
                  </th>
                  <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold text-sm border-r">
                    Load index
                  </th>
                  <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold text-sm">
                    Speed symbol
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {size.map((order, index) => (
                  <tr key={index}>
                    <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b uppercase text-[#787272] rb-bold text-sm border-r">
                      {order.size}
                    </td>
                    <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b uppercase text-[#787272] rb-bold text-sm border-r">
                      {order.loadIndex}
                    </td>
                    <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b uppercase text-[#787272] rb-bold text-sm border-r">
                      {order.speedSymbol}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SizeInfo;
