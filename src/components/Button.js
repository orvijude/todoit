import React from "react";

const Button = ({type, label, className, clickHandle }) => {
  return (
    <button
      type={type}
      className={className}
      onClick={clickHandle}
    >
      {label}
    </button>
  );
};

export default Button