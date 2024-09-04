import React, { useState, useEffect } from "react";
import { useOperations } from "../context/OperationsContext";

function RecordsPage() {
  const { getRecords, deleteRecord } = useOperations();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedBy, setSortedBy] = useState({ field: "", direction: "asc" });
  const [originalOperations, setOriginalOperations] = useState([]);
  const [filteredOperations, setFilteredOperations] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await getRecords(currentPage, perPage);
        console.log("Respuesta del backend desde RecordPage:", res.data); // Para depuración
        setOriginalOperations(res.data.data); // Almacena los datos originales
        setFilteredOperations(res.data.data); // Inicializa con los datos obtenidos del backend
        setTotalPages(res.data.totalPages); // Actualiza el total de páginas
      } catch (error) {
        console.error("Error fetching records:", error);
        setOriginalOperations([]); // Manejar errores asegurando un array vacío
        setFilteredOperations([]);
        setTotalPages(0);
      }
    };

    fetchRecords();
  }, [currentPage, perPage]);

  useEffect(() => {
    let filtered = [...originalOperations];

    /*if (searchTerm) {
      filtered = filtered.filter((operation) =>
        Object.values(operation).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }*/
    if (searchTerm) {
      filtered = filtered.filter((operation) => {
        // Aquí verificamos si 'searchTerm' está en cualquier valor del objeto
        return Object.values(operation).some((value) => {
          if (typeof value === "object") {
            // Si el valor es un objeto, verificamos en sus propiedades
            return Object.values(value).some((nestedValue) =>
              String(nestedValue)
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            );
          } else {
            // Verificamos en el valor directamente
            return String(value)
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          }
        });
      });
    }

    if (sortedBy.field) {
      filtered.sort((a, b) => {
        if (a[sortedBy.field] < b[sortedBy.field]) {
          return sortedBy.direction === "asc" ? -1 : 1;
        }
        if (a[sortedBy.field] > b[sortedBy.field]) {
          return sortedBy.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredOperations(filtered);
  }, [searchTerm, sortedBy, originalOperations]);
  // Añade 'originalOperations' a las dependencias

  const handleDelete = async (id) => {
    try {
      await deleteRecord(id);
      setFilteredOperations((prevOperations) =>
        prevOperations.filter((operation) => operation._id !== id)
      );
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const handleSort = (field) => {
    setSortedBy((prevSort) => ({
      field,
      direction:
        prevSort.field === field && prevSort.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-2xl font-bold">Operation Records</h2>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th onClick={() => handleSort("operation_id")}>Operation type</th>
            <th onClick={() => handleSort("amount")}>Amount</th>
            <th onClick={() => handleSort("user_balance")}>User Balance</th>
            <th onClick={() => handleSort("operation_response")}>Response</th>
            <th onClick={() => handleSort("date")}>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredOperations) &&
            filteredOperations.map((operation) => (
              <tr key={operation._id}>
                <td>{operation.operation_id.type}</td>
                <td>{operation.amount}</td>
                <td>{operation.user_balance}</td>
                <td>{operation.operation_response}</td>
                <td>{new Date(operation.date).toISOString().split("T")[0]}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(operation._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <div>
          <button
            className="btn btn-primary mr-2"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="btn btn-primary"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <select
          className="form-control w-auto"
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={15}>15 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>
    </div>
  );
}

export default RecordsPage;
