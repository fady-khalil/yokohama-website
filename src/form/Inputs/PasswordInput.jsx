import React, { useEffect } from "react";
import { useState } from "react";
// import { formStyle } from "../../style";
// import ShowPasswordIcon from "../../assests/SVG/Navigation/ShowPasswordIcon";
// import HidePasswordIcon from "../../assests/SVG/Navigation/HidePasswordIcon";

const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    boxStyle,
    inputStyle,
    label,
    name,
    id,
    placeholder,
    value,
    onChange = () => {},
    onBlur = () => {},
    onFocus = () => {},
    isFocus,
    hasError = false,
    errorMessage = "error",
  } = props;

  const handlePassword = () => {
    setShowPassword((cur) => !cur);
  };

  return (
    <div className={`flex-1 flex gap-y-1 flex-col  w-full`}>
      <label htmlFor={id} className="text-sm  capitalize rb-bold">
        {label}
      </label>
      <input
        className="text-black px-2 py-3 rounded-sm bg-gray-200 "
        id={id}
        type={`${showPassword ? "text" : "password"}`}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {/* <span className="cursor-pointer" onClick={() => handlePassword()}>
          {!showPassword && (
            <ShowPasswordIcon width={"1rem"} height={"1rem"} color={"#333"} />
          )}
          {showPassword && (
            <HidePasswordIcon width={"1rem"} height={"1rem"} color={"#333"} />
          )}
        </span> */}
      {/* <p className={`${formStyle.errorText} ${hasError ? "block " : "hidden"}`}>
        {errorMessage}
      </p> */}
    </div>
  );
};

export default PasswordInput;
