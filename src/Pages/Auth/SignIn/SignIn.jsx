import { useContext, useState } from "react";
import image from "assests/Auth/2.jpg";
import Input from "form/Inputs/Input";
import useInput from "form/Hooks/user-input";
import PasswordInput from "form/Inputs/PasswordInput";
import { X } from "@phosphor-icons/react";
import MainButton from "Components/Buttons/MainButton";
import WhiteButton from "Components/Buttons/WhiteButton";
import { ModalContext } from "context/Auth/ModalContext";
import { UserLoginContext } from "context/Auth/UserLoginContext";
import usePostData from "Hooks/Fetching/usePostData";

const SignIn = ({ onToggleForms, onHandleClose }) => {
  const { handleUerData, setUserIsSignIn } = useContext(UserLoginContext);
  const { loading, error, postData } = usePostData();
  const [notValid, setNotValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const clearErrors = () => {
    setNotValid(false);
    setErrorMessage(null);
  };

  const clearInputs = () => {
    emailReset();
    passwordReset();
  };

  // forgot modal
  const { openForgotModalHandeler } = useContext(ModalContext);
  const handleForgotPasswordModal = (e) => {
    e.preventDefault();
    openForgotModalHandeler();
    onHandleClose();
  };
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
      console.log(result);
      if (result && result?.is_success) {
        handleUerData(result?.data);
        setUserIsSignIn(true);
        onHandleClose();
        clearInputs();
      } else {
        setErrorMessage(result?.message);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="flex flex-col flex-col-reverse w-[90vw] md:w-[60vw] lg:flex-row lg:w-auto">
      <div className="flex-1 p-4 lg:py-10">
        <div className="mb-10 px-10">
          <h5 className="text-3xl rb-bold  ">Sign in</h5>
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
        <form className="px-10 flex flex-col gap-y-4">
          <Input
            type="email"
            label={`Email`}
            id="login-email"
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
            id="login-password"
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

          <button
            onClick={handleForgotPasswordModal}
            className="text-start text-sm font-medium"
          >
            Forgot your password ?
          </button>
        </form>
        <div className="mt-6 px-10 flex">
          <MainButton isLoading={loading} onClick={submitForm} isSmall={true}>
            SIGN IN
          </MainButton>
        </div>
      </div>
      <div className="flex-1 relative">
        <button
          onClick={onHandleClose}
          className="text-2xl absolute right-6 top-6 text-white z-[100]"
        >
          <X weight="bold" />
        </button>
        <div className="absolute left-0 top-0 w-full h-full bg-[#00000071]"></div>
        <div className="absolute min-w-[fit-content] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[100]">
          <p className="text-white text-2xl rb-bold min-w-[max-content]">
            Don't have an account?
          </p>
          <div className="mt-6 flex">
            <WhiteButton isSmall={true} onClick={onToggleForms}>
              SIGN UP
            </WhiteButton>
          </div>
        </div>
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default SignIn;
