import React from "react";

const Input = ({ name, value, label, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        onChange={onChange}
        value={value}
        id={name}
        name={name}
        type="text"
        className="form-control"
      ></input>
    </div>
  );
};

export default Input;
