import { useContext, useState } from "react";
import { LoginContext } from "context/Auth/LoginContext";
import Modal from "Components/Modal/Modal";

// inner
import SignIn from "./SignIn/SignIn";
import Registration from "./Registration/Registration";

const AuthModal = () => {
  const { modalIsActive, closeModalHandeler } = useContext(LoginContext);
  const [toggleForms, setToggleForms] = useState(false);
  const toggleFormHandler = () => {
    setToggleForms((cur) => !cur);
  };
  return (
    <Modal isActive={modalIsActive} onHandleClose={closeModalHandeler}>
      <div>
        {toggleForms ? (
          <SignIn
            onHandleClose={closeModalHandeler}
            onToggleForms={toggleFormHandler}
          />
        ) : (
          <Registration
            onHandleClose={closeModalHandeler}
            onToggleForms={toggleFormHandler}
          />
        )}
      </div>
    </Modal>
  );
};

export default AuthModal;
