import Container from "Components/Container/Container";
import Logo from "assests/logo.png";
import mapImage from "assests/about/map.jpeg";

const Reciept = () => {
  const data = [
    {
      name: "GEOLANDAR - AT/G015",
      price: "200$",
      qnt: "2",
      subTotal: "400$",
    },
    {
      name: "GEOLANDAR - AT/G015",
      price: "200$",
      qnt: "2",
      subTotal: "400$",
    },
  ];
  return (
    <div className="my-secondary">
      <Container>
        <div className=" w-3/4 mx-auto ">
          <div className="flex items-center justify-between bg-[#efefef] px-6 py-4">
            <img className="w-56" src={Logo} alt="" />

            <div className="flex items-center gap-x-4">
              <p className="uppercase rb-bold border-r border-black px-2  text-[#333]">
                user name
              </p>
              <p className="rb-bold uppercase border-r border-black px-2  text-[#333]">
                12/12/2012
              </p>
              <p className="rb-bold uppercase  text-[#333]">order #78347</p>
            </div>
          </div>

          <div className="flex my-10">
            <div className="flex-1">
              <p className="text-xl text-primary mb-2 rb-bold uppercase">
                Shipping address
              </p>

              <div className="text-sm rb-bold">
                <p>Chevrolet, Palm Building, 9th floor</p>
                <p>User Name</p>
                <p>+96171828039</p>
                <p>email@test.com</p>
              </div>

              <img className="mt-4" src={mapImage} alt="" />
            </div>
            <div className="flex-1">
              <p className="text-xl text-primary mb-2 rb-bold uppercase">
                Billing address
              </p>

              <div className="text-sm rb-bold">
                <p>Chevrolet, Palm Building, 9th floor</p>
                <p>User Name</p>
                <p>+96171828039</p>
                <p>email@test.com</p>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t rb-bold">
            <p className="text-xl text-primary mb-2  uppercase">
              Payment method
            </p>
            <p className="text-sm">Online payment</p>
          </div>

          <div className="mt-10 w-full flex flex-col">
            <thead className="w-full flex-1">
              <tr className="bg-[#efefef] text-[#333] flex justify-between">
                <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold">
                  Product
                </th>
                <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold">
                  Price
                </th>
                <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold">
                  QTY
                </th>
                <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody className="w-full flex-1">
              {data.map((order, index) => (
                <tr className="flex justify-between border-b" key={index}>
                  <td className="min-w-[150px] lg:min-w-auto text-center py-6  rb-bold">
                    {order.name}
                  </td>
                  <td className="min-w-[150px] lg:min-w-auto text-center py-6  rb-bold">
                    {order.price}
                  </td>
                  <td className="min-w-[150px] lg:min-w-auto text-center py-6  rb-bold">
                    {order.qnt}
                  </td>
                  <td className="min-w-[150px] lg:min-w-auto text-center py-4  rb-bold">
                    {order.subTotal}
                  </td>
                </tr>
              ))}
            </tbody>

            <div className="w-1/4 mt-6 ml-auto flex flex-col gap-y-2">
              <span className="flex items-center justify-between text-[#333] rb-bold border-b pb-2">
                <p>Subtotal</p>
                <p>5000$</p>
              </span>
              <span className="flex items-center justify-between text-[#333] rb-bold border-b pb-2">
                <p>Taxes </p>
                <p>200$</p>
              </span>
              <span className="flex items-center justify-between text-[#333] rb-bold border-b pb-2">
                <p>Shipping </p>
                <p>0</p>
              </span>
              <span className="flex items-center justify-between text-[#333] rb-bold border-b pb-2">
                <p>Total 1</p>
                <p>1000$</p>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Reciept;
