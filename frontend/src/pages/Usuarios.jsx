import { useEffect, useState } from "react";
import { getUsuarios } from "../services/usuarioService";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getUsuarios().then(data => setUsuarios(data));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Usuarios</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
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

export default Usuarios;
