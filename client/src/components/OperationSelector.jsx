import React from "react";
import { Button } from 'react-bootstrap';

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
            <Button
              className="mb-2"
              variant="primary"
              onClick={() => onSelect(operation.type)}
            >
              {operation.label}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OperationSelector;
