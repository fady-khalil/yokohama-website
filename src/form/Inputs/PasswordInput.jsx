import React, { useEffect } from "react";
import { useState } from "react";
import { formStyle } from "../../style";
import ShowPasswordIcon from "../../assests/SVG/Navigation/ShowPasswordIcon";
import HidePasswordIcon from "../../assests/SVG/Navigation/HidePasswordIcon";

const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    boxStyle,
    inputStyle,

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
    <div className={`${boxStyle} `}>
      <div
        className={`flex items-center  justify-between w-full ${
          inputStyle ? inputStyle : `${formStyle.input}`
        } ${isFocus ? `${formStyle.isFocus} ` : ""} ${
          hasError ? `${formStyle.errorInput}` : ""
        }`}
      >
        <input
          className="w-full focus:outline-none"
          id={id}
          type={`${showPassword ? "text" : "password"}`}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        <span className="cursor-pointer" onClick={() => handlePassword()}>
          {!showPassword && (
            <ShowPasswordIcon width={"1rem"} height={"1rem"} color={"#333"} />
          )}
          {showPassword && (
            <HidePasswordIcon width={"1rem"} height={"1rem"} color={"#333"} />
          )}
        </span>
      </div>
      <p className={`${formStyle.errorText} ${hasError ? "block " : "hidden"}`}>
        {errorMessage}
      </p>
    </div>
  );
};

export default PasswordInput;
