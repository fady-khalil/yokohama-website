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
import MapComponent from "Pages/MyCart/Location/Map";
import UseCountries from "Components/RequestHandler/GetCountries";
// context
import { UserLoginContext } from "context/Auth/UserLoginContext";
// fetching
import usePostDataToken from "Hooks/Fetching/usePostTokenData";
import usePostDataJson from "Hooks/Fetching/usePostDataJson";

const AddressForm = ({
  isIntial,
  route,
  row,
  onHandleSuccess,
  title,
  extraData,
}) => {
  // context
  const { userToken } = useContext(UserLoginContext);
  const { postData } = usePostDataToken();
  const { postData: postQuestData } = usePostDataJson();
  // form state
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const countries = UseCountries().map((country) => ({
    value: country?.id,
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
  } = useInput((value) => "");

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

  const [isLoading, setIsLoading] = useState(false);

  const clearInputs = () => {
    firstNameReset();
    lastNameReset();
    emailReset();
    setPhone("");
    zipReset();
    cityReset();
    setSelectedCountry("");
    addressReset();
  };

  const formIsValid =
    firstNameIsValid &&
    emailIsValid &&
    addressIsValids &&
    cityIsValid &&
    phone.length !== 0 &&
    selectedCountry?.value?.length !== 0 &&
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

    const guestData = {
      shipping: formData,
      products: extraData,
    };

    try {
      setIsLoading(true);
      if (extraData) {
        const data = await postQuestData(route, guestData);
        console.log(data);
        if (data?.is_success) {
          onHandleSuccess();
          clearInputs();
        }
      } else {
        const data = await postData(route, formData, userToken);
        if (data?.is_success) {
          onHandleSuccess();
          clearInputs();
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-[2]">
      {isIntial && (
        <div className="pb-secondary border-b border-black bg-yellow-100 w-1/2 p-4 ">
          <p className="text-xl ">
            Be aware! You are editing your billing and shipping addresses at the
            same time! If you want to modify your shipping address, create a new
            address.
          </p>
        </div>
      )}

      <div>
        {title && <p className="text-2xl rb-bold mt-secondary">{title}</p>}
        <div className="flex flex-wrap items-center gap-y-3 gap-x-6 my-6"></div>

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
              hasError={firstNameHasError || (!firstNameIsTouched && isClicked)}
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
              // hasError={lastNameHasError}
              errorMessage="write a valid field"
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

            <div className="flex-1 flex gap-y-1 flex-col w-full ">
              <label className="text-sm rb-bold capitalize">Phone</label>
              <PhoneInput
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
              {isClicked && phone.length === 0 && (
                <p
                  className={`text-xs text-red-600  mt-1 mb-4 opacity-100`}
                ></p>
              )}
              <p
                className={`text-xs text-red-600 opacity-0  ${
                  isClicked && phone.length === 0 && "opacity-1 "
                }`}
              >
                This field is required
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
                clearErrors();
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
                clearErrors();
              }}
              onBlur={cityBlurHanlder}
              hasError={cityHasError || (!cityIsTouched && isClicked)}
              errorMessage="This field is required"
            />
          </span>
          <div className="flex lg:w-1/2 flex-col gap-x-4 mb-16">
            <label className="text-sm rb-bold capitalize">Country</label>
            <Select
              className={`text-black  px-2 py-3 rounded-sm bg-gray-200 px-10 ${
                isClicked && !selectedCountry ? "border border-primary" : ""
              }`}
              options={countries}
              value={selectedCountry}
              onChange={countryChangeHandler}
              placeholder="Select a country"
            />
          </div>

          <span className="flex flex-col lg:flex-row  gap-4 mb-6">
            <span className="flex-1 -mt-6">
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
                rows={row}
                onBlur={addressBlurHanlder}
                // hasError={addressHasError}
                hasError={!addressIsValids && isClicked}
                errorMessage="This field is required"
              />
            </span>
            <MapComponent onSelectingAddress={onSelectingAddress} />
          </span>

          <div className="mt-6 flex w-1/4">
            <MainButton
              isLoading={isLoading}
              onClick={createNewBillingAddress}
              isSmall={true}
            >
              {extraData ? "confirm" : "Save"}
            </MainButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
