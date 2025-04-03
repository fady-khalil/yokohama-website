import { useState, useContext, useEffect } from "react";
import Shipping from "./Shipping/Shipping";
import Billing from "./Billing/Billing";
import Container from "Components/Container/Container";

import useGetDataToken from "Hooks/Fetching/useGetDataToken";
import { UserLoginContext } from "context/Auth/UserLoginContext";
import Spinner from "Components/RequestHandler/Spinner";
const AddressBook = () => {
  // context
  const { userToken } = useContext(UserLoginContext);
  // handling fetching and posting data
  const { fetchData } = useGetDataToken();
  const [billingData, setBillingData] = useState();
  const [shippingData, setShippingData] = useState();
  const billingInfo = billingData?.data?.billing_addresses?.[0];
  const ShippingInfo = shippingData?.data?.shipping_addresses;
  const [isLoading, setIsLoading] = useState(false);

  const getShippingAndBillingData = async () => {
    try {
      setIsLoading(true);
      const billingData = await fetchData(
        "yokohama/shipping/billing_addresses",
        userToken
      );
      setBillingData(billingData);
      const shippingData = await fetchData(
        "yokohama/shipping/shipping_addresses",
        userToken
      );
      setShippingData(shippingData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [isSucces, setIsSucces] = useState(false);
  const onHandleSuccess = () => {
    setIsSucces(true);
    // handleModalClose();
  };

  useEffect(() => {
    getShippingAndBillingData();
  }, [isSucces]);

  return (
    <main className="py-secondary">
      <Container>
        {isLoading ? (
          <div className="flex flex-col items-center h-[30vh]">
            <Spinner />
            <p>Loading data...</p>
          </div>
        ) : (
          <div className="flex flex-col-reverse lg:flex-row gap-16">
            <Shipping onHandleSuccess={onHandleSuccess} data={ShippingInfo} />
            <Billing onHandleSuccess={onHandleSuccess} data={billingInfo} />
          </div>
        )}
      </Container>
    </main>
  );
};

export default AddressBook;
