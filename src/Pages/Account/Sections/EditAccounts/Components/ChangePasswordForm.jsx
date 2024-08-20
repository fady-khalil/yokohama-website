import PasswordInput from "form/Inputs/PasswordInput";
import useInput from "form/Hooks/user-input";
import MainButton from "Components/Buttons/MainButton";
import { useState, useContext } from "react";
import { UserLoginContext } from "context/Auth/UserLoginContext";
import usePostDataToken from "Hooks/Fetching/usePostTokenData";
import Spinner from "Components/RequestHandler/Spinner";
const ChangePasswordForm = () => {
  const { postData } = usePostDataToken();
  const { userToken } = useContext(UserLoginContext);
  const {
    value: oldPasswordInput,
    isValid: oldPasswordIsValid,
    HasError: oldPasswordHasError,
    inputChangeHandler: oldPasswordChangeHandler,
    inputBlurHandler: oldPasswordBlurHandler,
    inputFocusHandler: oldPasswordFocusHandler,
    isFocus: oldPasswordIsFocus,
    reset: oldPasswordReset,
  } = useInput((value) => {
    const isValid = value.trim() !== "" && value.length >= 1;
    return isValid;
  });
  const {
    value: passwordInput,
    isValid: passwordIsValid,
    HasError: passwordHasError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    inputFocusHandler: passwordFocusHandler,
    isFocus: passwordIsFocus,
    reset: passwordReset,
  } = useInput((value) => {
    const isValid = value.trim() !== "" && value.length >= 1;
    return isValid;
  });
  const {
    value: confirmPasswordInput,
    isValid: confirmPasswordIsValid,
    HasError: confirmPasswordHasError,
    inputChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    inputFocusHandler: confirmPasswordFocusHandler,
    isFocus: confirmPasswordIsFocus,
    reset: confirmPasswordReset,
  } = useInput((value) => {
    const isNotEmpty = value.trim() !== "";
    const isMatching = value === passwordInput;
    return isNotEmpty && isMatching;
  });

  const [formIsNotValid, formIsNotValidd] = useState(false);
  const [formSuccsess, setFormSucess] = useState();
  const [failedMessage, setFailedMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const clearErrors = () => {
    formIsNotValidd(false);
    setFailedMessage("");
  };

  const changePasswordHandler = async () => {
    formIsNotValidd(false);
    setIsLoading(true);
    try {
      if (!oldPasswordIsValid || !passwordIsValid || !confirmPasswordIsValid) {
        formIsNotValidd(true);
        return;
      }
      const data = {
        password: oldPasswordInput,
        new_password: passwordInput,
        confirm_password: confirmPasswordInput,
      };

      const responseData = await postData(
        "yokohama/auth/new_password",
        data,
        userToken
      );
      if (responseData?.is_success) {
        oldPasswordReset();
        passwordReset();
        confirmPasswordReset();
        setFormSucess(true);
        setTimeout(() => {
          setFormSucess(false);
        }, 3000);
      } else {
        setFailedMessage(responseData?.message);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex-1 lg:pl-8">
      <div className="mb-6">
        <h6 className="text-2xl rb-bold ">Change Password</h6>
        {formIsNotValid && (
          <p className="text-red-400 text-sm">
            Please make all fileds are filled
          </p>
        )}
        {formSuccsess && (
          <p className="text-green-400 text-sm">
            Your password has been changed successfully
          </p>
        )}
        {failedMessage && (
          <p className="text-red-400 text-sm">{failedMessage}</p>
        )}
      </div>

      <span className="lg:w-1/2 block">
        <PasswordInput
          id="old-password"
          value={oldPasswordInput}
          label={`Old Password`}
          onChange={(e) => {
            oldPasswordChangeHandler(e);
            clearErrors();
          }}
          onBlur={oldPasswordBlurHandler}
          hasError={oldPasswordHasError}
          errorMessage={``}
        />
      </span>

      <span className="flex flex-col lg:flex-row items-center gap-x-4 mt-6">
        <PasswordInput
          id="register-password"
          value={passwordInput}
          label={`New Password`}
          onChange={(e) => {
            passwordChangeHandler(e);
            clearErrors();
          }}
          onBlur={passwordBlurHandler}
          hasError={passwordHasError}
          errorMessage={`this field is required `}
        />

        <PasswordInput
          id="register-confirm-password"
          value={confirmPasswordInput}
          label={`Confirm New Password`}
          onChange={(e) => {
            confirmPasswordChangeHandler(e);
            clearErrors();
          }}
          onBlur={confirmPasswordBlurHandler}
          hasError={confirmPasswordHasError}
          errorMessage={"Passowrd Not Matching"}
        />
      </span>

      <div className="mt-16 w-max ml-auto">
        <MainButton
          isLoading={isLoading}
          onClick={changePasswordHandler}
          isSmall={true}
        >
          Save Change
        </MainButton>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
