import React, { useState } from "react";
import Container from "Components/Container/Container";
import Input from "form/Inputs/Input";
import Textarea from "form/Inputs/Textarea";
import SelectInput from "form/Inputs/SelectInput";
import useInput from "form/Hooks/user-input";
import bg from "assests/details/1.jpg";
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
    <div className="relative border border-transparent overflow-hidden max-w-[100vw]">
      <div className="absolute right-0 bottom-0 w-[32rem] h-[32rem] z-[0]">
        <img src={bg} alt="" className="w-full h-full" />
      </div>
      <Container className="relative z-[10]">
        <div className="py-secondary text-center">
          <h2 className="rb-bold text-3xl ">Message us</h2>
        </div>
        <form className=" mb-secondary">
          <div className="lg:w-1/2 mx-auto">
            <span className="flex flex-col lg:flex-row items-center gap-x-6">
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
            <span className="flex flex-col lg:flex-row items-center gap-x-6">
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
          </div>
        </form>
      </Container>
    </div>
  );
};

export default ContactForm;
