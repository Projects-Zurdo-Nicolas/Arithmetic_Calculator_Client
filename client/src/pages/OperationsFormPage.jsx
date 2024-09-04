import React, { useState } from "react";
import OperationSelector from "../components/OperationSelector";
import Calculator from "../components/Calculator";
import { useOperations } from "../context/OperationsContext";

function OperationsFormPage() {
  const { createOperation } = useOperations();
  const [operationType, setOperationType] = useState("");
  const [values, setValues] = useState([]);
  const [operationLabel, setOperationLabel] = useState(""); // Para mostrar la operación en el label
  const [result, setResult] = useState(""); // Para mostrar el resultado

  const handleOperationSelect = (type) => {
    setOperationType(type);
    setValues([]);
    setOperationLabel("");
    setResult("");
  };

  const handleNewOperationAfteSelectType = () => {
    setValues([]);
    //setOperationLabel("");
    //setResult(""); // Resetea el label al seleccionar una nueva operación
  };

  const handleNewOperation = () => {
    setOperationType("");
    setValues([]);
    setOperationLabel("");
    setResult("");
  };

  const onSubmit = async (values) => {
    if (values.length === 0) {
      console.error("No values provided");
      return;
    }

    const record = {
      type: operationType,
      values: values,
    };
    console.log("Data to send:", record);

    try {
      const response = await createOperation(record);
      console.log("Response: ", response)
      if (response && response.result !== undefined) {
        // Generar el label de la operación en función del tipo de operación
        const formattedOperation = formatOperationLabel(operationType, values, response.result);
        setOperationLabel(formattedOperation);
        setResult(response.result);
      } else {
        console.error("Response from server is undefined or does not contain result");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
    handleNewOperationAfteSelectType();
  };

  const formatOperationLabel = (operationType, values, result) => {
    switch (operationType) {
      case "addition":
        return `${values.join(" + ")} = ${result}`;
      case "subtraction":
        return `${values.join(" - ")} = ${result}`;
      case "multiplication":
        return `${values.join(" * ")} = ${result}`;
      case "division":
        return `${values.join(" / ")} = ${result}`;
      case "square_root":
        return `√${values[0]} = ${result}`;
      case "random_string":
        return `V.min = ${values[0]}  V.max = ${values[1]} = ${result}`;
      default:
        return "";
    }
  };

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      {!operationType ? (
        <OperationSelector onSelect={handleOperationSelect} />
      ) : (
        <>
          <Calculator
            operation={operationType}
            setValues={setValues}
            values={values}
            onSubmit={onSubmit}
          />
          <div className="mt-4 text-white">
            <p className="text-lg font-bold">Operation:</p>
            <p>{operationLabel}</p>
            <p className="text-lg font-bold">Result:</p>
            <input
              type="text"
              value={result}
              readOnly
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            />
          </div>
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleNewOperation}
          >
            Choose Another Operation
          </button>
        </>
      )}
    </div>
  );
}

export default OperationsFormPage;
