import { useContext, useState } from "react";
import { ModalContext } from "context/Auth/ModalContext";
import { DealerLoginContext } from "context/Auth/DealerContext";
import Modal from "Components/Modal/Modal";
import useInput from "form/Hooks/user-input";
import Input from "form/Inputs/Input";

import PasswordInput from "form/Inputs/PasswordInput";
import { X } from "@phosphor-icons/react";
import MainButton from "Components/Buttons/MainButton";
import usePostData from "Hooks/Fetching/usePostData";

const DealerSiginModal = () => {
  const { setDealerIsSignIn, handleUerData } = useContext(DealerLoginContext);
  const { loading, error, postData } = usePostData();
  const [notValid, setNotValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const clearErrors = () => {
    setNotValid(false);
    setErrorMessage(null);
  };

  const { closeDealerModalHandeler, dealderModalIsActive } =
    useContext(ModalContext);

  const passwordValidator = (value) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/;
    return passwordPattern.test(value);
  };

  const {
    value: emailInput,
    isValid: emailIsValid,
    HasError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHanlder,
    reset: emailReset,
  } = useInput((value) => value.trim() !== 0);

  const {
    value: passwordInput,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput((value) => value.trim() !== 0);

  const submitForm = async () => {
    setErrorMessage(null);
    if (!emailIsValid && !passwordIsValid) {
      setNotValid(true);
      return;
    }

    const formData = {
      email: emailInput,
      password: passwordInput,
    };

    try {
      const result = await postData("yokohama/auth/login", formData);
      if (result && result?.is_success) {
        handleUerData(result?.data);
        setDealerIsSignIn(true);
        closeDealerModalHandeler();
      } else {
        setErrorMessage(result?.message);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <Modal
      isActive={dealderModalIsActive}
      onHandleClose={closeDealerModalHandeler}
    >
      <div className="p-4 lg:p-10 min-w-[90vw] sm:min-w-[60vw] lg:min-w-[30vw]">
        <div>
          <div className="flex items-center justify-between items-center">
            <h5 className="text-2xl rb-bold">Dealer Login</h5>
            <button onClick={closeDealerModalHandeler} className="text-2xl ">
              <X weight="bold" />
            </button>
          </div>

          {notValid && (
            <p className="text-red-600 text-sm">
              Please make sure inputs are valid
            </p>
          )}
          {errorMessage && (
            <p className="text-red-600 text-sm">{errorMessage}</p>
          )}

          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
        <form className=" flex flex-col mt-8">
          <Input
            type="email"
            label={`Email`}
            id="login-dealer-email"
            value={emailInput}
            onChange={(e) => {
              emailChangeHandler(e);
              clearErrors();
            }}
            onBlur={emailBlurHanlder}
            hasError={emailHasError}
            errorMessage={`please enter a valid email`}
          />

          <PasswordInput
            id="login-dealer-password"
            value={passwordInput}
            label={`Password`}
            onChange={(e) => {
              passwordChangeHandler(e);
              clearErrors();
            }}
            onBlur={passwordBlurHandler}
            hasError={passwordHasError}
            errorMessage={`Password is not valid`}
          />

          {/* <button
            // onClick={handleForgotPasswordModal}
            className="text-start text-sm font-medium"
          >
            Forgot your password ?
          </button> */}
        </form>

        <div className="mt-12 flex">
          <MainButton isLoading={loading} onClick={submitForm} isSmall={true}>
            SIGN IN
          </MainButton>
        </div>
      </div>
    </Modal>
  );
};

export default DealerSiginModal;
