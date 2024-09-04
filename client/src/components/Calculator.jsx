import React, { useState, useEffect } from "react";

function Calculator({ register, operation, setValues, values }) {
  const [input, setInput] = useState("");
  const [minValue, setMinValue] = useState(""); // Para valor aleatorio
  const [maxValue, setMaxValue] = useState(""); // Para valor aleatorio

  const handleNumberClick = (number) => {
    setInput((prev) => prev + number);
  };

  const handleOperationClick = (operation) => {
    if (operation === "random_string") {
      // No hacer nada en este caso
    } else if (operation === "square_root") {
      if (input !== "") {
        setValues([parseFloat(input)]);
        setInput("");
      }
    } else {
      if (input !== "") {
        setValues((prev) => [...prev, parseFloat(input)]);
        setInput("");
      }
    }
  };

  const handleEqualClick = () => {
    if (operation === "random_string") {
      if (minValue !== "" && maxValue !== "") {
        setValues([parseFloat(minValue), parseFloat(maxValue)]);
        setMinValue("");
        setMaxValue("");
      }
    } else if (operation === "square_root") {
      if (input !== "") {
        setValues([parseFloat(input)]);
        setInput("");
      }
    } else {
      if (input !== "") {
        setValues((prev) => [...prev, parseFloat(input)]);
        setInput("");
      }
    }
  };

  useEffect(() => {
    console.log("Valores acumulados:", values);
  }, [values]);

  return (
    <div className="mb-4">
      <input
        type="text"
        value={input}
        readOnly
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
        placeholder="Input"
      />
      {operation === "random_string" ? (
        <div className="mb-4">
          <input
            type="number"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
            placeholder="Min Value"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-2"
          />
          <input
            type="number"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
            placeholder="Max Value"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-2"
          />
        </div>
      ) : null}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <button
            key={number}
            className="bg-gray-700 text-white px-4 py-2 rounded"
            onClick={() => handleNumberClick(number)}
          >
            {number}
          </button>
        ))}
        {operation === "addition" && (
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded"
            onClick={() => handleOperationClick(operation)}
          >
            +
          </button>
        )}
        {operation === "subtraction" && (
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded"
            onClick={() => handleOperationClick(operation)}
          >
            -
          </button>
        )}
        {operation === "multiplication" && (
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded"
            onClick={() => handleOperationClick(operation)}
          >
            *
          </button>
        )}
        {operation === "division" && (
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded"
            onClick={() => handleOperationClick(operation)}
          >
            /
          </button>
        )}
        {operation === "square_root" && (
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded"
            onClick={() => handleOperationClick(operation)}
          >
            √
          </button>
        )}
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded"
          onClick={handleEqualClick}
        >
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;
