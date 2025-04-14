import React from "react";

const Textarea = (props) => {
  const {
    boxStyle,
    inputStyle,
    label,
    name,
    id,
    placeholder,
    rows,
    value,
    onChange = () => {},
    onBlur = () => {},
    hasError = false,
    errorMessage = "error",
    extraLabel = "",
    onGetLocation = () => {},
  } = props;
  return (
    <span className={"flex-1 flex gap-y-1 flex-col  w-full"}>
      <span className="flex items-center gap-x-6">
        <label htmlFor={id} className="text-sm rb-bold capitalize">
          {label}
        </label>
        {extraLabel && (
          <button
            type="button"
            className="text-xs text-primary font-medium underline"
            onClick={onGetLocation}
          >
            {extraLabel}
          </button>
        )}
      </span>
      <textarea
        className={`px-2 py-2 rounded-sm bg-gray-200 placeholder:text-sm  ${
          hasError ? "border border-primary" : ""
        }`}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        wrap="soft"
      />

      <p
        className={`text-xs text-red-600 mt-1 mb-4  ${
          hasError ? "opacity-1 " : "opacity-0"
        }`}
      >
        {errorMessage}
      </p>
    </span>
  );
};

export default Textarea;
