import { useState, useContext, useEffect } from "react";
import Container from "Components/Container/Container";
import CartSummuryDetails from "../Cart/Summry/CartSummuryDetails";
import Spinner from "Components/RequestHandler/Spinner";
// context
import { UserLoginContext } from "context/Auth/UserLoginContext";
import { UserCartContext } from "context/User/CartContext";
import EmptyCart from "Components/Screens/EmptyCart";

// fetching
import useGetDataToken from "Hooks/Fetching/useGetDataToken";
import usePostToken from "Hooks/Fetching/usePostToken";
import AddressForm from "form/AddressForm";
import DisplayAddress from "./Components/DisplayAddress";

const ShippingAndPayment = ({ onSelectingTabs, getShippingAddressId }) => {
  const { cart } = useContext(UserCartContext);
  // context
  const { userToken } = useContext(UserLoginContext);
  // handling fetching and posting data
  const { fetchData } = useGetDataToken();
  const [billingIsValid, setBillingIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shippingId, setShippingId] = useState(null);
  // adding shipping id to cart
  const { postData } = usePostToken();
  const [addShippingIdToCartLoading, setAddShippingIdToCartLoading] =
    useState(false);
  const [isError, setIsError] = useState(false);
  // intial call billing addrees to check if the user have valid billing, if yes we display the addrss, if no we open a form to add a bolling address
  const getBillingAddress = async () => {
    try {
      setIsLoading(true);
      const billingData = await fetchData(
        "yokohama/shipping/billing_addresses",
        userToken
      );

      if (billingData?.is_success) {
        setBillingIsValid(billingData?.data?.billing_addresses[0]?.is_valid);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBillingAddress();
  }, []);

  // state and useEffect to update the view after the user add billing address and display the addrss, we do this process when the user don't have a valid billing address,
  const [isSuccess, setIsSucces] = useState(false);
  const handleSuccess = () => {
    setIsSucces(true);
  };
  useEffect(() => {
    if (isSuccess) {
      getBillingAddress();
    }
  }, [isSuccess]);

  const addShippingIdToCart = async () => {
    try {
      setAddShippingIdToCartLoading(true);
      const addShippingIdToCartData = await postData(
        `yokohama/shipping/confirm?shipping_id=${shippingId}&order_id=${cart?.cart_id}`,
        userToken
      );

      if (addShippingIdToCartData?.is_success) {
        onSelectingTabs(3);
        getShippingAddressId(shippingId);
      } else {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 2000);
    } finally {
      setAddShippingIdToCartLoading(false);
    }
  };

  return (
    <div className="py-secondary">
      <Container>
        {isLoading && (
          <div className="flex items-center flex-col h-[30vh]">
            <Spinner />
            <p className="mt-2">Loading data...</p>
          </div>
        )}
        {cart?.length === 0 && <EmptyCart />}
        {cart?.cart_items?.length > 0 && !isLoading && (
          <div className="flex flex-col lg:flex-row gap-16">
            {!billingIsValid && (
              <AddressForm
                onHandleSuccess={handleSuccess}
                title={"Billing address"}
                isIntial={true}
                row={12}
                route={"yokohama/shipping/billing_address"}
              />
            )}
            {billingIsValid && (
              <DisplayAddress
                getShippingAddressId={setShippingId}
                // confirmSwitchHandler={confirmSwitchHandler}
              />
            )}
            {billingIsValid && (
              <CartSummuryDetails
                addShippingIdToCartIsError={isError}
                addShippingIdToCartLoading={addShippingIdToCartLoading}
                addShippingIdToCart={addShippingIdToCart}
              />
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default ShippingAndPayment;
