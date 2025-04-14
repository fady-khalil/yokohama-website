import { useState } from "react";
import Container from "Components/Container/Container";
import { getNames } from "country-list";
import useInput from "form/Hooks/user-input";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import MainButton from "Components/Buttons/MainButton";
import Input from "form/Inputs/Input";
import mapImage from "assests/about/map.jpeg";
import myCartData from "Constant/DealerCart";
import Textarea from "form/Inputs/Textarea";
const ShippingAndPayment = () => {
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [emailMarketing, setEmailMarketing] = useState(false);
  const countries = getNames().map((country) => ({
    label: country,
    value: country,
  }));

  const {
    value: firstNameInput,
    isValid: firstNameIsValid,
    isTouched: firstNameIsTouched,
    hasError: firstNameHasError,
    inputChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHanlder,
    reset: firstNameReset,
  } = useInput((value) => /^[a-zA-Z]+\s[a-zA-Z]+$/.test(value));
  const {
    value: lastNameInput,
    isValid: lastNameIsValid,
    isTouched: lastNameIsTouched,
    hasError: lastNameHasError,
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHanlder,
    reset: lastNameReset,
  } = useInput((value) => /^[a-zA-Z]+\s[a-zA-Z]+$/.test(value));

  const {
    value: emailInput,
    isValid: emailIsValid,
    isTouched: emailIsTouched,
    hasError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHanlder,
    reset: emailReset,
  } = useInput((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  const {
    value: zipInput,
    isValid: zipIsValid,
    isTouched: zipIsTouched,
    hasError: zipHasError,
    inputChangeHandler: zipChangeHandler,
    inputBlurHandler: zipBlurHanlder,
    reset: zipReset,
  } = useInput((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  const {
    value: cityInput,
    isValid: cityIsValid,
    isTouched: cityIsTouched,
    hasError: cityHasError,
    inputChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHanlder,
    reset: cityReset,
  } = useInput((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  const {
    value: addressInput,
    isValid: addressIsValid,
    isTouched: addressIsTouched,
    hasError: addressHasError,
    inputChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHanlder,
    reset: addressReset,
  } = useInput((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));

  const countryChangeHandler = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };
  return (
    <div className="py-secondary">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-[2]">
            <div className="pb-secondary border-b border-black">
              <div>
                <p className="text-2xl rb-bold mb-4">Payment Method</p>
                <div className="flex items-center flex-wrap gap-y-3 gap-x-6">
                  <label className="flex items-center space-x-2 ">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-white"
                    />
                    <span className={""}>Online Payment</span>
                  </label>
                  <label className="flex items-center space-x-2 ">
                    <input type="checkbox" className="form-checkbox h-4 w-4 " />
                    <span className={""}>Cash on delivery</span>
                  </label>
                </div>
              </div>

              <div className="bg-[#efefef] flex flex-col gap-y-3 text-sm rb-medium mt-6 p-4">
                <div className="flex flex-wrap  gap-3 border-b border-black pb-3">
                  <input
                    type="checkbox"
                    className="form-checkbox h-3 w-3 mt-1 text-white"
                  />
                  <span>
                    <p>4672 xxxx xxxx</p>
                    <p className="text-xs text-[#aaa]">Visa Card</p>
                  </span>
                  <p className="ml-8">exp: 12/05/2020</p>
                </div>
                <div className="flex flex-wrap  gap-3">
                  <input
                    type="checkbox"
                    className="form-checkbox h-3 w-3 mt-1  text-white"
                  />
                  <span>
                    <p>4672 xxxx xxxx</p>
                    <p className="text-xs text-[#aaa]">Visa Card</p>
                  </span>
                  <p className="ml-8">exp: 12/05/2020</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-2xl rb-bold mt-secondary">Shipping Address</p>
              <div className="flex flex-wrap items-center gap-y-3 gap-x-6 my-6">
                <label className="flex items-center space-x-2 ">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-white"
                  />
                  <span className={""}>Home Delivery</span>
                </label>
                <label className="flex items-center space-x-2 ">
                  <input type="checkbox" className="form-checkbox h-4 w-4 " />
                  <span className={""}>Install at the nearest dealer</span>
                </label>
              </div>

              <form className="">
                <span className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
                  <Input
                    type="text"
                    label="First Name"
                    id="register-first-name"
                    value={firstNameInput}
                    onChange={(e) => {
                      firstNameChangeHandler(e);
                      // clearErrors();
                    }}
                    onBlur={firstNameBlurHanlder}
                    hasError={firstNameHasError}
                    errorMessage=""
                  />
                  <Input
                    type="text"
                    label="Last Name"
                    id="register-last-name"
                    value={lastNameInput}
                    onChange={(e) => {
                      lastNameChangeHandler(e);
                      // clearErrors();
                    }}
                    onBlur={lastNameBlurHanlder}
                    hasError={lastNameHasError}
                    errorMessage=""
                  />
                </span>
                <span className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
                  <Input
                    type="email"
                    label="Email"
                    id="register-email"
                    value={emailInput}
                    onChange={(e) => {
                      emailChangeHandler(e);
                      // clearErrors();
                    }}
                    onBlur={emailBlurHanlder}
                    hasError={emailHasError}
                    errorMessage=""
                  />
                  <div className="flex-1 flex gap-y-1 flex-col w-full">
                    <label className="text-sm rb-bold capitalize">Phone</label>
                    <PhoneInput
                      inputClass="test"
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

                <span className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
                  <Input
                    type="text"
                    label="Zip code"
                    id="register-zip-code"
                    value={zipInput}
                    onChange={(e) => {
                      zipChangeHandler(e);
                      // clearErrors();
                    }}
                    onBlur={zipBlurHanlder}
                    hasError={zipHasError}
                    errorMessage=""
                  />
                  <Input
                    type="text"
                    label="City / state"
                    id="register-city"
                    value={cityInput}
                    onChange={(e) => {
                      cityChangeHandler(e);
                      // clearErrors();
                    }}
                    onBlur={cityBlurHanlder}
                    hasError={cityHasError}
                    errorMessage=""
                  />
                </span>
                <div className="flex lg:w-1/2 flex-col gap-x-4 mb-6">
                  <label className="text-sm rb-bold capitalize">Country</label>
                  <Select
                    className="text-black px-2 py-3 rounded-sm bg-gray-200 px-10"
                    options={countries}
                    value={selectedCountry}
                    onChange={countryChangeHandler}
                    placeholder="Select a country"
                  />
                </div>

                <span className="flex flex-col lg:flex-row  gap-4 mb-6">
                  <span className="flex-1">
                    <Textarea
                      type="text"
                      label="Address"
                      id="register-Address"
                      value={addressInput}
                      onChange={(e) => {
                        addressChangeHandler(e);
                        // clearErrors();
                      }}
                      onBlur={addressBlurHanlder}
                      hasError={addressHasError}
                      errorMessage=""
                    />
                  </span>

                  <div className="flex-1 flex flex-col i">
                    <p className="text-sm rb-bold capitalize mb-1">
                      Pin Location
                    </p>
                    <img className="h-3/4" src={mapImage} alt="" />
                  </div>
                </span>

                <label className="flex items-center space-x-2 ">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-white"
                  />
                  <span className={"block rb-medium"}>
                    use as billing address
                  </span>
                </label>

                <div className="mt-6 flex w-1/4">
                  <MainButton isSmall={true}>Save</MainButton>
                </div>
              </form>
            </div>
          </div>
          <div className="flex-1 h-fit sticky top-10 bg-dark border-t-4 border-primary p-6">
            <div className="border-b border-white pb-4">
              <div className="bg-white flex-col sm:flex-row gap-y-2 flex p-2 mb-3">
                <div className="flex-1">
                  <img src={myCartData.images[0]} alt="" />
                </div>
                <div className="flex-[2] rb-bold ">
                  <img className="w-1/2" src={myCartData.catLogo} alt="" />
                  <p className="rb-bold text-sm text-primary">
                    {myCartData.desc}
                  </p>
                  <p>GEOLANDAR - AT/G015</p>
                  <p>25$</p>
                  <p>QTY 2</p>
                </div>
              </div>
              <div className="bg-white flex flex-col sm:flex-row gap-y-2 p-2">
                <div className="flex-1">
                  <img src={myCartData.images[0]} alt="" />
                </div>
                <div className="flex-[2] rb-bold ">
                  <img className="w-1/2" src={myCartData.catLogo} alt="" />
                  <p className="rb-bold text-sm text-primary">
                    {myCartData.desc}
                  </p>
                  <p>GEOLANDAR - AT/G015</p>
                  <p>25$</p>
                  <p>QTY 2</p>
                </div>
              </div>
            </div>

            <div className="border-b border-white pb-4">
              <p className="text-white text-xl rb-bold mt-4 mb-2">
                Order Summury
              </p>

              <div className="mt-3">
                <span className="flex items-center justify-between text-[#aaa]">
                  <p>Subtotal</p>
                  <p>5000$</p>
                </span>
                <span className="flex items-center justify-between text-[#aaa]">
                  <p>Tax Vat</p>
                  <p>200$</p>
                </span>
                <span className="flex items-center justify-between text-[#aaa]">
                  <p>Shipping Charge</p>
                  <p>0</p>
                </span>
                <span className="flex items-center justify-between text-[#aaa]">
                  <p>Discount 10%</p>
                  <p>-1000$</p>
                </span>
              </div>
            </div>

            <div className="pb-4">
              <span className="flex items-center justify-between">
                <p className="text-white text-xl rb-bold mt-4 mb-2 uppercase">
                  Total
                </p>
                <p className="text-white text-xl rb-bold mt-4 mb-2">5000$</p>
              </span>
              <p className="text-[#aaa] text-sm">
                By completing this order you will earn 520 pts
              </p>
              <div className="mt-6 w-full flex-1 flex">
                <MainButton isSmall={true}>Continue to checkout</MainButton>
              </div>
              <button className="text-white rb-bold text-center underline mt-3 mx-auto flex items-center justify-center">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ShippingAndPayment;
