import React from "react";
import Container from "Components/Container/Container";
import { Info, DotsThreeVertical } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
const ShopLanding = ({ data }) => {
  return (
    <div className="mb-primary">
      <Container>
        <div className="flex items-center justify-end gap-x-6 my-8">
          <span className="flex items-center gap-x-3 ">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>

            <p>available</p>
          </span>
          <span className="flex items-center gap-x-3">
            <span className="w-3 h-3 bg-primary rounded-full"></span>
            <p>Not available</p>
          </span>
        </div>
        <div className="overflow-scroll xl:overflow-hidden">
          <table className="w-full ">
            <thead>
              <tr className="bg-primary text-white">
                <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm">
                  <span className="flex items-center justify-center ">
                    <DotsThreeVertical size={32} />
                    <p>Tire Size</p>
                  </span>
                </th>
                <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm">
                  <span className="flex items-center justify-center ">
                    <DotsThreeVertical size={32} />
                    <p>Brand</p>
                  </span>
                </th>
                <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm">
                  <span className="flex items-center justify-center ">
                    <DotsThreeVertical size={32} />
                    <p>Pattern</p>
                  </span>
                </th>
                <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm">
                  <span className="flex items-center justify-center ">
                    <DotsThreeVertical size={32} />
                    <p>Price</p>
                  </span>
                </th>
                <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm">
                  <span className="flex items-center justify-center ">
                    <DotsThreeVertical size={32} />
                    <p>Discount</p>
                  </span>
                </th>
                <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm">
                  <span className="flex items-center justify-center ">
                    <DotsThreeVertical size={32} />
                    <p>available QTY</p>
                  </span>
                </th>
                <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm">
                  <span className="flex items-center justify-center ">
                    <DotsThreeVertical size={32} />
                    <p>QTY</p>
                  </span>
                </th>
                <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm">
                  Subtotal
                </th>
                <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm"></th>
                <th className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 uppercase rb-bold text-sm"></th>
              </tr>
            </thead>

            <tbody className="">
              {data.map((order, index) => (
                <tr key={index}>
                  <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b  rb-bold text-sm">
                    <Link to={"/product-detailed"}>{order.tireSize}</Link>
                  </td>
                  <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b  rb-bold text-sm">
                    <Link to={"/product-detailed"}>{order.brand}</Link>
                  </td>
                  <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b  rb-bold text-sm">
                    <Link to={"/product-detailed"}>{order.pattern}</Link>
                  </td>
                  <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b  rb-bold text-sm">
                    <Link to={"/product-detailed"}>{order.price}</Link>
                  </td>
                  <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b  rb-bold text-sm">
                    <p>{order.discount[0]}</p>
                    <p className="text-primary italic text-sm font-light">
                      {order.discount[1]}
                    </p>
                  </td>
                  <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b  rb-bold text-sm">
                    <div className="flex items-center gap-x-2 justify-center">
                      <span
                        className={`w-3 h-3 ${
                          index % 2 === 0 ? "bg-primary" : "bg-green-500"
                        } rounded-full block`}
                      ></span>

                      {order.available_quantity}
                    </div>
                  </td>
                  <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b  rb-bold text-sm ">
                    <span className="w-[80%] mx-auto flex items-center gap-x-4 justify-between  px-2 py-1 border">
                      <button>+</button>
                      <p>0</p>
                      <button>-</button>
                    </span>
                  </td>
                  <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b  rb-bold text-sm">
                    <p>Sub Total</p>
                  </td>
                  <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b  rb-bold text-sm">
                    <button className="bg-dark text-sm  px-4 py-1 rb-bold text-sm text-white uppercase">
                      Add to cart
                    </button>
                  </td>
                  <td className="min-w-[150px] xl:min-w-[fit-content] text-center py-4 border-b  rb-bold text-sm">
                    <button className="text-white bg-primary p-1 rounded-full">
                      <Info weight="fill" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default ShopLanding;
