import React from "react";

const SelectInput = (props) => {
  const {
    label,
    options,
    name,
    id,
    placeholder,
    value,
    onChange = () => {},
    onBlur = () => {},
    hasError = false,
    errorMessage = "error",
  } = props;

  return (
    <span className="flex-1 flex gap-y-1 flex-col  w-full">
      <label htmlFor={id} className="text-sm rb-bold capitalize">
        {label}
      </label>
      <select
        className="text-black px-2 py-3 rounded-sm bg-gray-200 placeholder:text-sm"
        onChange={onChange}
        name={name}
        value={value || ""}
        id={id}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options?.map((option, index) => (
          <option className="text-sm" key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* <p
        className={`text-xs text-red  ${hasError ? "opacity-1 " : "opacity-0"}`}
      >
        {errorMessage}
      </p> */}
    </span>
  );
};

export default SelectInput;
