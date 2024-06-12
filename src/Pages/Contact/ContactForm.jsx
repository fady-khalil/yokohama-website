import React, { useState } from "react";
import Container from "Components/Container/Container";
import Input from "form/Inputs/Input";
import Textarea from "form/Inputs/Textarea";
import SelectInput from "form/Inputs/SelectInput";
import useInput from "form/Hooks/user-input";
import MainButton from "Components/Buttons/MainButton";

const ContactForm = () => {
  const {
    value: firstNameInput,
    isValid: firstNameIsValid,
    isTouched: firstNameIsTouched,
    HasError: firstNameHasError,
    inputChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHanlder,
    reset: firstNameReset,
  } = useInput((value) => /^[a-zA-Z]+\s[a-zA-Z]+$/.test(value));
  const {
    value: lastNameInput,
    isValid: lastNameIsValid,
    isTouched: lastNameIsTouched,
    HasError: lastNameHasError,
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHanlder,
    reset: lastNameReset,
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
    value: messageInput,
    isValid: messageIsValid,
    isTouched: messageIsTouched,
    HasError: messageHasError,
    inputChangeHandler: messageChangeHandler,
    inputBlurHandler: messageBlurHanlder,
    reset: messageReset,
  } = useInput((value) => /^[a-zA-Z]+\s[a-zA-Z]+$/.test(value));

  const [inquiry, setInquiry] = useState();
  const inquiryOption = ["inquiry 1", "inquiry 2", "inquiry 3"];

  return (
    <div>
      <Container>
        <div className="py-secondary text-center">
          <h2 className="rb-bold text-3xl ">Message us</h2>
        </div>
        <form className="w-1/2 mx-auto mb-secondary">
          <span className="flex items-center gap-x-6">
            <Input
              type="text"
              label={`First Name`}
              id="contact-name"
              value={firstNameInput}
              onChange={(e) => {
                firstNameChangeHandler(e);
                // clearErrors();
              }}
              onBlur={firstNameBlurHanlder}
              hasError={firstNameHasError}
              errorMessage={``}
            />
            <Input
              type="text"
              label={`Last Name`}
              id="contact-last-name"
              value={firstNameInput}
              onChange={(e) => {
                lastNameChangeHandler(e);
                // clearErrors();
              }}
              onBlur={lastNameBlurHanlder}
              hasError={lastNameHasError}
              errorMessage={``}
            />
          </span>
          <span className="flex items-center gap-x-6">
            <Input
              type="email"
              label={`Email`}
              id="contact-email"
              value={emailInput}
              onChange={(e) => {
                emailChangeHandler(e);
                // clearErrors();
              }}
              onBlur={emailBlurHanlder}
              hasError={emailHasError}
              errorMessage={``}
            />
            <SelectInput label={"type of inquiry"} options={inquiryOption} />
          </span>

          <Textarea
            type="text"
            label={`Message`}
            id="contact-message"
            value={messageInput}
            onChange={(e) => {
              messageChangeHandler(e);
              // clearErrors();
            }}
            onBlur={messageBlurHanlder}
            hasError={messageHasError}
            errorMessage={``}
          />
        </form>
      </Container>
    </div>
  );
};

export default ContactForm;
