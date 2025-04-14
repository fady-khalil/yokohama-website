import React, { useState } from "react";
import AddressForm from "../AddNewAddress/AddNewAddress";

const Billing = ({ data, onHandleSuccess }) => {
  // state for modal in case the user need to add new address
  const [active, setActive] = useState(false);
  const handleModalClose = () => {
    setActive(false);
  };
  const handleMoalOpen = (id) => {
    setActive(true);
  };
  // const [isSucces, setIsSucces] = useState(false);
  const onHandleSuccesss = () => {
    onHandleSuccess();
    handleModalClose();
  };
  return (
    <div className="flex-1">
      <div>
        <h4 className="text-3xl rb-bold text-center">Billing Address</h4>
      </div>

      <div className="flex flex-col gap-y-10 mt-10">
        <div className="">
          <div className="p-4 lg:px-10 lg:py-8 flex flex-col gap-y-4 lg:flex-row lg:items-center border rounded-md">
            <div className="lg:flex-[2]">
              <p className="rb-bold text-sm">{data?.street}</p>
              <p className="rb-bold text-sm">{data?.name}</p>
              <p className="rb-bold">{data?.phone}</p>
              <p className="rb-bold text-sm">{data?.email}</p>
            </div>
            {/* <div className="lg:flex-1">
              <img src={mapImage} alt="" />
            </div> */}
          </div>

          <div
            className={`px-10 py-2 text-white  flex items-center justify-end bg-dark `}
          >
            <span className="flex items-center gap-x-4">
              <button onClick={handleMoalOpen} className="underline">
                Edit
              </button>
            </span>
          </div>
        </div>
      </div>

      <AddressForm
        onHandleSuccess={onHandleSuccesss}
        isActive={active}
        title={"Edit your Billing Address"}
        route={`yokohama/shipping/billing_address`}
        onHandleClose={handleModalClose}
      />
    </div>
  );
};

export default Billing;
