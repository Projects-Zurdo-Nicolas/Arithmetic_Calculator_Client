import React, { useState } from "react";
import { useForm } from "react-hook-form";
import OperationSelector from "../components/OperationSelector";
import Calculator from "../components/Calculator";
import { useOperations } from "../context/OperationsContext";

function OperationsFormPage() {
  const { register, handleSubmit } = useForm();
  const { createOperation } = useOperations();
  const [operationType, setOperationType] = useState("");
  const [values, setValues] = useState([]);

  const handleOperationSelect = (type) => {
    setOperationType(type);
    setValues([]); // Resetea los valores cuando se selecciona una nueva operación
  };

  const handleNewOperation = () => {
    setOperationType("");
    setValues([]);
  };

  const onSubmit = async () => {
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
      await createOperation(record);
      handleNewOperation(); // Reset after successful submission
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  
  /*
  async () => {
    const record = {
      type: operationType,
      values: values,
    };
    console.log("Enviando al backend:", record);
    await createOperation(record); // Enviamos la operación al backend
    setValues([]); // Resetea los valores después de enviar
  };

  */


  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      {!operationType ? (
        <OperationSelector onSelect={handleOperationSelect} />
      ) : (
        <>
          <form onSubmit={(e) => e.preventDefault()}>
            <Calculator
              register={register}
              operation={operationType}
              setValues={setValues}
              values={values}
            />
            <button
              type="button"
              onClick={onSubmit}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </form>
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
