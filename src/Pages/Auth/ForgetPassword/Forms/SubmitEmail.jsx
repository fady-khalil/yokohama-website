import React from "react";
import image from "assests/Auth/2.jpg";
import Input from "form/Inputs/Input";
import useInput from "form/Hooks/user-input";
import { X } from "@phosphor-icons/react";

import MainButton from "Components/Buttons/MainButton";

const SubmitEmail = ({ onHandleClose, onToggleForms }) => {
  const {
    value: emailInput,
    isValid: emailIsValid,
    isTouched: emailIsTouched,
    HasError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHanlder,
    reset: emailReset,
  } = useInput((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  return (
    <div className="relative  z-[1000]">
      <div className="absolute left-0 top-0 w-full h-full z-[10]">
        <img className="w-full h-full object-cover" src={image} alt="" />
      </div>
      <div className="absolute w-full min-h-full top-0 left-0 bg-[#000000a2] z-[100]"></div>

      <div className="px-10 py-10 text-white relative z-[100]">
        <button
          onClick={onHandleClose}
          className="text-2xl w-max mx-auto mb-4 flex items-center justify-center text-center "
        >
          <X weight="bold" />
        </button>
        <h5 className="text-center rb-bold text-3xl">Forgot Your Password</h5>
        <p className="text-center rb-light text-sm ">
          enter your email to reset your Password
        </p>

        <form className="mt-6 min-w-[34vw]">
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

          <div className="mt-4 flex">
            <MainButton onClick={onToggleForms} isSmall={true}>
              Submit
            </MainButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitEmail;
