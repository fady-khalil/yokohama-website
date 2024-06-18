import { useContext, useState } from "react";
import { LoginContext } from "context/Auth/LoginContext";
import { DealerLoginContext } from "context/Auth/DealerContext";
import Modal from "Components/Modal/Modal";
import useInput from "form/Hooks/user-input";
import Input from "form/Inputs/Input";

import PasswordInput from "form/Inputs/PasswordInput";
import { X } from "@phosphor-icons/react";
import MainButton from "Components/Buttons/MainButton";

const DealerSiginModal = () => {
  const { handleDealderSignIn } = useContext(DealerLoginContext);
  const {
    openDealerModalHandeler,
    closeDealerModalHandeler,
    dealderModalIsActive,
  } = useContext(LoginContext);

  const {
    value: emailInput,
    isValid: emailIsValid,
    isTouched: emailIsTouched,
    HasError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHanlder,
    reset: emailReset,
  } = useInput((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));

  const {
    value: passwordInput,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    inputFocusHandler: passwordFocusHandler,
    isFocus: passwordIsFocus,
    reset: passwordReset,
  } = useInput((value) => {
    const isValid = value.trim() !== "" && value.length >= 1;
    return isValid;
  });

  return (
    <Modal
      isActive={dealderModalIsActive}
      onHandleClose={closeDealerModalHandeler}
    >
      <div className="p-4 lg:p-10 min-w-[90vw] sm:min-w-[60vw] lg:min-w-[30vw]">
        <div className="flex items-center justify-between items-center">
          <h5 className="text-2xl rb-bold">Dealer Login</h5>
          <button onClick={closeDealerModalHandeler} className="text-2xl ">
            <X weight="bold" />
          </button>
        </div>
        <form className=" flex flex-col gap-y-4 mt-8">
          <Input
            type="email"
            label={`Email`}
            id="login-email"
            value={emailInput}
            onChange={(e) => {
              emailChangeHandler(e);
              // clearErrors();
            }}
            onBlur={emailBlurHanlder}
            hasError={emailHasError}
            errorMessage={``}
          />

          <PasswordInput
            id="login-password"
            value={passwordInput}
            label={`Password`}
            onChange={(e) => {
              passwordChangeHandler(e);
              // clearErrors();
            }}
            onBlur={passwordBlurHandler}
            hasError={passwordHasError}
            errorMessage={``}
          />

          <button
            // onClick={handleForgotPasswordModal}
            className="text-start text-sm font-medium"
          >
            Forgot your password ?
          </button>
        </form>

        <div className="mt-8 flex">
          <MainButton onClick={handleDealderSignIn} isSmall={true}>
            SIGN IN
          </MainButton>
        </div>
      </div>
    </Modal>
  );
};

export default DealerSiginModal;
