import React, { useState } from "react";
import AddressForm from "../AddNewAddress/AddNewAddress";
const Shipping = ({ data, onHandleSuccess }) => {
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // state for modal in case the user need to add new address
  const [active, setActive] = useState(false);
  const handleModalClose = () => {
    setActive(false);
  };
  const handleMoalOpen = (id) => {
    setSelectedAddressId(id);
    setActive(true);
  };
  const [isSucces, setIsSucces] = useState(false);
  const onHandleSuccesss = () => {
    setIsSucces(true);
    handleModalClose();
    onHandleSuccess();
  };

  return (
    <div className="flex-1">
      <div>
        <h4 className="text-3xl rb-bold text-center">Shipping Address</h4>
      </div>

      <div className="flex flex-col gap-y-10 mt-10">
        {data?.map(({ street, name, phone, email, id }, index) => (
          <div className="" key={index}>
            <div className="p-4 lg:px-10 lg:py-8 flex flex-col gap-y-4 lg:flex-row lg:items-center border rounded-md">
              <div className="lg:flex-[2]">
                <p className="rb-bold text-sm">{street}</p>
                <p className="rb-bold text-sm">{name}</p>
                <p className="rb-bold">{phone}</p>
                <p className="rb-bold text-sm">{email}</p>
              </div>
              {/* <div className="lg:flex-1">
                <img src={mapImage} alt="" />
              </div> */}
            </div>

            <div
              className={`px-10 py-2 text-white bg-dark flex items-center justify-end }`}
            >
              {/* <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={defaultShippingId === id}
                  onChange={() => handleSetDefault(id)}
                  className="mr-2"
                />
                <span>Select</span>
              </label> */}

              <span className="flex items-center gap-x-4">
                <button
                  onClick={() => handleMoalOpen(id)}
                  className="underline"
                >
                  Edit
                </button>
                <button className="underline">Delete</button>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="mt-10 flex items-center justify-center">
        <button
          onClick={handleMoalOpen}
          className="text-primary underline uppercase rb-bold"
        >
          Add New Address
        </button>
      </div> */}

      <AddressForm
        onHandleSuccess={onHandleSuccesss}
        isActive={active}
        title={"Edit your shipping Address"}
        route={`yokohama/shipping/update_shipping/${selectedAddressId}`}
        onHandleClose={handleModalClose}
      />
    </div>
  );
};

export default Shipping;
