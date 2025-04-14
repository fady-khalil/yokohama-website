import React from "react";
import loyaltyData from "Constant/LoyalityContent";
import Container from "Components/Container/Container";
import { Article } from "@phosphor-icons/react";

const LoyalityTable = () => {
  return (
    <section className="my-secondary">
      <Container>
        <div className="overflow-scroll lg:overflow-hidden">
          <table className="w-full ">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-center py-4 uppercase rb-bold">Amount</th>
                <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold">
                  reason
                </th>
                <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold">
                  Date
                </th>
                <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold">
                  Receipt
                </th>
              </tr>
            </thead>
            <tbody className="">
              {loyaltyData.map((order, index) => (
                <tr key={index}>
                  <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold">
                    {order.amount}
                  </td>
                  <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold">
                    {order.reason}
                  </td>
                  <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold">
                    {order.date}
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
    </section>
  );
};

export default LoyalityTable;
