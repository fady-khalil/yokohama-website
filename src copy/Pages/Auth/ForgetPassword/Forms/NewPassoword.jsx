import { useState } from "react";
import image from "assests/listing/bg.jpg";
import useInput from "form/Hooks/user-input";
import { X } from "@phosphor-icons/react";
import PasswordInput from "form/Inputs/PasswordInput";

import MainButton from "Components/Buttons/MainButton";
const NewPassoword = ({ onHandleClose, onToggleForms }) => {
  // when the response return true to render the thank you page
  const [passwordIsDone, setPassowrdIsDone] = useState(false);
  const handlePassowrdIsDone = () => {
    setPassowrdIsDone(true);
  };
  // function to close the form and toggle to the begining
  const finalCloseHandler = () => {
    onToggleForms();
    onHandleClose();
  };
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
    <div className="relative w-[90vw] md:w-[60vw] lg:w-auto  z-[1000]">
      <div className="absolute left-0 top-0 w-full h-full z-[10]">
        <img className="w-full h-full object-cover" src={image} alt="" />
      </div>
      <div className="absolute w-full min-h-full top-0 left-0 bg-[#0000003e] z-[100]"></div>

      {passwordIsDone ? (
        <div className="lg:px-36 py-12 text-white relative z-[100]">
          <button
            onClick={finalCloseHandler}
            className="text-2xl w-max mx-auto mb-4 flex items-center justify-center text-center "
          >
            <X weight="bold" />
          </button>
          <div className="lg:mt-10">
            <h5 className="text-center rb-bold text-3xl">Thank You</h5>
            <p className="text-center rb-light text-sm ">
              Your Password have been changed{" "}
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 lg:p10 text-white relative z-[100]">
          <button
            onClick={onHandleClose}
            className="text-2xl w-max mx-auto mb-4 flex items-center justify-center text-center "
          >
            <X weight="bold" />
          </button>
          <h5 className="text-center rb-bold text-3xl">Forgot Your Password</h5>

          <form className="mt-6 min-w-[34vw]">
            <span className="flex items-center gap-x-4">
              <PasswordInput
                id="forgot-password"
                value={passwordInput}
                label={`New Password`}
                onChange={(e) => {
                  passwordChangeHandler(e);
                  // clearErrors();
                }}
                onBlur={passwordBlurHandler}
                hasError={passwordHasError}
                errorMessage={``}
              />

              <PasswordInput
                id="forgot-confirm-password"
                value={confirmPasswordInput}
                label={`Confirm New Password`}
                onChange={(e) => {
                  confirmPasswordChangeHandler(e);
                  // clearErrors();
                }}
                onBlur={confirmPasswordBlurHandler}
                hasError={confirmPasswordHasError}
                errorMessage={``}
              />
            </span>

            <div className="mt-4 flex">
              <MainButton onClick={handlePassowrdIsDone} isSmall={true}>
                Submit
              </MainButton>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default NewPassoword;
