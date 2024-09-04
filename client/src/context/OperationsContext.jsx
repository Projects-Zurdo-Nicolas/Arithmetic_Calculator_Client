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
  const [user, setUser] = useState(null);

  const getRecords = async (currentPage = 1, perPage = 2) => {
    try {
      const res = await getRecordsRequest(currentPage, perPage);
      console.log("Respuesta del backend:", res);
      if (res && res.data) {
        console.log("Respuesta del backend:", res.data);
        setOperations(res.data);
        return res;
      } else {
        console.error("Respuesta inválida de getRecordsRequest:", res);
        return undefined;
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
        console.log("Respuesta del backend:", response.data); 
        return response.data;
      } else {
        console.error("Respuesta inválida de getRecordsRequest:", res);
        return undefined;
      }
    } catch (error) {
      console.error("Error saving record:", error);
      alert(`Error: ${error.response ? error.response.data.message : 'Unknown error occurred'}`);
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

  return (
    <OperationContext.Provider
      value={{ operations, createOperation, getRecords, deleteRecord }}
    >
      {children}
    </OperationContext.Provider>
  );
}
