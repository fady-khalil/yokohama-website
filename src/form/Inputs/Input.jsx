import React from "react";

const Input = (props) => {
  const {
    boxStyle,
    inputStyle,
    type,
    name,
    id,
    label,
    placeholder,
    value,
    onChange = () => {},
    onBlur = () => {},
    hasError = false,
    errorMessage = "error",
  } = props;

  return (
    <span className={"flex gap-y-1 flex-col  w-full"}>
      {/* <label htmlFor={id} className="text-sm font-segu font-[700] capitalize">
        {label}
      </label> */}
      <input
        className={" text-black px-2 py-3 rounded-sm"}
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />

      <p
        className={`text-xs text-red  ${hasError ? "opacity-1 " : "opacity-0"}`}
      >
        {errorMessage}
      </p>
    </span>
  );
};

export default Input;
