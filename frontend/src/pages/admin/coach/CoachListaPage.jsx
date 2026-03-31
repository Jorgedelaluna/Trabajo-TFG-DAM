/**
 * ============================================================
 *  PÁGINA ADMIN: CoachListaPage.jsx
 * 
 *  Lista todos los coaches registrados en el sistema.
 *  Permite acceder al detalle de cada uno.
 * ============================================================
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../styles/Dashboard.css";

export default function CoachListaPage() {

  // Lista de coaches
  const [coaches, setCoaches] = useState([]);

  /**
   * ============================================================
   * CARGAR LISTA DE COACH
   * Cargar coaches al montar el componente
   * ============================================================
   */
  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await axios.get("http://localhost:8080/coaches");
        setCoaches(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    cargar();
  }, []);

  /**
   * ============================================================
   *  RENDER PRINCIPAL
   * ============================================================
   */
  return (
    <div className="dashboard-container-fluid">

      <h1 className="fw-bold mb-4">Gestión de Coaches</h1>

      <div className="dashboard-card p-4">

        {coaches.length === 0 ? (
          <p className="opacity-75">No hay coaches registrados.</p>
        ) : (
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {coaches.map((c) => (
                <tr key={c.id}>
                  <td>{c.nombre}</td>
                  <td>{c.email}</td>

                  <td className="text-end">
                    <Link
                      to={`/admin/coaches/${c.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Ver detalle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>
    </div>
  );
}
