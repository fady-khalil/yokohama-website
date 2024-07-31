import Modal from "Components/Modal/Modal";
import { useContext, useState } from "react";
import { ModalContext } from "context/Auth/ModalContext";

import SubmitEmail from "./Forms/SubmitEmail";
import NewPassoword from "./Forms/NewPassoword";
const ForgetPasswordModal = () => {
  const {
    forgotModalIsActive,
    openForgotModalHandeler,
    closeForgotModalHandeler,
  } = useContext(ModalContext);

  const [toggleForms, setToggleForms] = useState(false);
  const toggleFormHandler = () => {
    setToggleForms((cur) => !cur);
  };
  return (
    <Modal
      onHandleClose={closeForgotModalHandeler}
      isActive={forgotModalIsActive}
    >
      {toggleForms ? (
        <NewPassoword
          onHandleClose={closeForgotModalHandeler}
          onToggleForms={toggleFormHandler}
        />
      ) : (
        <SubmitEmail
          onHandleClose={closeForgotModalHandeler}
          onToggleForms={toggleFormHandler}
        />
      )}
    </Modal>
  );
};

export default ForgetPasswordModal;
