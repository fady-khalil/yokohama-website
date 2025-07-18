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
import { Placeholder } from "@phosphor-icons/react";

const EditProfileForm = () => {
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    value: firstNameInput,
    isValid: firstNameIsValid,
    isTouched: firstNameIsTouched,
    hasError: firstNameHasError,
    inputChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHanlder,
    reset: firstNameReset,
  } = useInput((value) => value.trim() !== "");
  const {
    value: lastNameInput,
    isValid: lastNameIsValid,
    isTouched: lastNameIsTouched,
    hasError: lastNameHasError,
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHanlder,
    reset: lastNameReset,
  } = useInput((value) => value.trim() !== "");

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
    value: birthdayInput,
    isValid: birthdayIsValid,
    isTouched: birthdayIsTouched,
    HasError: birthdayHasError,
    inputChangeHandler: birthdayChangeHandler,
    inputBlurHandler: birthdayBlurHandler,
    reset: birthdayReset,
  } = useInput((value) => {
    // Simple date validation (YYYY-MM-DD format)
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(value);
  });

  const dateOfBirthChangeHandler = (e) => {
    setDateOfBirth(e.target.value);
  };

  // handling edit profile
  const { userToken } = useContext(UserLoginContext);
  const { fetchData } = useGetDataToken();
  const { postData } = usePostDataTokenJson();

  const [profileData, setprofileData] = useState("");
  const formattedBirthday = new Date(birthdayInput)
    .toLocaleDateString("en-GB") // This will return dd/mm/yyyy
    .split("/") // Split into parts
    .join("/");

  const getUserProfileDataHandler = async () => {
    try {
      const data = await fetchData("yokohama/profile", userToken);
      setprofileData(data?.data);
      console.log(data?.data);
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    getUserProfileDataHandler();
  }, []);

  // Add this new useEffect to set phone state when profileData loads
  useEffect(() => {
    if (profileData?.phone) {
      setPhone(profileData.phone);
    }
  }, [profileData]);

  const [isLoading, setIsLoading] = useState(false);

  const editProfileHandler = async () => {
    const FormdDta = {
      first_name: firstNameInput || profileData?.first_name,
      last_name: lastNameInput || profileData?.last_name,
      phone: phone ? phone : profileData.phone,
      country_id: 126,
      birthday: formattedBirthday,
    };

    try {
      setIsLoading(true);
      const data = await postData("yokohama/edit_profile", FormdDta, userToken);
      if (data?.is_success) {
        getUserProfileDataHandler();
        setIsSuccess(true);
        firstNameReset();
        lastNameReset();
        emailReset();
        birthdayReset();
        setTimeout(() => {
          setIsSuccess(false);
        }, 2000);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  console.log(profileData?.phone);
  return (
    <div className="flex-1 border-b pb-12 lg:pb-0 lg:border-b-0  lg:border-r lg:pr-8">
      <div className="mb-6">
        <h6 className="text-2xl rb-bold">Personal Details</h6>
        {isSuccess && (
          <p className="text-sm rb-medium text-green-500">
            Profile has been successfully updated.
          </p>
        )}
      </div>

      <span className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
        <Input
          type="text"
          label="First Name"
          id="edit-first-name"
          value={firstNameInput}
          placeholder={profileData?.first_name}
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
          id="edit-last-name"
          value={lastNameInput}
          placeholder={profileData?.last_name}
          onChange={(e) => {
            lastNameChangeHandler(e);
            // clearErrors();
          }}
          onBlur={lastNameBlurHanlder}
          hasError={lastNameHasError}
          errorMessage=""
        />
      </span>

      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
        <div className="flex-1 flex gap-y-1 flex-col w-full">
          <label className="text-sm rb-bold capitalize">Phone</label>
          <PhoneInput
            inputClass="test"
            buttonClass="test-2"
            placeholder="Enter phone number"
            country={"lb"}
            value={phone || profileData?.phone}
            onChange={(phone) => setPhone(phone)}
          />
        </div>
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
      </div>
      <Input
        type="date"
        label={`Birthday / ${profileData?.birth_day}`}
        placeholder={"hello"}
        id="register-birthday"
        value={birthdayInput}
        onChange={(e) => {
          birthdayChangeHandler(e);
        }}
        onBlur={birthdayBlurHandler}
      />

      {/* <span>
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
      </span> */}
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
