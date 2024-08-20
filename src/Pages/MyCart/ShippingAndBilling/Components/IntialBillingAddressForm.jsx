import { useState, useContext, useEffect } from "react";
import Container from "Components/Container/Container";
import MainButton from "Components/Buttons/MainButton";
// form compnents
import useInput from "form/Hooks/user-input";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import Input from "form/Inputs/Input";
// UI components
import Textarea from "form/Inputs/Textarea";
import MapComponent from "../../Location/Map";
import UseCountries from "Components/RequestHandler/GetCountries";
// context
import { UserLoginContext } from "context/Auth/UserLoginContext";
// fetching
import usePostData from "Hooks/Fetching/usePostTokenData";
const IntialBillingAddressForm = () => {
  // context
  const { userToken } = useContext(UserLoginContext);
  const { postData } = usePostData();
  // form state
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [emailMarketing, setEmailMarketing] = useState(false);
  const countries = UseCountries().map((country) => ({
    value: country?.id, // You may want to use an ISO code or some identifier here
    label: country?.country_name,
  }));
  const {
    value: firstNameInput,
    isValid: firstNameIsValid,
    isTouched: firstNameIsTouched,
    HasError: firstNameHasError,
    inputChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHanlder,
    reset: firstNameReset,
  } = useInput((value) => value.trim("") !== "");
  const {
    value: lastNameInput,
    isValid: lastNameIsValid,
    isTouched: lastNameIsTouched,
    HasError: lastNameHasError,
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHanlder,
    reset: lastNameReset,
  } = useInput((value) => value.trim("") !== "");

  const {
    value: emailInput,
    isValid: emailIsValid,
    isTouched: emailIsTouched,
    HasError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHanlder,
    reset: emailReset,
  } = useInput((value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  });
  const {
    value: zipInput,
    isValid: zipIsValid,
    isTouched: zipIsTouched,
    HasError: zipHasError,
    inputChangeHandler: zipChangeHandler,
    inputBlurHandler: zipBlurHanlder,
    reset: zipReset,
  } = useInput((value) => value.trim("") !== "");
  const {
    value: cityInput,
    isValid: cityIsValid,
    isTouched: cityIsTouched,
    HasError: cityHasError,
    inputChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHanlder,
    reset: cityReset,
  } = useInput((value) => value.trim("") !== "");
  const {
    value: addressInput,
    isValid: addressIsValid,
    isTouched: addressIsTouched,
    HasError: addressHasError,
    inputChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHanlder,
    reset: addressReset,
  } = useInput((value) => value.trim("") !== "");

  const countryChangeHandler = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const [selectAddress, setSelectAddress] = useState("");
  const onSelectingAddress = (address) => {
    setSelectAddress(address);
  };
  const [isClicked, setIsClicked] = useState(false);
  const addressIsValids = addressIsValid || selectAddress.length !== 0;
  const clearErrors = () => {
    setIsClicked(false);
  };
  const formIsValid =
    firstNameIsValid &&
    emailIsValid &&
    addressIsValids &&
    cityIsValid &&
    selectedCountry?.value.length !== 0 &&
    zipIsValid;

  const createNewBillingAddress = async () => {
    setIsClicked(true);
    if (!formIsValid) {
      alert("Please make sure all filed are filled");
      return;
    }
    const formData = {
      name: `${firstNameInput}  ${lastNameInput}`,
      email: emailInput,
      phone: phone,
      street: addressInput || selectAddress,
      city: cityInput,
      country_id: selectedCountry?.value,
      zip: zipInput,
    };

    try {
      const data = await postData(
        "yokohama/shipping/billing_address",
        formData,
        userToken
      );
      if (data?.is_success) {
        console.log("success");
      }
    } catch (error) {
    } finally {
    }
  };

  return (
    <div className="flex-[2]">
      <div className="">
        <Container>
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="flex-[2]">
              <div className="pb-secondary border-b border-black bg-yellow-100 w-1/2 p-4 ">
                <p className="text-xl ">
                  Be aware! You are editing your billing and shipping addresses
                  at the same time! If you want to modify your shipping address,
                  create a new address.
                </p>
                {/* <div>
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
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 "
                      />
                      <span className={""}>Cash on delivery</span>
                    </label>
                  </div>
                </div> */}

                {/* <div className="bg-[#efefef] flex flex-col gap-y-3 text-sm rb-medium mt-6 p-4">
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
          </div> */}
              </div>

              <div>
                <p className="text-2xl rb-bold mt-secondary">Billing Address</p>
                <div className="flex flex-wrap items-center gap-y-3 gap-x-6 my-6">
                  {/* <label className="flex items-center space-x-2 ">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-white"
                    />
                    <span className={""}>Home Delivery</span>
                  </label>
                  <label className="flex items-center space-x-2 ">
                    <input type="checkbox" className="form-checkbox h-4 w-4 " />
                    <span className={""}>Install at the nearest dealer</span>
                  </label> */}
                </div>

                <form className="">
                  <span className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
                    <Input
                      type={"text"}
                      id={"first-name-bollomng"}
                      label={"First Name"}
                      value={firstNameInput}
                      // placeholder={"Dealer Name"}
                      onChange={(event) => {
                        firstNameChangeHandler(event);
                        clearErrors();
                      }}
                      onBlur={firstNameBlurHanlder}
                      hasError={
                        firstNameHasError || (!firstNameIsTouched && isClicked)
                      }
                      errorMessage={"This field is required"}
                    />
                    <Input
                      type="text"
                      label="Last Name"
                      id="billing-last-name"
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
                      label="Email"
                      type="email"
                      id="billing-email"
                      value={emailInput}
                      onChange={(event) => {
                        emailChangeHandler(event);
                        clearErrors();
                      }}
                      hasError={emailHasError || (!emailIsTouched && isClicked)}
                      onBlur={emailBlurHanlder}
                      errorMessage={"This field is required"}
                    />

                    <div className="flex-1 flex gap-y-1 flex-col w-full">
                      <label className="text-sm rb-bold capitalize">
                        Phone
                      </label>
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
                      <p
                        className={`text-xs text-red-600 mt-1 mb-4  opacity-0`}
                      >
                        asdas
                      </p>
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
                      hasError={zipHasError || (!zipIsTouched && isClicked)}
                      errorMessage="This field is required"
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
                      hasError={cityHasError || (!cityIsTouched && isClicked)}
                      errorMessage="This field is required"
                    />
                  </span>
                  <div className="flex lg:w-1/2 flex-col gap-x-4 mb-6">
                    <label className="text-sm rb-bold capitalize">
                      Country
                    </label>
                    <Select
                      className={`text-black  px-2 py-3 rounded-sm bg-gray-200 px-10 ${
                        isClicked && !selectedCountry
                          ? "border border-primary"
                          : ""
                      }`}
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
                        value={selectAddress || addressInput}
                        placeholder="Type your loaction, or pin it from the map"
                        onChange={(e) => {
                          addressChangeHandler(e);
                          clearErrors();
                          setSelectAddress("");
                        }}
                        onBlur={addressBlurHanlder}
                        // hasError={addressHasError}
                        hasError={!addressIsValids && isClicked}
                        errorMessage="This field is required"
                      />
                    </span>
                    <MapComponent onSelectingAddress={onSelectingAddress} />
                  </span>

                  {/* <label className="flex items-center space-x-2 ">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-white"
                    />
                    <span className={"block rb-medium"}>
                      use as billing address
                    </span>
                  </label> */}

                  <div className="mt-6 flex w-1/4">
                    <MainButton
                      onClick={createNewBillingAddress}
                      isSmall={true}
                    >
                      Save
                    </MainButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default IntialBillingAddressForm;
