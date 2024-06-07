import { useState } from "react";
import Input from "form/Inputs/Input";
import PasswordInput from "form/Inputs/PasswordInput";
import useInput from "form/Hooks/user-input";
import { X } from "@phosphor-icons/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import MainButton from "Components/Buttons/MainButton";
import { Link } from "react-router-dom";
import OutlineButton from "Components/Buttons/OutlineButton";
const Registration = ({ onToggleForms, onHandleClose }) => {
  const [phone, setPhone] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailMarketing, setEmailMarketing] = useState(false);

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
  return (
    <div className="p-10">
      <div className="border-b border-[#ccc] pb-2 flex items-center justify-between mb-14">
        <h5 className="text-3xl rb-bold">Sign up</h5>

        <button onClick={onHandleClose} className="text-2xl">
          <X weight="bold" />
        </button>
      </div>
      <form>
        <span className="flex items-center gap-x-4 mb-14">
          <Input
            type="text"
            label={`Full Name`}
            id="register-full-name"
            value={fullNameInput}
            onChange={(e) => {
              fullNameChangeHandler(e);
              // clearErrors();
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
              // clearErrors();
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
              onChange={(phone) => setPhone(phone)}
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
            />
          </div>
        </span>

        <span className="flex items-center gap-x-4 mb-14">
          <PasswordInput
            id="register-password"
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

          <PasswordInput
            id="register-confirm-password"
            value={confirmPasswordInput}
            label={`Confirm Password`}
            onChange={(e) => {
              confirmPasswordChangeHandler(e);
              // clearErrors();
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
      <div className="mt-16 flex f items-center gap-y-2">
        <MainButton isSmall={true}>Register</MainButton>

        <p className="text-center w-[100px]">or</p>
        <OutlineButton isSmall={true} onClick={onToggleForms}>
          Sign in
        </OutlineButton>
      </div>
    </div>
  );
};

export default Registration;
