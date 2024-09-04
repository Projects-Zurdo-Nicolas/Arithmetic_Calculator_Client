import React, { useState, useEffect } from "react";

function Calculator({ operation, setValues, values, onSubmit, result }) {
  const [input, setInput] = useState("");
  const [minValue, setMinValue] = useState(""); // Para valor aleatorio
  const [maxValue, setMaxValue] = useState(""); // Para valor aleatorio

  const handleNumberClick = (number) => {
    setInput((prev) => prev + number);
  };

  const handleOperationClick = (operation) => {
    if (operation !== "random_string" && operation !== "square_root") {
      if (input !== "") {
        setValues([...values, parseFloat(input)]);
        setInput(""); // Resetea el input para el siguiente número
      }
    }
  };

  const handleEqualClick = () => {
    if (operation === "random_string") {
      // Cuando la operación es 'random_string', envía los valores minValue y maxValue al backend
      const finalValues = [parseFloat(minValue), parseFloat(maxValue)];
      setValues(finalValues);
      onSubmit(finalValues); // Enviar los valores al backend
    } else {
      // Para otras operaciones, maneja los valores del input
      let finalValues = [...values];
      if (input !== "") {
        finalValues = [...values, parseFloat(input)];
      }
      setValues(finalValues);
      onSubmit(finalValues); // Enviar todos los valores acumulados al backend
    }
    setInput(""); // Resetea el input para una nueva operación
  };

  useEffect(() => {
    console.log("Valores acumulados:", values);
  }, [values]);

  const renderOperationLabel = () => {
    switch (operation) {
      case "addition":
        return `${values.join(" + ")}${input ? " + " + input : ""} = ${result}`;
      case "subtraction":
        return `${values.join(" - ")}${input ? " - " + input : ""} = ${result}`;
      case "multiplication":
        return `${values.join(" * ")}${input ? " * " + input : ""} = ${result}`;
      case "division":
        return `${values.join(" / ")}${input ? " / " + input : ""} = ${result}`;
      case "square_root":
        return `√${values[0]} = ${result}`;
      case "random_string":
        return `V.min = ${minValue}  V.max = ${maxValue} = ${result}`;
      default:
        return "";
    }
  };

  return (
    <div className="mb-4">
      {operation === "random_string" ? (
        <>
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
        </>
      ) : (
        <>
          <input
            type="text"
            value={input}
            readOnly
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
            placeholder="Input"
          />
          {result !== null && (
            <div className="bg-gray-800 text-white px-4 py-2 rounded-md mb-4">
              {renderOperationLabel()}
            </div>
          )}
        </>
      )}
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
        {["addition", "subtraction", "multiplication", "division"].includes(operation) && (
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded"
            onClick={() => handleOperationClick(operation)}
          >
            {operation === "addition" ? "+" : operation === "subtraction" ? "-" : operation === "multiplication" ? "*" : "/"}
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
