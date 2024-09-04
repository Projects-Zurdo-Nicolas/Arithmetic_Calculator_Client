import { createContext, useContext, useState } from "react";
import {
  saveRecordRequest,
  getRecordsRequest,
  deleteRecordRequest,
} from "../api/record";

const OperationContext = createContext();

export const useOperations = () => {
  const context = useContext(OperationContext);

  if (!context) {
    throw new Error("useOperations must be used within a OperationProvider");
  }

  return context;
};

export function OperationProvider({ children }) {
  const [operations, setOperations] = useState([]);

  const getRecords = async (currentPage = 1, perPage = 2) => {
    try {
      const res = await getRecordsRequest(currentPage, perPage);
      console.log("Respuesta del backend:", res);
      if (res && res.data) {
        console.log("Respuesta del backend:", res.data); // Para depuración
        setOperations(res.data); // Puedes actualizar el estado si deseas mantener los registros globalmente
        return res; // Retorna la respuesta para que sea usada en RecordsPage.jsx
      } else {
        console.error("Respuesta inválida de getRecordsRequest:", res);
        return undefined; // Retornar undefined en caso de error
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createOperation = async (operation) => {
    try {
      const response = await saveRecordRequest(operation);
      console.log("Response from server:", response.data);

      if (response && response.data) {
        console.log("Respuesta del backend:", response.data); // Para depuración
        return response.data; // Retorna la respuesta para que sea usada en RecordsPage.jsx
      } else {
        console.error("Respuesta inválida de getRecordsRequest:", res);
        return undefined; // Retornar undefined en caso de error
      }
      // You can update the state or handle the response as needed
    } catch (error) {
      console.error("Error saving record:", error);
      // Handle the error accordingly
    }
  };

  const deleteRecord = async (id) => {
    try {
      const res = await deleteRecordRequest(id);
      if (res.status === 200)
        setOperations(operations.filter((operation) => operation._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  /*async () => {
    const record = {
      type: operationType,
      values: values,
    };
    console.log("Enviando al backend:", record);
    await createOperation(record); // Enviamos la operación al backend
    setValues([]); // Resetea los valores después de enviar
  };*/

  return (
    <OperationContext.Provider
      value={{ operations, createOperation, getRecords, deleteRecord }}
    >
      {children}
    </OperationContext.Provider>
  );
}
