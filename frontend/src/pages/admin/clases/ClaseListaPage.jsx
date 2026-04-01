/**
 * ======================================================
 *  P罣INA ADMIN / COACH: ClaseListaPage.jsx
 * 
 *  Vista principal para la gesti贸n de clases.
 *  Funcionalidades:
 *    - Carga real de clases desde el backend
 *    - Permite editar o eliminar una clase
 *    - Accesible solo para ADMIN y COACH (controlado en App.jsx)
 * 
 *  Esta p谩gina forma parte del panel de administraci贸n y se
 *  integra con AdminLayout y el estilo glass del dashboard.
 * ======================================================
 */

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../../styles/Dashboard.css";
import API_URL from "../../../api/api";

export default function ClaseListaPage() {

    // Lista las clases obtenidas del backed
    const [clases, setClases] = useState([]);

    // Estado de carga inicial
    const [cargando, setCargando] = useState(true);

    /**
     * ============================================================
     * CARGAR LISTA DE CLASES
     * - Cargar lista de clases al montar el componente
     * ============================================================
     */
    useEffect(() => {
        const cargarClases = async () => {
            try {
                const response = await axios.get(`${API_URL}/clases`);
                setClases(response.data);
            } catch (error) {
                console.error("Error cargando clases:", error);
            } finally {
                setCargando(false);
            }
        };

        cargarClases();
    }, []);

    /**
     * ======================================================
     * ELIMINAR CLASE
     * - Solicita confirmaci贸n
     * - Elimina en backend
     * - Actualiza la lista local
     * ======================================================
     */
    const eliminarClase = async (id) => {
        const confirmar = window.confirm("縎eguro que quieres eliminar esta clase?");
        if (!confirmar) return;

        try {
            await axios.delete(`${API_URL}/clases/${id}`);

            // Actualizar lista local
            setClases((prev) => prev.filter((c) => c.id !== id));

            alert("Clase eliminada correctamente");
        } catch (error) {
            console.error("Error eliminando clase:", error);
            alert("No se pudo eliminar la clase");
        }
    };

    /**
     * ======================================================
     *  ESTADO DE CARGA
     * ======================================================
     */
    if (cargando) {
        return (
            <div className="dashboard-container">
                <div className="dashboard-card p-4 text-center">
                    <h3>Cargando clases...</h3>
                </div>
            </div>
        );
    }

    /**
     * ======================================================
     *  RENDER PRINCIPAL
     * ======================================================
     */
    return (
        <div className="dashboard-container-fluid">

            {/* T铆tulo + bot贸n de nueva clase */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-bold">Gesti髇 de Clases</h1>

                <Link to="/admin/clases/nueva" className="btn btn-primary">
                    + Nueva Clase
                </Link>
            </div>

            {/* Tarjeta principal */}
            <div className="dashboard-card p-4">

                {clases.length === 0 ? (
                    <p className="opacity-75">No hay clases registradas.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-dark table-striped align-middle">
                            <thead>
                                <tr>
                                    <th>Actividad</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Aforo</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {clases.map((clase) => (
                                    <tr key={clase.id}>
                                        <td>{clase.actividad}</td>
                                        <td>{new Date(clase.fechaHora).toLocaleDateString()}</td>
                                        <td>
                                            {new Date(clase.fechaHora).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </td>
                                        <td>{clase.aforo}</td>

                                        <td className="text-end">

                                            {/* Editar clase*/}
                                            <Link
                                                to={`/admin/clases/${clase.id}`}
                                                className="btn btn-sm btn-warning me-2"
                                            >
                                                Editar
                                            </Link>

                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => eliminarClase(clase.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                )}

            </div>
        </div>
    );
}