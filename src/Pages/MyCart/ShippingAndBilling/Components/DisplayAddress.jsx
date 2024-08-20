import { useState, useContext, useEffect } from "react";
import { Plus } from "@phosphor-icons/react";
import AddNewAddress from "./AddNewAddress";
import useGetDataToken from "Hooks/Fetching/useGetDataToken";
import { UserLoginContext } from "context/Auth/UserLoginContext";

const DisplayAddress = ({ getShippingAddressId }) => {
  // context
  const { userToken } = useContext(UserLoginContext);
  // handling fetching and posting data
  const { fetchData } = useGetDataToken();
  const [billingData, setBillingData] = useState();
  const [shippingData, setShippingData] = useState();
  const billingInfo = billingData?.data?.billing_addresses?.[0];
  const ShippingInfo = shippingData?.data?.shipping_addresses;

  // state for modal in case the user need to add new address
  const [active, setActive] = useState(false);
  const handleModalClose = () => {
    setActive(false);
  };
  const handleMoalOpen = () => {
    setActive(true);
  };

  // state to track the success when the user add new address to update the address and render the new added one
  const [isSucces, setIsSucces] = useState(false);
  const onHandleSuccess = () => {
    setIsSucces(true);
    handleModalClose();
  };

  // fetching the address
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
  useEffect(() => {
    getShippingAndBillingData();
  }, [isSucces]);

  // tracking the selectd shipping address
  const [selectedShingAddress, setSelectedShingAddress] = useState("");

  useEffect(() => {
    setSelectedShingAddress(ShippingInfo?.[0].id);
    getShippingAddressId(ShippingInfo?.[0].id);
  }, [shippingData]);

  const handleSelectingId = (shippingID) => {
    setSelectedShingAddress(shippingID);
    getShippingAddressId(shippingID);
  };

  return (
    <div className="flex-[2]">
      <h2 className="text-3xl font-bold">Address</h2>

      {/* bilinng */}
      <div className="mt-20">
        <h6 className="text-2xl mb-4">Billing</h6>
        <div className="bg-gray-200 w-max p-6 flex flex-col gap-y-2">
          <p>{billingInfo?.name}</p>
          <p>{billingInfo?.phone}</p>
          <p>{billingInfo?.email}</p>
          <p>{billingInfo?.street}</p>
        </div>
      </div>

      {/* shipping */}
      <div className="mt-20">
        <div className="flex items-center gap-x-10 mb-4">
          <h6 className="text-2xl ">Shipping</h6>
          <button
            onClick={handleMoalOpen}
            className="flex items-center gap-x-2"
          >
            <Plus size={20} />
            <p className="text-sm"> new address</p>
          </button>
        </div>
        <div className="flex gap-10 flex-wrap">
          {ShippingInfo &&
            ShippingInfo?.map((item, index) => (
              <button
                onClick={() => handleSelectingId(item.id)}
                key={index}
                className={`bg-gray-200 w-max p-6 flex flex-col gap-y-2 ${
                  selectedShingAddress === item.id
                    ? "border border-primary"
                    : ""
                }`}
              >
                <p>{item?.name}</p>
                <p>{item?.phone}</p>
                <p>{item?.email}</p>
                <p>{item?.street}</p>
              </button>
            ))}
        </div>
      </div>

      <AddNewAddress
        isActive={active}
        onHandleClose={handleModalClose}
        onHandleSuccess={onHandleSuccess}
      />
    </div>
  );
};

export default DisplayAddress;
