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
  const [isClicked, setIsClicked] = useState(false);
  const clearErrors = () => {
    setNotValid(false);
    setErrorMessage(null);
    setIsClicked(false);
  };

  const clearInputs = () => {
    firstNameReset();
    lastNameReset();
    passwordReset();
    confirmPasswordReset();
    emailReset();
    setPhone("");
    birthdayReset();
  };

  const [rememberMe, setRememberMe] = useState(false);
  const [emailMarketing, setEmailMarketing] = useState(false);
  const [phone, setPhone] = useState("");

  const {
    value: firstNameInput,
    isValid: firstNameIsValid,
    isTouched: firstNameIsTouched,
    HasError: firstNameHasError,
    inputChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHanlder,
    reset: firstNameReset,
  } = useInput((value) => {
    const isValid = value.trim() !== "" && value.length >= 1;
    return isValid;
  });
  const {
    value: lastNameInput,
    isValid: lastNameIsValid,
    isTouched: lastNameIsTouched,
    HasError: lastNameHasError,
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHanlder,
    reset: lastNameReset,
  } = useInput((value) => {
    const isValid = value.trim() !== "" && value.length >= 1;
    return isValid;
  });
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
    value: birthdayInput,
    isValid: birthdayIsValid,
    isTouched: birthdayIsTouched,
    HasError: birthdayHasError,
    inputChangeHandler: birthdayChangeHandler,
    inputBlurHandler: birthdayBlurHandler,
    reset: birthdayReset,
  } = useInput((value) => {
    // Simple date validation (YYYY-MM-DD format)
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(value);
  });

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
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    phone.length !== 0 &&
    passwordIsValid &&
    birthdayIsValid &&
    confirmPasswordIsValid;

  const submitForm = async () => {
    setErrorMessage(null);
    setIsClicked(true);
    if (!formIsValid) {
      setNotValid(true);
      return;
    }

    const formattedBirthday = new Date(birthdayInput)
      .toLocaleDateString("en-GB") // This will return dd/mm/yyyy
      .split("/") // Split into parts
      .join("/"); // Join back to string (no need to reverse anymore)

    const formData = {
      first_name: firstNameInput,
      last_name: lastNameInput,
      password: passwordInput,
      confirm_password: confirmPasswordInput,
      birth_date: formattedBirthday,
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
    <div className="p-4 w-[70vw] lg:p-10">
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
        <span className="flex flex-col lg:flex-row items-center gap-x-4 mb-8 lg:mb-6">
          <Input
            type="text"
            label={`First Name`}
            id="register-first-name"
            value={firstNameInput}
            onChange={(e) => {
              firstNameChangeHandler(e);
              clearErrors();
            }}
            onBlur={firstNameBlurHanlder}
            hasError={(isClicked && !firstNameIsValid) || firstNameHasError}
            errorMessage="Please enter a valid  name."
          />
          <Input
            type="text"
            label={`Last Name`}
            id="register-last-name"
            value={lastNameInput}
            onChange={(e) => {
              lastNameChangeHandler(e);
              clearErrors();
            }}
            onBlur={lastNameBlurHanlder}
            hasError={(isClicked && !lastNameIsValid) || lastNameHasError}
            errorMessage="Please enter a name."
          />
        </span>

        <span className="flex flex-col lg:flex-row items-center gap-x-4 mb-8 lg:mb-6">
          <div className="flex-1  flex gap-y-1 flex-col  w-full">
            <label className="text-sm rb-bold capitalize">Phone</label>
            <PhoneInput
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
            <p
              className={`text-xs text-red-600 ${
                isClicked && phone.length === 0 ? "opacity-1" : "opacity-0"
              }`}
            >
              Please enter a valid number
            </p>
          </div>

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
            hasError={(isClicked && !emailIsValid) || emailHasError}
            errorMessage="Please enter a valid email address (e.g., john.snow@example.com)."
          />
        </span>
        <span className="block lg:w-1/2 mb-8 lg:mb-6">
          <Input
            type="date"
            label={`Birthday`}
            id="register-birthday"
            value={birthdayInput}
            onChange={(e) => {
              birthdayChangeHandler(e);
              clearErrors();
            }}
            onBlur={birthdayBlurHandler}
            hasError={(isClicked && !birthdayIsValid) || birthdayHasError}
            errorMessage="Please enter a valid date"
          />
        </span>

        <span className="flex flex-col lg:flex-row items-center gap-x-4 mb-8 lg:mb-6">
          <PasswordInput
            id="register-password"
            value={passwordInput}
            label={`Password`}
            onChange={(e) => {
              passwordChangeHandler(e);
              clearErrors();
            }}
            onBlur={passwordBlurHandler}
            hasError={(isClicked && !passwordIsValid) || passwordHasError}
            errorMessage="Password must be 8+ chars, letters, numbers & symbols.."
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
            hasError={
              (isClicked && !confirmPasswordIsValid) || confirmPasswordHasError
            }
            errorMessage="Passwords do not match. Please re-enter the same password."
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
