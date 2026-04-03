/**
 * ======================================================
 *  PÁGINA ADMIN: UsuarioDetallePage.jsx
 *
 *  Muestra la información completa de un usuario concreto.
 * ======================================================
 */

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../../../styles/Dashboard.css";
import API_URL from "../../../api/api";

export default function UsuarioDetallePage() {

    const { id } = useParams();
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        cargarUsuario();
    }, [id]);

    const cargarUsuario = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No hay token");
                return;
            }

            const res = await axios.get(`${API_URL}/usuarios/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUsuario(res.data);
        } catch (error) {
            console.error("Error cargando usuario:", error);
        }
    };

    // 🎨 Badge cuota
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

    if (!usuario) {
        return (
            <div className="dashboard-container">
                <div className="dashboard-card p-4 text-center">
                    <h3>Cargando usuario...</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container-fluid dark-dashboard">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-bold dashboard-title mb-0">Detalle del Usuario</h1>
            </div>

            <div className="dashboard-card p-4">
                <div className="table-responsive">
                    <table className="table table-dark table-hover align-middle dashboard-table mb-0">
                        <tbody>
                            <tr>
                                <th style={{ width: "260px" }}>Nombre</th>
                                <td>{usuario.nombre}</td>
                            </tr>

                            <tr>
                                <th>Email</th>
                                <td>{usuario.email}</td>
                            </tr>

                            <tr>
                                <th>Teléfono</th>
                                <td>{usuario.telefono || "No informado"}</td>
                            </tr>

                            <tr>
                                <th>Sexo</th>
                                <td>{usuario.sexo || "No informado"}</td>
                            </tr>

                            <tr>
                                <th>Estado de cuota</th>
                                <td>
                                    {usuario.estadoCuota
                                        ? getCuotaBadge(usuario.estadoCuota)
                                        : "No disponible"}
                                </td>
                            </tr>

                            <tr>
                                <th>Fecha de alta</th>
                                <td>
                                    {usuario.fechaAlta
                                        ? new Date(usuario.fechaAlta).toLocaleString()
                                        : "No disponible"}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Link to="/admin/usuarios" className="btn btn-outline-light mt-4">
                    ← Volver
                </Link>
            </div>
        </div>
    );
}