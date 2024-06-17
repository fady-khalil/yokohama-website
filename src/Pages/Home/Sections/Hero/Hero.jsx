import Container from "Components/Container/Container";
import { useContext, useState } from "react";
import MainButton from "Components/Buttons/MainButton";
import WhiteButton from "Components/Buttons/WhiteButton";
import heroImage from "assests/hero.jpg";
import { EnvelopeSimple, CaretDoubleRight } from "@phosphor-icons/react";

import useInput from "form/Hooks/user-input";
import Input from "form/Inputs/Input";
const Hero = () => {
  const [activeNewsLetter, setActiveNewsletter] = useState(false);
  const handleNewsLetterView = () => {
    setActiveNewsletter((cur) => !cur);
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

  return (
    <section
      className="bg-cover bg-center h-[90vh] relative z-[10] overflow-hidden"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div
        className={`absolute w-full bottom-0 left-0 right-0 flex items-center flex-col justify-center text-white  text-xl ${
          activeNewsLetter ? "bg-transparent" : "bg-primary h-[16px]"
        }`}
      >
        <button
          onClick={handleNewsLetterView}
          className={`bg-primary p-1 mb-5 rounded-full ${
            activeNewsLetter ? "hidden" : ""
          }`}
        >
          <EnvelopeSimple />
        </button>

        <div
          className={`bg-lightDark w-full h-[50vh] flex items-center justify-center py-8 flex-col transition ease-in duration-300 ${
            activeNewsLetter
              ? "translate-y-0 visible select-auto h-auto relative"
              : "translate-y-[100%] select-none invisible h-0 absolute"
          }`}
        >
          <button
            onClick={handleNewsLetterView}
            className="text-black text-white absolute top-0 -translate-y-1/2 px-4 w-8 h-8 text-lg flex items-cenetr justify-center bg-lightDark rounded-full "
          >
            x
          </button>
          <p className="text-3xl rb-bold">Subscribe to our newsletter</p>
          <div className="flex items-stretch mt-14">
            <input
              className={
                " text-white p-2 rounded-tl-md rounded-bl-md bg-gray-700 placeholder:text-sm min-w-[25vw]"
              }
              type="email"
              placeholder={`Email`}
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
            <button className="bg-primary px-3 rounded-tr-md rounded-br">
              <CaretDoubleRight size={28} />
            </button>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-[#00000044] z-[-1]"></div>
      <Container className={"h-full"}>
        <div className="flex flex-col items-center justify-center h-full gap-y-14 w-[95%] md:w-[80%] lg:w-[70%] mx-auto">
          <h1 className="rb-bold text-white text-3xl ss:text-4xl lg:text-5xl text-center">
            WE BRING YOU PERFORMANCE YOU'VE BEEN DREAMING OF, ON AND OFF THE
            TRACK
          </h1>
          <div className="flex flex-col lg:flex-row items-center gap-3 md:gap-6">
            <MainButton to={"/shop"}>Shop Yokohama Tires</MainButton>
            <WhiteButton to={"/about-us"}>Learn More</WhiteButton>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
