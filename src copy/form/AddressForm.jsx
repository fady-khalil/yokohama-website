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
  const { userToken, userData, userIsSignIn } = useContext(UserLoginContext);
  const { postData } = usePostDataToken();
  const { postData: postQuestData } = usePostDataJson();
  const [phone, setPhone] = useState("");

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
    value: addressInput,
    isValid: addressIsValid,
    isTouched: addressIsTouched,
    HasError: addressHasError,
    inputChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHanlder,
    reset: addressReset,
  } = useInput((value) => value.trim("") !== "");

  const [selectAddress, setSelectAddress] = useState("");
  const onSelectingAddress = (address) => {
    setSelectAddress(address);
    addressChangeHandler({ target: { value: address } });
  };
  const [isClicked, setIsClicked] = useState(false);
  const [isValid, setIsValid] = useState(false);
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
    addressReset();
  };

  const formIsValid =
    firstNameIsValid && emailIsValid && addressIsValids && phone.length !== 0;

  const createNewBillingAddress = async () => {
    setIsClicked(true);
    if (!formIsValid) {
      setIsValid(true);
      return;
    }
    const formData = {
      name: `${firstNameInput}  ${lastNameInput}`,
      email: emailInput,
      phone: phone,
      street: addressInput || selectAddress,
      country_id: 126,
      city: "lebanon",
      zip: "0000",
    };

    const guestData = {
      shipping: formData,
      products: extraData,
    };

    try {
      setIsLoading(true);
      if (extraData) {
        const data = await postQuestData(route, guestData);
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

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            )
              .then((response) => response.json())
              .then((data) => {
                if (data && data.address) {
                  const address = data.address;
                  const fullAddress = [
                    address.road,
                    address.suburb,
                    address.city || address.town || address.village,
                    address.state,
                    address.country,
                    address.postcode,
                  ]
                    .filter(Boolean) // Remove any undefined or null values
                    .join(", ");
                  resolve(fullAddress);
                  onSelectingAddress(fullAddress);
                  setSelectAddress(fullAddress);
                } else {
                  reject("Address not found");
                }
              })
              .catch((error) => {
                reject(`Error fetching address: ${error}`);
              });
          },
          (error) => {
            reject(`Error getting geolocation: ${error.message}`);
          }
        );
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  };

  const useMyInfo = () => {
    if (userData) {
      firstNameChangeHandler({ target: { value: userData.first_name } });
      lastNameChangeHandler({ target: { value: userData.last_name } });
      emailChangeHandler({ target: { value: userData.email } });
      setPhone(userData.phone);
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
        {title && <p className="text-2xl rb-bold mt-secondary mb-4">{title}</p>}

        {userIsSignIn && (
          <div className="my-6">
            <button
              type="button"
              className="bg-primary text-white px-4 py-1   rounded"
              onClick={useMyInfo}
            >
              Use My Sign In Info
            </button>
          </div>
        )}

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
              hasError={(isClicked && !firstNameIsValid) || firstNameHasError}
              errorMessage={"Please enter a valid  name."}
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
              hasError={(isClicked && !lastNameIsValid) || lastNameHasError}
              errorMessage="Please enter a valid  name."
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
              errorMessage={
                "Please enter a valid email address (e.g., john.snow@example.com)."
              }
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
              <p
                className={`text-xs text-red-600 ${
                  isClicked && phone.length === 0 ? "opacity-1" : "opacity-0"
                }`}
              >
                Please enter a valid number
              </p>
            </div>
          </span>

          <span className="flex flex-col lg:flex-row  gap-4 mb-6">
            <span className="flex-1">
              <Textarea
                type="text"
                label="Address"
                extraLabel="use my current location"
                onGetLocation={getUserLocation}
                id="register-Address"
                value={selectAddress || addressInput}
                placeholder="Type your location, or pin it from the map"
                onChange={(e) => {
                  addressChangeHandler(e);
                  clearErrors();
                  setSelectAddress("");
                }}
                rows={2}
                onBlur={addressBlurHanlder}
                hasError={!addressIsValids && isClicked}
                errorMessage="This field is required"
              />
            </span>

            {/* <MapComponent onSelectingAddress={onSelectingAddress} /> */}
          </span>

          <div className="mt-12 flex w-1/4 mx-auto">
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
