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
    <span className={"flex-1 flex gap-y-1 flex-col  w-full"}>
      <label htmlFor={id} className="text-sm rb-bold capitalize">
        {label}
      </label>
      <input
        className={
          " text-white px-2 py-3 rounded-sm bg-gray-200 placeholder:text-sm "
        }
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
