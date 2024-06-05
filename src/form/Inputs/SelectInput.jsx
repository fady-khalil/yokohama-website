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
    <span className="flex gap-y-1 flex-col  w-full">
      <select
        className="bg-[#3A3A3A] text-white flex-1  px-10 flex items-center justify-center py-4 rounded-sm"
        onChange={onChange}
        name={name}
        value={value}
        id={id}
      >
        <option value="" disabled selected>
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
