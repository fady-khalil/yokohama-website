import Modal from "Components/Modal/Modal";
import { X } from "@phosphor-icons/react";

import AddressForm from "form/AddressForm";
const AddNewAddress = ({
  isActive,
  onHandleClose,
  onHandleSuccess,
  route,
  title,
}) => {
  return (
    <Modal bigModal={true} isActive={isActive} onHandleClose={onHandleClose}>
      <div className="flex flex-col py-10 px-20">
        <div className="my-2 flex items-center justify-between">
          <p className="text-2xl rb-bold ">{title}</p>
          <button onClick={onHandleClose}>
            <X size={24} />
          </button>
        </div>
        {isActive && (
          <AddressForm
            onHandleSuccess={onHandleSuccess}
            route={route}
            row={8}
          />
        )}
      </div>
    </Modal>
  );
};

export default AddNewAddress;
