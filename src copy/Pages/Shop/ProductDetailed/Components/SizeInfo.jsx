import React from "react";
import Container from "Components/Container/Container";
const SizeInfo = ({ data }) => {
  return (
    <section className="pt-secondary lg:pt-primary mt-secondary lg:mt-primary bg-[#efefef]">
      <Container>
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
                {data?.map((order, index) => (
                  <tr key={index}>
                    <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b uppercase text-[#787272] rb-bold text-sm border-r">
                      {order.size}
                    </td>
                    <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b uppercase text-[#787272] rb-bold text-sm border-r">
                      {order.load_index}
                    </td>
                    <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b uppercase text-[#787272] rb-bold text-sm border-r">
                      {order.speed_sympol}
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
