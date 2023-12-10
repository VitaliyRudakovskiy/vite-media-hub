import React from "react";
import PropTypes from "prop-types";
import "./Textarea.css";

const Textarea = ({
  label,
  placeholder,
  rows,
  cols,
  value,
  onChange,
  style,
  children,
  ...rest
}) => {
  return (
    <div className='flex flex-col'>
      <p>{label}</p>
      <textarea
        className='textarea'
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        value={value}
        style={style}
        onChange={onChange}
        autoCorrect='on'
        {...rest}>
        {children}
      </textarea>
    </div>
  );
};

Textarea.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
};

export default Textarea;
