import React from "react";

const InputLabel = ({ name = "", label = "" }) => {
  return (
    <label htmlFor={name} className="text-sm  text-greys2 max-sm:ml-1 capitalize">
      {label}
    </label>
  );
};

export default InputLabel;
