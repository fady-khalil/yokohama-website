import { useState, useContext, useEffect } from "react";
import MainButton from "Components/Buttons/MainButton";
import Input from "form/Inputs/Input";
import useInput from "form/Hooks/user-input";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import UseCountries from "Components/RequestHandler/GetCountries";

// fetching data and context
import { UserLoginContext } from "context/Auth/UserLoginContext";
import useGetDataToken from "Hooks/Fetching/useGetDataToken";
import usePostDataTokenJson from "Hooks/Fetching/usePostDataTokenJson";

const EditProfileForm = () => {
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [emailMarketing, setEmailMarketing] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const countries = UseCountries()?.map((country) => ({
    value: country?.id,
    label: country?.country_name,
  }));

  const {
    value: fullNameInput,
    isValid: fullNameIsValid,
    isTouched: fullNameIsTouched,
    hasError: fullNameHasError,
    inputChangeHandler: fullNameChangeHandler,
    inputBlurHandler: fullNameBlurHanlder,
    reset: fullNameReset,
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

  const dateOfBirthChangeHandler = (e) => {
    setDateOfBirth(e.target.value);
  };

  const countryChangeHandler = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  // handling edit profile
  const { userToken } = useContext(UserLoginContext);
  const { fetchData } = useGetDataToken();
  const { postData } = usePostDataTokenJson();

  const [profileData, setprofileData] = useState("");

  const getUserProfileDataHandler = async () => {
    try {
      const data = await fetchData("yokohama/profile", userToken);
      setprofileData(data?.data);
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    getUserProfileDataHandler();
  }, []);

  const userCountry = countries?.find(
    (country) => country.value === profileData.country_id
  );

  const [isLoading, setIsLoading] = useState(false);

  const editProfileHandler = async () => {
    const FormdDta = {
      name: fullNameInput,
      phone: phone,
      birth_day: setDateOfBirth,
      country_id: selectedCountry?.value,
    };

    try {
      setIsLoading(true);
      const data = await postData("yokohama/edit_profile", FormdDta, userToken);
      if (data?.is_success) {
        getUserProfileDataHandler();
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex-1 border-b pb-12 lg:pb-0 lg:border-b-0  lg:border-r lg:pr-8">
      <div className="mb-6">
        <h6 className="text-2xl rb-bold">Personal Details</h6>
      </div>

      <span className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
        <Input
          type="text"
          label="Full Name"
          id="register-full-name"
          value={fullNameInput}
          placeholder={profileData?.name}
          onChange={(e) => {
            fullNameChangeHandler(e);
            // clearErrors();
          }}
          onBlur={fullNameBlurHanlder}
          hasError={fullNameHasError}
          errorMessage=""
        />
        <Input
          type="email"
          label="Email"
          disabled
          id="register-email"
          placeholder={profileData?.email}
          value={emailInput}
          onChange={(e) => {
            emailChangeHandler(e);
            // clearErrors();
          }}
          onBlur={emailBlurHanlder}
          hasError={emailHasError}
          errorMessage=""
        />
      </span>
      <span className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
        <div className="flex-1 lg:items-center gap-x-4 ">
          <Input
            type="date"
            placeholder={profileData?.date}
            label="Date of Birth"
            id="register-dob"
            value={dateOfBirth}
            onChange={dateOfBirthChangeHandler}
            hasError={false}
            errorMessage=""
          />
        </div>

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
      <div className="flex flex-col gap-x-4 mb-6">
        <label className="text-sm rb-bold capitalize">Country</label>
        <Select
          className="text-black px-2 py-3 rounded-sm bg-gray-200 px-10"
          options={countries}
          value={selectedCountry}
          onChange={countryChangeHandler}
          placeholder={`${
            userCountry ? userCountry.label : "Select a country"
          }`}
        />
      </div>

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
          from HMG.
        </label>
      </span>
      <div className="mt-16 w-max ml-auto">
        <MainButton
          isLoading={isLoading}
          onClick={editProfileHandler}
          isSmall={true}
        >
          Save Change
        </MainButton>
      </div>
    </div>
  );
};

export default EditProfileForm;
