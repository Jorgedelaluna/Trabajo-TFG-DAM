/**
 * ======================================================
 *  PÁGINA ADMIN / COACH: ClaseListaPage.jsx
 * ======================================================
 */

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../../styles/Dashboard.css";
import API_URL from "../../../api/api";

export default function ClaseListaPage() {
    const [clases, setClases] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarClases = async () => {
            try {
                const response = await axios.get(`${API_URL}/clases`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });

                setClases(response.data);
            } catch (error) {
                console.error("Error cargando clases:", error);
            } finally {
                setCargando(false);
            }
        };

        cargarClases();
    }, []);

    const eliminarClase = async (id) => {
        const confirmar = window.confirm("¿Seguro que quieres eliminar esta clase?");
        if (!confirmar) return;

        try {
            await axios.delete(`${API_URL}/clases/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            setClases((prev) => prev.filter((c) => c.id !== id));
            alert("Clase eliminada correctamente");
        } catch (error) {
            console.error("Error eliminando clase:", error);
            alert("No se pudo eliminar la clase");
        }
    };

    if (cargando) {
        return (
            <div className="dashboard-container">
                <div className="dashboard-card p-4 text-center">
                    <h3>Cargando clases...</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-bold">Gestión de Clases</h1>

                <Link to="/admin/clases/nueva" className="btn btn-primary">
                    + Nueva Clase
                </Link>
            </div>

            <div className="dashboard-card p-4">
                {clases.length === 0 ? (
                    <p className="opacity-75">No hay clases registradas.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-dark table-striped align-middle">
                            <thead>
                                <tr>
                                    <th>Actividad</th>
                                    <th>Coach</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Aforo</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {clases.map((clase) => (
                                    <tr key={clase.id}>
                                        <td>{clase.actividadNombre}</td>
                                        <td>{clase.coachNombre}</td>
                                        <td>{new Date(clase.fechaHora).toLocaleDateString()}</td>
                                        <td>
                                            {new Date(clase.fechaHora).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </td>
                                        <td>{clase.aforoMaximo}</td>

                                        <td className="text-end">
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