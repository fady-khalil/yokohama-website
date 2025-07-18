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
  const { userToken, userIsSignIn } = useContext(UserLoginContext);
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

  // initial call to check if the user has valid billing
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
      console.error("Error fetching billing address:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Only fetch billing address if user is signed in
  useEffect(() => {
    if (userIsSignIn) {
      getBillingAddress();
    }
  }, [userIsSignIn]);

  // Check if we should redirect back to cart review
  useEffect(() => {
    // If user is not signed in, redirect back to cart review
    // This ensures users can't directly access shipping without being signed in
    if (!userIsSignIn) {
      onSelectingTabs(1);
    }

    // If cart is empty, redirect back to cart review
    if (!cart || cart.length === 0) {
      onSelectingTabs(1);
    }
  }, [userIsSignIn, cart, onSelectingTabs]);

  // Update the view after the user adds a billing address
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
      // Validate that we have a shipping ID before proceeding
      if (!shippingId) {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 2000);
        return;
      }

      // Validate that we have a cart ID
      if (!cart?.cart_id) {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 2000);
        return;
      }

      setAddShippingIdToCartLoading(true);

      const addShippingIdToCartData = await postData(
        `yokohama/shipping/confirm?shipping_id=${shippingId}&order_id=${cart.cart_id}`,
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

        {(!cart || cart.length === 0) && !isLoading && <EmptyCart />}

        {cart && cart.length > 0 && !isLoading && (
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
              <DisplayAddress getShippingAddressId={setShippingId} />
            )}
            {billingIsValid && (
              <CartSummuryDetails
                addShippingIdToCartIsError={isError}
                addShippingIdToCartLoading={addShippingIdToCartLoading}
                addShippingIdToCart={addShippingIdToCart}
                shippingId={shippingId}
              />
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default ShippingAndPayment;
