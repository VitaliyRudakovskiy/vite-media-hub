import React from "react";
import "./SelectButton.css";

const SelectButton = ({ label, value, children, style, ...rest }) => {
  return (
    <div className='w-full'>
      <p>{label}</p>
      <select className='selectButton' value={value} style={style} {...rest}>
        {children}
      </select>
    </div>
  );
};

export default SelectButton;
