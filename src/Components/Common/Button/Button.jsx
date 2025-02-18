import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  as = "button",
  to,
  ...props
}) => {
  const baseStyles = "px-6 py-2 rounded-md border";

  const variants = {
    primary: "bg-primary text-white border-white",
    outline: "border-current",
  };

  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if (as === "link" && to) {
    return (
      <Link to={to} onClick={onClick} className={styles} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={styles} {...props}>
      {children}
    </button>
  );
};

export default Button;
