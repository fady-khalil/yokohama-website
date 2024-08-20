import React, { useEffect } from "react";
import { useState } from "react";

import { Eye, EyeSlash } from "@phosphor-icons/react";

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
      <div className="px-2 py-2 rounded-sm bg-gray-200 flex items-center justify-between gap-x-4">
        <input
          className="text-black bg-transparent flex-1  "
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
          {!showPassword && <Eye size={22} />}
          {showPassword && <EyeSlash size={22} />}
        </span>
      </div>
      <p
        className={`text-xs text-red-500 ${
          hasError ? "opacity-100 " : "opacity-0"
        }`}
      >
        {errorMessage}
      </p>
    </div>
  );
};

export default PasswordInput;
