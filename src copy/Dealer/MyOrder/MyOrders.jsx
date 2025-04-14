import Container from "Components/Container/Container";
import { useEffect, useState, useContext } from "react";
import { AirplaneTilt, Article } from "@phosphor-icons/react";
import { DealerLoginContext } from "context/Auth/DealerContext";
import useGetDataToken from "Hooks/Fetching/useGetDataToken";
import Spinner from "Components/RequestHandler/Spinner";
const MyOrders = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { fetchData, error } = useGetDataToken();
  const { dealerToken } = useContext(DealerLoginContext);

  const getData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await fetchData("yokohama/cart/orders", dealerToken);

      console.log(data);
      setData(data?.data?.cart_items);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section>
      <Container>
        <div className="text-4xl rb-bold text-center my-secondary">
          <h1>My Balacne</h1>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center">
            <Spinner />
            <p>Loading Data...</p>
          </div>
        ) : (
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
                {data?.map((order, index) => (
                  <tr key={index}>
                    <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold">
                      {order.name}
                    </td>
                    <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold">
                      {order.date}
                    </td>

                    <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold">
                      {order.amount_total} {order?.currency}
                    </td>
                    <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold">
                      {order.credit_used}
                      111
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
        )}
      </Container>
    </section>
  );
};

export default MyOrders;
