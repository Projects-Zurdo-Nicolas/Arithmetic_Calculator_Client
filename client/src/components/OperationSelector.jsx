import React from "react";

function OperationSelector({ onSelect }) {
  const operations = [
    { type: "addition", label: "Addition" },
    { type: "subtraction", label: "Subtraction" },
    { type: "multiplication", label: "Multiplication" },
    { type: "division", label: "Division" },
    { type: "square_root", label: "Square Root" },
    { type: "random_string", label: "Random String" },
  ];

  return (
    <div>
      <h2 className="text-white mb-4 text-2xl font-bold">Select an Operation</h2>
      <ul>
        {operations.map((operation) => (
          <li key={operation.type}>
            <button
              className="mb-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => onSelect(operation.type)}
            >
              {operation.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OperationSelector;
