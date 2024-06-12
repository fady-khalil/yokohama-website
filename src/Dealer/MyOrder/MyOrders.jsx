import Container from "Components/Container/Container";
import React from "react";
import dealerOrderHistory from "Constant/DealerOrder";
import { AirplaneTilt, Article } from "@phosphor-icons/react";

const MyOrders = () => {
  return (
    <section>
      <Container>
        <div className="text-4xl rb-bold text-center my-secondary">
          <h1>My Orders</h1>
        </div>

        <div className="overflow-scroll lg:overflow-hidden ">
          <table className="w-full ">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-center py-4 uppercase rb-bold">
                  Order Number
                </th>
                <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold">
                  Date
                </th>
                <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold">
                  Amount
                </th>
                <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold">
                  credit used
                </th>
                <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold">
                  Status
                </th>
                <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold">
                  Track
                </th>
                <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold">
                  Receipt
                </th>
                <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold"></th>
              </tr>
            </thead>
            <tbody className="">
              {dealerOrderHistory.map((order, index) => (
                <tr key={index}>
                  <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold">
                    {order.orderNumber}
                  </td>
                  <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold">
                    {order.date}
                  </td>

                  <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold">
                    {order.amount}
                  </td>
                  <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold">
                    {order.credit_used}
                  </td>
                  <td
                    className={`min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold ${
                      order.status === "Delivered" ? "text-green-500" : ""
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold">
                    <span className="flex items-center justify-center text-2xl text-primary">
                      <AirplaneTilt weight="fill" />
                    </span>
                  </td>
                  <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold">
                    <span className="flex items-center justify-center text-2xl text-primary">
                      <Article weight="fill" />
                    </span>
                  </td>
                  <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold">
                    <button className="text-white bg-dark px-6 py-1 rb-bold text-sm uppercase">
                      Reorder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
};

export default MyOrders;
