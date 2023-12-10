import React from "react";
import PropTypes from "prop-types";
import "./Input.css";

const Input = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  style,
  ...rest
}) => {
  return (
    <div className='inputContainer'>
      <p>{label}</p>
      <input
        name={name}
        className='input'
        type={
          type === "password" ? "password" : type === "email" ? "email" : "text"
        }
        style={style}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  style: PropTypes.object,
};

export default Input;
