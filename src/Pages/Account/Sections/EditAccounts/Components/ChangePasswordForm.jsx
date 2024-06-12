import PasswordInput from "form/Inputs/PasswordInput";
import useInput from "form/Hooks/user-input";
import MainButton from "Components/Buttons/MainButton";

const ChangePasswordForm = () => {
  const {
    value: oldPasswordInput,
    isValid: oldPasswordIsValid,
    hasError: oldPasswordHasError,
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
    hasError: passwordHasError,
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
    hasError: confirmPasswordHasError,
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
  return (
    <div className="flex-1 lg:pl-8">
      <div className="mb-6">
        <h6 className="text-2xl rb-bold ">Change Password</h6>
      </div>

      <span className="lg:w-1/2 block">
        <PasswordInput
          id="old-password"
          value={oldPasswordInput}
          label={`Old Password`}
          onChange={(e) => {
            oldPasswordChangeHandler(e);
            // clearErrors();
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
            // clearErrors();
          }}
          onBlur={passwordBlurHandler}
          hasError={passwordHasError}
          errorMessage={``}
        />

        <PasswordInput
          id="register-confirm-password"
          value={confirmPasswordInput}
          label={`Confirm New Password`}
          onChange={(e) => {
            confirmPasswordChangeHandler(e);
            // clearErrors();
          }}
          onBlur={confirmPasswordBlurHandler}
          hasError={confirmPasswordHasError}
          errorMessage={``}
        />
      </span>

      <div className="mt-16">
        <MainButton isSmall={true}>Save Change</MainButton>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
