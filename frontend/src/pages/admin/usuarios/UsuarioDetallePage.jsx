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

            const res = await axios.get(`${API_URL}/usuarios`, {
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
        <div className="dashboard-container-fluid">

            <h1 className="fw-bold mb-4">Detalle del Usuario</h1>

            <div className="dashboard-card p-4">

                <p><strong>Nombre:</strong> {usuario.nombre}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>Teléfono:</strong> {usuario.telefono || "No informado"}</p>
                <p><strong>Sexo:</strong> {usuario.sexo || "No informado"}</p>

                <p>
                    <strong>Cuota:</strong>{" "}
                    {usuario.estadoCuota
                        ? getCuotaBadge(usuario.estadoCuota)
                        : "No disponible"}
                </p>

                <p>
                    <strong>Fecha de alta:</strong>{" "}
                    {usuario.fechaAlta
                        ? new Date(usuario.fechaAlta).toLocaleString()
                        : "No disponible"}
                </p>

                <Link to="/admin/usuarios" className="btn btn-secondary mt-3">
                    Volver
                </Link>

            </div>

        </div>
    );
}