import React from "react";

function Button({ value, onClick }) {
  return (
    <button
      className="bg-blue-500 text-white p-2 m-1 rounded"
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
}

export default Button;
