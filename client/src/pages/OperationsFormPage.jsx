import React, { useState } from "react";
import OperationSelector from "../components/OperationSelector";
import Calculator from "../components/Calculator";
import { useOperations } from "../context/OperationsContext";
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de tener importado Bootstrap

function OperationsFormPage() {
  const { createOperation } = useOperations();
  const [operationType, setOperationType] = useState("");
  const [values, setValues] = useState([]);
  const [operationLabel, setOperationLabel] = useState(""); 
  const [result, setResult] = useState(""); 

  const handleOperationSelect = (type) => {
    setOperationType(type);
    setValues([]);
    setOperationLabel("");
    setResult("");
  };

  const handleNewOperationAfteSelectType = () => {
    setValues([]);
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
        const formattedOperation = formatOperationLabel(operationType, values, response.result);
        setOperationLabel(formattedOperation);
        setResult(response.result);
      } else {
        console.error("Response from server is undefined or does not contain result");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert(`Error: ${error.response ? error.response.data.message : 'Unknown error occurred'}`);
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="bg-dark p-4 rounded">
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
                  <p className="text-lg font-weight-bold">Operation:</p>
                  <p>{operationLabel}</p>
                  <p className="text-lg font-weight-bold">Result:</p>
                  <input
                    type="text"
                    value={result}
                    readOnly
                    className="w-100 bg-secondary text-white px-4 py-2 rounded"
                  />
                </div>
                <button
                  className="mt-4 btn btn-success w-100"
                  onClick={handleNewOperation}
                >
                  Choose Another Operation
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OperationsFormPage;
