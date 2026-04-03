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
        <div className="dashboard-container-fluid">
            <h1 className="fw-bold mb-4">Listado de Usuarios</h1>

            <div className="dashboard-card p-4">
                {usuarios.length === 0 ? (
                    <p>No hay usuarios registrados.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
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