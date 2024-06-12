import React from "react";
import history from "Constant/History";
import Container from "Components/Container/Container";
import { AirplaneTilt, Article } from "@phosphor-icons/react";

const OrderHistory = () => {
  return (
    <div className="py-secondary">
      <Container>
        <div className="overflow-scroll lg:overflow-hidden">
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
                  OdeMeter
                </th>
                <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold">
                  Amount
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
              </tr>
            </thead>
            <tbody className="">
              {history.map((order, index) => (
                <tr key={index}>
                  <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold">
                    {order.orderNumber}
                  </td>
                  <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold">
                    {order.date}
                  </td>
                  <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold">
                    {order.odeMeter}
                  </td>
                  <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold">
                    {order.amount}
                  </td>
                  <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default OrderHistory;
