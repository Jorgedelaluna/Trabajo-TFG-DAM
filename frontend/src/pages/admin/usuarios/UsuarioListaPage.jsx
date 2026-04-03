/**
 * ======================================================
 *  PÁGINA ADMIN: UsuarioListaPage.jsx
 *
 *  Muestra el listado de todos los usuarios registrados.
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
            <div className="page-header-admin page-header-left">
                <h1 className="fw-bold">Listado de Usuarios</h1>
            </div>

            <div className="dashboard-card">
                {usuarios.length === 0 ? (
                    <p className="opacity-75 mb-0">No hay usuarios registrados.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-dark table-hover align-middle dashboard-table mb-0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Teléfono</th>
                                    <th>Sexo</th>
                                    <th>Cuota</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {usuarios.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.telefono || "No informado"}</td>
                                        <td>{usuario.sexo || "No informado"}</td>
                                        <td>
                                            {usuario.estadoCuota
                                                ? getCuotaBadge(usuario.estadoCuota)
                                                : "No disponible"}
                                        </td>
                                        <td>
                                            <Link
                                                to={`/admin/usuarios/${usuario.id}`}
                                                className="btn btn-sm btn-primary"
                                            >
                                                Ver detalle
                                            </Link>
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