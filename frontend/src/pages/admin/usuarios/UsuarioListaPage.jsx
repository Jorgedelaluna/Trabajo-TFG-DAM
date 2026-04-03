/**
 * ======================================================
 *  PÁGINA ADMIN: UsuarioListaPage.jsx
 *
 *  Muestra el listado de todos los usuarios registrados.
 *  Funcionalidades:
 *    - Carga usuarios desde el backend
 *    - Muestra datos básicos en tabla
 *    - Permite ir al detalle de cada usuario por ID
 * ======================================================
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../styles/Dashboard.css";
import API_URL from "../../../api/api";

export default function UsuarioListaPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No hay token");
                return;
            }

            const res = await axios.get(`${API_URL}/usuarios`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUsuarios(res.data);
        } catch (error) {
            console.error("Error cargando usuarios:", error);
        } finally {
            setCargando(false);
        }
    };

    const getCuotaBadge = (estado) => {
        switch (estado) {
            case "ACTIVA":
                return <span className="badge bg-success">ACTIVA</span>;
            case "INACTIVA":
                return <span className="badge bg-danger">INACTIVA</span>;
            case "PENDIENTE":
                return <span className="badge bg-warning text-dark">PENDIENTE</span>;
            default:
                return <span className="badge bg-secondary">DESCONOCIDO</span>;
        }
    };

    if (cargando) {
        return (
            <div className="dashboard-container">
                <div className="dashboard-card p-4 text-center">
                    <h3>Cargando usuarios...</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="page-header-admin">
                <h1 className="fw-bold">Gestión de Clases</h1>

                <Link to="/admin/clases/nueva" className="btn btn-primary">
                    + Nueva Clase
                </Link>
            </div>

            <div className="dashboard-card">
                {clases.length === 0 ? (
                    <p className="opacity-75 mb-0">No hay clases registradas.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-dark table-hover align-middle dashboard-table mb-0">
                            <thead>
                                <tr>
                                    <th>Actividad</th>
                                    <th>Coach</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Aforo</th>
                                    <th className="text-end">Acciones</th>
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
    );}