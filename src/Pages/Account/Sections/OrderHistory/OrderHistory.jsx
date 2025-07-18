import { useEffect, useState, useContext } from "react";
import history from "Constant/History";
import Container from "Components/Container/Container";
import { AirplaneTilt, Article } from "@phosphor-icons/react";
import { UserLoginContext } from "context/Auth/UserLoginContext";
import useGetDataToken from "Hooks/Fetching/useGetDataToken";
import Spinner from "Components/RequestHandler/Spinner";

const OrderHistory = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { fetchData, error } = useGetDataToken();
  const { userToken } = useContext(UserLoginContext);

  const getData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await fetchData("yokohama/cart/orders/mine", userToken);
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
    <div className="py-secondary min-h-[30vh]">
      <Container>
        {data && !isLoading && (
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
                  {/* <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold">
                    OdeMeter
                  </th> */}
                  <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold">
                    Amount
                  </th>
                  <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold">
                    Status
                  </th>
                  {/* <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold">
                    Track
                  </th>
                  <th className="min-w-[150px] lg:min-w-auto text-center py-4 uppercase rb-bold">
                    Receipt
                  </th> */}
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
                    {/* <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold">
                      {order.id}
                    </td> */}
                    <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold">
                      {order.amount_total} {order?.currency}
                    </td>
                    <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold">
                      {order.status}
                    </td>
                    {/* <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold">
                      <span className="flex items-center justify-center text-2xl text-primary">
                        <AirplaneTilt weight="fill" />
                      </span>
                    </td>
                    <td className="min-w-[150px] lg:min-w-auto text-center py-4 border-b  rb-bold">
                      <span className="flex items-center justify-center text-2xl text-primary">
                        <Article weight="fill" />
                      </span>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {isLoading && (
          <div className="h-[30vh] flex flex-col items-center">
            <Spinner />
            <p>Loading your Orders...</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default OrderHistory;
