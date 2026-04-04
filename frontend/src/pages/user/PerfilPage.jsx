/**
 * ======================================================
 *  PERFIL DEL USUARIO
 * ======================================================
 */

import "../../styles/Dashboard.css";
import { useAuth } from "../../auth/AuthContext";
import { useState } from "react";
import API_URL from "../../api/api";
import axios from "axios";

export default function PerfilPage() {
    const { usuario, setUsuario } = useAuth();
    const [telefono, setTelefono] = useState(usuario?.telefono || "");
    const [guardando, setGuardando] = useState(false);

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

    const guardarCambios = async (e) => {
        e.preventDefault();
        setGuardando(true);

        try {
            const token = localStorage.getItem("token");

            const payload = {
                nombre: usuario.nombre,
                email: usuario.email,
                telefono: telefono.trim(),
                sexo: usuario.sexo || null,
            };

            const response = await axios.put(
                `${API_URL}/usuarios/${usuario.id}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUsuario(response.data);
            alert("Perfil actualizado correctamente");
        } catch (error) {
            console.error("Error actualizando perfil:", error);
            alert("No se pudo actualizar el perfil");
        } finally {
            setGuardando(false);
        }
    };

    if (!usuario) {
        return (
            <div className="dashboard-container">
                <div className="dashboard-card p-4 text-center">
                    <h3>Cargando perfil...</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="page-header-admin page-header-left">
                <h1 className="fw-bold">Mi Perfil</h1>
            </div>

            <div className="dashboard-card p-4 fade-in-up mb-4">
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
                                <th>Rol</th>
                                <td>{usuario.rol || "No informado"}</td>
                            </tr>

                            <tr>
                                <th>Estado de cuota</th>
                                <td>
                                    {usuario.estadoCuota
                                        ? getCuotaBadge(usuario.estadoCuota)
                                        : "No disponible"}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="dashboard-card p-4 fade-in-up">
                <div className="dashboard-card-header">
                    <span className="dashboard-icon">✏️</span>
                    <h5 className="m-0">Editar teléfono</h5>
                </div>

                <form onSubmit={guardarCambios} className="row g-3">
                    <div className="col-12 col-md-6">
                        <label className="form-label text-white">Teléfono</label>
                        <input
                            type="text"
                            className="form-control dashboard-input"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            placeholder="Introduce tu teléfono"
                        />
                    </div>

                    <div className="col-12">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={guardando}
                        >
                            {guardando ? "Guardando..." : "Guardar cambios"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}