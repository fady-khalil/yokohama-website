import { useState, useContext, useEffect } from "react";
import Shipping from "./Shipping/Shipping";
import Billing from "./Billing/Billing";
import Container from "Components/Container/Container";

import useGetDataToken from "Hooks/Fetching/useGetDataToken";
import { UserLoginContext } from "context/Auth/UserLoginContext";
const AddressBook = () => {
  // context
  const { userToken } = useContext(UserLoginContext);
  // handling fetching and posting data
  const { fetchData } = useGetDataToken();
  const [billingData, setBillingData] = useState();
  const [shippingData, setShippingData] = useState();
  const billingInfo = billingData?.data?.billing_addresses?.[0];
  const ShippingInfo = shippingData?.data?.shipping_addresses;

  const getShippingAndBillingData = async () => {
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
        <div className="flex flex-col-reverse lg:flex-row gap-16">
          <Shipping onHandleSuccess={onHandleSuccess} data={ShippingInfo} />
          <Billing onHandleSuccess={onHandleSuccess} data={billingInfo} />
        </div>
      </Container>
    </main>
  );
};

export default AddressBook;
