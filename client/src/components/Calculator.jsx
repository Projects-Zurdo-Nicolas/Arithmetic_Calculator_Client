import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de tener importado Bootstrap

function Calculator({ operation, setValues, values, onSubmit, result }) {
  const [input, setInput] = useState("");
  const [minValue, setMinValue] = useState(""); 
  const [maxValue, setMaxValue] = useState(""); 

  const handleNumberClick = (number) => {
    setInput((prev) => prev + number);
  };

  const handleOperationClick = (operation) => {
    if (operation !== "random_string" && operation !== "square_root") {
      if (input !== "") {
        setValues([...values, parseFloat(input)]);
        setInput(""); 
      }
    }
  };

  const handleEqualClick = () => {
    if (operation === "random_string") {
      const finalValues = [parseFloat(minValue), parseFloat(maxValue)];
      setValues(finalValues);
      onSubmit(finalValues); 
    } else {
      let finalValues = [...values];
      if (input !== "") {
        finalValues = [...values, parseFloat(input)];
      }
      setValues(finalValues);
      onSubmit(finalValues); 
    }
    setInput(""); 
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
    <div className="mb-4 p-3 bg-dark rounded">
      {operation === "random_string" ? (
        <>
          <input
            type="number"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
            placeholder="Min Value"
            className="form-control mb-2"
          />
          <input
            type="number"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
            placeholder="Max Value"
            className="form-control mb-2"
          />
        </>
      ) : (
        <>
          <input
            type="text"
            value={input}
            readOnly
            className="form-control mb-4"
            placeholder="Input"
          />
          {result !== null && (
            <div className="bg-secondary text-white px-3 py-2 rounded mb-4">
              {renderOperationLabel()}
            </div>
          )}
        </>
      )}
      <div className="row">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <div className="col-4 mb-2" key={number}>
            <button
              className="btn btn-secondary w-100"
              onClick={() => handleNumberClick(number)}
            >
              {number}
            </button>
          </div>
        ))}
        {["addition", "subtraction", "multiplication", "division"].includes(operation) && (
          <div className="col-3 mb-2">
            <button
              className="btn btn-secondary w-100"
              onClick={() => handleOperationClick(operation)}
            >
              {operation === "addition" ? "+" : operation === "subtraction" ? "-" : operation === "multiplication" ? "*" : "/"}
            </button>
          </div>
        )}
        {operation === "square_root" && (
          <div className="col-3 mb-2">
            <button
              className="btn btn-secondary w-100"
              onClick={() => handleOperationClick(operation)}
            >
              √
            </button>
          </div>
        )}
        <div className="col-3 mb-2">
          <button
            className="btn btn-secondary w-100"
            onClick={handleEqualClick}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
