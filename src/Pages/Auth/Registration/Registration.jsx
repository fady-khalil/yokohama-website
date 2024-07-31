import { useState, useContext } from "react";
import Input from "form/Inputs/Input";
import PasswordInput from "form/Inputs/PasswordInput";
import useInput from "form/Hooks/user-input";
import { X } from "@phosphor-icons/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import MainButton from "Components/Buttons/MainButton";
import { Link } from "react-router-dom";
import OutlineButton from "Components/Buttons/OutlineButton";

import usePostData from "Hooks/Fetching/usePostData";
import { UserLoginContext } from "context/Auth/UserLoginContext";

const Registration = ({ onToggleForms, onHandleClose }) => {
  const { handleUerData, setUserIsSignIn } = useContext(UserLoginContext);
  const { loading, error, postData } = usePostData();
  const [notValid, setNotValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const clearErrors = () => {
    setNotValid(false);
    setErrorMessage(null);
  };

  const clearInputs = () => {
    fullNameReset();
    passwordReset();
    confirmPasswordReset();
    emailReset();
    setPhone("");
  };

  const [rememberMe, setRememberMe] = useState(false);
  const [emailMarketing, setEmailMarketing] = useState(false);
  const [phone, setPhone] = useState("");

  const {
    value: fullNameInput,
    isValid: fullNameIsValid,
    isTouched: fullNameIsTouched,
    HasError: fullNameHasError,
    inputChangeHandler: fullNameChangeHandler,
    inputBlurHandler: fullNameBlurHanlder,
    reset: fullNameReset,
  } = useInput((value) => /^[a-zA-Z]+\s[a-zA-Z]+$/.test(value));
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
  const {
    value: confirmPasswordInput,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    inputChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    inputFocusHandler: confirmPasswordFocusHandler,
    isFocus: confirmPasswordIsFocus,
    reset: confirmPasswordReset,
  } = useInput((value) => {
    const isNotEmpty = value.trim() !== "";
    const isMatching = value === passwordInput;
    return isNotEmpty && isMatching;
  });

  const formIsValid =
    fullNameIsValid &&
    emailIsValid &&
    phone.length !== 0 &&
    passwordIsValid &&
    confirmPasswordIsValid;

  const submitForm = async () => {
    setErrorMessage(null);
    if (!formIsValid) {
      setNotValid(true);
      return;
    }
    const formData = {
      full_name: fullNameInput,
      password: passwordInput,
      confirm_password: confirmPasswordInput,
      email: emailInput,
      phone: phone,
    };
    try {
      const result = await postData("yokohama/auth/register", formData);
      if (result && result?.is_success) {
        handleUerData(result?.data);
        setUserIsSignIn(true);
        onHandleClose();
        clearInputs();
      } else {
        setErrorMessage(result?.message);
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };
  return (
    <div className="p-4  h-[90vh] overflow-scroll w-[90vw]  lg:h-auto lg:w-auto lg:overflow-auto lg:p-10">
      <div className="border-b border-[#ccc] pb-2 flex items-center justify-between mb-14">
        <div>
          <h5 className="text-3xl rb-bold">Sign up</h5>
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

        <button onClick={onHandleClose} className="text-2xl">
          <X weight="bold" />
        </button>
      </div>
      <form>
        <span className="flex flex-col lg:flex-row items-center gap-x-4 mb-8 lg:mb-14">
          <Input
            type="text"
            label={`Full Name`}
            id="register-full-name"
            value={fullNameInput}
            onChange={(e) => {
              fullNameChangeHandler(e);
              clearErrors();
            }}
            onBlur={fullNameBlurHanlder}
            hasError={fullNameHasError}
            errorMessage={``}
          />
          <Input
            type="email"
            label={`Email`}
            id="register-email"
            value={emailInput}
            onChange={(e) => {
              emailChangeHandler(e);
              clearErrors();
            }}
            onBlur={emailBlurHanlder}
            hasError={emailHasError}
            errorMessage={``}
          />

          <div className=" flex-1 flex gap-y-1 flex-col  w-full">
            <label className="text-sm rb-bold capitalize">Phone</label>
            <PhoneInput
              // containerClass="test"
              inputClass="test "
              buttonClass="test-2"
              country={"lb"}
              value={phone}
              onChange={(phone) => {
                setPhone(phone);
                clearErrors();
              }}
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
            />
          </div>
        </span>

        <span className="flex flex-col lg:flex-row items-center gap-x-4 mb-8 lg:mb-14">
          <PasswordInput
            id="register-password"
            value={passwordInput}
            label={`Password`}
            onChange={(e) => {
              passwordChangeHandler(e);
              clearErrors();
            }}
            onBlur={passwordBlurHandler}
            hasError={passwordHasError}
            errorMessage={``}
          />

          <PasswordInput
            id="register-confirm-password"
            value={confirmPasswordInput}
            label={`Confirm Password`}
            onChange={(e) => {
              confirmPasswordChangeHandler(e);
              clearErrors();
            }}
            onBlur={confirmPasswordBlurHandler}
            hasError={confirmPasswordHasError}
            errorMessage={``}
          />
        </span>
        {/* check box */}
        <div className="flex flex-col gap-y-6">
          <span>
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="select-none rb-medium">
              Remember Me
            </label>
          </span>

          <span>
            <input
              type="checkbox"
              id="emailMarketing"
              checked={emailMarketing}
              onChange={() => setEmailMarketing(!emailMarketing)}
              className="mr-2"
            />
            <label htmlFor="emailMarketing" className="select-none rb-medium">
              I will like to recieve product updates, news and promotional email
              from HMG,by signing up, you agree to our{" "}
              <Link className="underline rb-"> Terms & Conditions</Link>
            </label>
          </span>
        </div>
      </form>
      <div className="mt-8 lg:mt-16 flex flex-col lg:flex-row lg:items-center gap-y-2">
        <MainButton isLoading={loading} onClick={submitForm} isSmall={true}>
          Register
        </MainButton>

        <p className="text-center lg:w-[100px]">or</p>
        <OutlineButton isSmall={true} onClick={onToggleForms}>
          Sign in
        </OutlineButton>
      </div>
    </div>
  );
};

export default Registration;
