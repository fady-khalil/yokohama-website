import Container from "Components/Container/Container";
import { UserCartContext } from "context/User/CartContext";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGetDataToken from "Hooks/Fetching/useGetDataToken";
import { UserLoginContext } from "context/Auth/UserLoginContext";
import Spinner from "Components/RequestHandler/Spinner";
import DisplayReceipt from "./DisplayReceipt/DisplayReceipt";
import EmptyCart from "Components/Screens/EmptyCart";

const Reciept = ({ shippingId, onSelectingTabs }) => {
  const { cart, clearCart, paymentRef, setPaymentRef, orderId, setOrderId } =
    useContext(UserCartContext);
  const { userToken, userData } = useContext(UserLoginContext);
  const navigate = useNavigate();

  const { fetchData } = useGetDataToken();
  const [billingData, setBillingData] = useState();
  const [shippingData, setShippingData] = useState();
  const [paymentComplete, setPaymentComplete] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const getShippingAndBillingData = async () => {
    try {
      setIsLoading(true);
      const billingData = await fetchData(
        "yokohama/shipping/billing_addresses",
        userToken
      );
      setBillingData(billingData?.data?.billing_addresses?.[0]);
      const shippingData = await fetchData(
        "yokohama/shipping/shipping_addresses",
        userToken
      );
      const shippingAddress = shippingData?.data?.shipping_addresses.find(
        (address) => address.id === shippingId
      );
      setShippingData(shippingAddress);
    } catch (error) {
      console.error("Error fetching shipping/billing data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (shippingId) {
      getShippingAndBillingData();
    }
  }, [shippingId]);

  // Redirect if no shipping ID is provided
  useEffect(() => {
    if (!shippingId && !isLoading) {
      onSelectingTabs(2);
    }
  }, [shippingId, isLoading, onSelectingTabs]);

  return (
    <div className="hidden lg:block my-secondary">
      <Container>
        {shippingId && isLoading && (
          <div className="h-[30vh] flex flex-col items-center">
            <Spinner />
            <p>Processing your payment...</p>
          </div>
        )}

        {shippingData &&
          !isLoading &&
          !paymentComplete &&
          cart?.cart_items?.length > 0 && (
            <div>
              <DisplayReceipt
                clearCart={clearCart}
                billingData={billingData}
                shippingData={shippingData}
                cartData={cart}
                shippingId={shippingId}
                userData={userData}
                token={userToken}
              />
            </div>
          )}

        {(!shippingId || !cart?.cart_items?.length) &&
          !isLoading &&
          !paymentComplete && <EmptyCart />}
      </Container>
    </div>
  );
};

export default Reciept;
