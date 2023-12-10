import React from "react";
import "./Button.css";

const buttonTypes = {
  primary: "primary",
  secondary: "secondary",
  danger: "danger",
};

const Button = ({ children, type, variant, style, ...rest }) => {
  return (
    <button
      className={["button", `button--${buttonTypes[variant]}`].join(" ")}
      type={type === "submit" ? "submit" : "button"}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
