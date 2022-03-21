import React from "react";

const Input = ({ label, type, name, placeholder, handleChange, pattern }) => {
  return (
    <>
      <div className="inputBox">
        <label className="label"> {label} </label>
        <input
          type={type}
          value={name}
          placeholder={placeholder}
          className="input"
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </>
  );
};

export default Input;
