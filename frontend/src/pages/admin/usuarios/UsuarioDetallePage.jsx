/**
 * ======================================================
 *  PÁGINA ADMIN: UsuarioDetallePage.jsx
 *
 *  Muestra la información completa de un usuario concreto
 *  y permite editar nombre, email, teléfono y sexo.
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
    const [editando, setEditando] = useState(false);
    const [guardando, setGuardando] = useState(false);

    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        telefono: "",
        sexo: "",
    });

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
            setFormData({
                nombre: res.data.nombre || "",
                email: res.data.email || "",
                telefono: res.data.telefono || "",
                sexo: res.data.sexo || "",
            });
        } catch (error) {
            console.error("Error cargando usuario:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const guardarCambios = async () => {
        try {
            setGuardando(true);

            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No hay token");
                return;
            }

            await axios.put(`${API_URL}/usuarios/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUsuario((prev) => ({
                ...prev,
                ...formData,
            }));

            setEditando(false);
            alert("Usuario actualizado correctamente");
        } catch (error) {
            console.error("Error actualizando usuario:", error);
            alert("No se pudo actualizar el usuario");
        } finally {
            setGuardando(false);
        }
    };

    const cancelarEdicion = () => {
        if (!usuario) return;

        setFormData({
            nombre: usuario.nombre || "",
            email: usuario.email || "",
            telefono: usuario.telefono || "",
            sexo: usuario.sexo || "",
        });

        setEditando(false);
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
        <div className="dashboard-container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-bold mb-0">Detalle del Usuario</h1>

                {!editando ? (
                    <button
                        className="btn btn-warning"
                        onClick={() => setEditando(true)}
                    >
                        Editar usuario
                    </button>
                ) : (
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-success"
                            onClick={guardarCambios}
                            disabled={guardando}
                        >
                            {guardando ? "Guardando..." : "Guardar cambios"}
                        </button>

                        <button
                            className="btn btn-secondary"
                            onClick={cancelarEdicion}
                            disabled={guardando}
                        >
                            Cancelar
                        </button>
                    </div>
                )}
            </div>

            <div className="dashboard-card p-4">
                <div className="table-responsive">
                    <table className="table table-dark table-hover align-middle dashboard-table mb-0">
                        <tbody>
                            <tr>
                                <th style={{ width: "260px" }}>Nombre</th>
                                <td>
                                    {editando ? (
                                        <input
                                            type="text"
                                            name="nombre"
                                            className="form-control dashboard-input"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        usuario.nombre
                                    )}
                                </td>
                            </tr>

                            <tr>
                                <th>Email</th>
                                <td>
                                    {editando ? (
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control dashboard-input"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        usuario.email
                                    )}
                                </td>
                            </tr>

                            <tr>
                                <th>Teléfono</th>
                                <td>
                                    {editando ? (
                                        <input
                                            type="text"
                                            name="telefono"
                                            className="form-control dashboard-input"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        usuario.telefono || "No informado"
                                    )}
                                </td>
                            </tr>

                            <tr>
                                <th>Sexo</th>
                                <td>
                                    {editando ? (
                                        <select
                                            name="sexo"
                                            className="form-select dashboard-input"
                                            value={formData.sexo}
                                            onChange={handleChange}
                                        >
                                            <option value="">Selecciona una opción</option>
                                            <option value="HOMBRE">Hombre</option>
                                            <option value="MUJER">Mujer</option>
                                            <option value="OTRO">Otro</option>
                                        </select>
                                    ) : (
                                        usuario.sexo || "No informado"
                                    )}
                                </td>
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