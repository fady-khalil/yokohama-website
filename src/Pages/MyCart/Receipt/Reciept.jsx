import Container from "Components/Container/Container";
import { UserCartContext } from "context/User/CartContext";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useGetDataToken from "Hooks/Fetching/useGetDataToken";
import { UserLoginContext } from "context/Auth/UserLoginContext";
import Spinner from "Components/RequestHandler/Spinner";
import DisplayReceipt from "./DisplayReceipt/DisplayReceipt";
import EmptyCart from "Components/Screens/EmptyCart";

const Reciept = ({ shippingId, onSelectingTabs }) => {
  const { cart, clearCart } = useContext(UserCartContext);
  const { userToken, userData } = useContext(UserLoginContext);

  const { fetchData } = useGetDataToken();
  const [billingData, setBillingData] = useState();
  const [shippingData, setShippingData] = useState();

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
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (shippingId) {
      getShippingAndBillingData();
    }
  }, [shippingId]);

  return (
    <div className="hidden lg:block my-secondary">
      <Container>
        {shippingId && isLoading && (
          <div className="h-[30vh] flex flex-col items-center">
            <Spinner />
            <p>Generating your receipt...</p>
          </div>
        )}
        {shippingData && !isLoading && cart?.cart_items?.length > 0 && (
          <DisplayReceipt
            clearCart={clearCart}
            billingData={billingData}
            shippingData={shippingData}
            cartData={cart}
            shippingId={shippingId}
            userData={userData}
            token={userToken}
          />
        )}
        {!shippingId && (
          <div className="h-[30vh]">
            <p className="text-xl text-center">
              To access the receipt, you need to select a shipping address
              first.
            </p>

            <div className="flex items-center justify-center gap-x-8 mt-14">
              <button
                onClick={() => onSelectingTabs(2)}
                className="border border-primary px-8 text-lg py-2.5"
              >
                Select Address
              </button>
              <Link to={"/"} className="underline">
                Go Home
              </Link>
            </div>
          </div>
        )}
        {cart?.length === 0 && <EmptyCart />}
      </Container>
    </div>
  );
};

export default Reciept;
