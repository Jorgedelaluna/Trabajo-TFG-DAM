import { useEffect, useState } from "react";
import { getClases } from "../services/clasesServices";

function Clases() {
  const [clases, setClases] = useState([]);

  useEffect(() => {
    getClases().then(data => setClases(data));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Clases</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clases.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.rol?.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clases;
