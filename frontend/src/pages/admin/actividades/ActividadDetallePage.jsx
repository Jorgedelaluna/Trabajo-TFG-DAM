/**
 * ============================================================
 *  P¡GINA ADMIN: ActividadDetallePage.jsx
 * 
 *  Edita una actividad existente.
 *  Carga los datos reales desde el backend.
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/Dashboard.css";
import API_URL from "../../../api/api";

export default function ActividadDetallePage() {

    const { id } = useParams();
    const navigate = useNavigate();

    // Datos reales de la actividad
    const [actividad, setActividad] = useState(null);
    const [cargando, setCargando] = useState(true);
    /**
     * ======================================================
     * ESTADO DE CARGA
     * - Cargar actividad al entrar en la p√°gina
     * ======================================================
     */
    useEffect(() => {
        const cargar = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    alert("SesiÛn expirada. Inicia sesiÛn de nuevo.");
                    setCargando(false);
                    return;
                }

                const res = await axios.get(
                    `${API_URL}/actividades/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setActividad(res.data);
            } catch (err) {
                console.error(err);
                alert("No se pudo cargar la actividad");
            } finally {
                setCargando(false);
            }
        };

        cargar();
    }, [id]);

    /**
     * ============================================================
     * GUARDAR CAMBIOS
     * - Se guardan los cambios
     * ============================================================
     */
    const guardar = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `${API_URL}/actividades/${id}`,
                actividad,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Actividad actualizada");
            navigate("/admin/actividades");
        } catch (err) {
            console.error(err);
            alert("No se pudo actualizar");
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
                    <h3>Cargando actividad...</h3>
                </div>
            </div>
        );
    }

    if (!actividad) {
        return (
            <div className="dashboard-container">
                <div className="dashboard-card p-4 text-center">
                    <h3>No encontrada</h3>
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

            <h1 className="fw-bold mb-4">Editar Actividad</h1>

            <div className="dashboard-card p-4">

                <form onSubmit={guardar} className="row g-3">

                    {/* Nombre */}
                    <div className="col-12">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            value={actividad.nombre}
                            onChange={(e) => setActividad({ ...actividad, nombre: e.target.value })}
                            required
                        />
                    </div>

                    {/* Descripci√≥n */}
                    <div className="col-12">
                        <label className="form-label">Descripci√≥n</label>
                        <textarea
                            className="form-control"
                            rows="3"
                            value={actividad.descripcion}
                            onChange={(e) => setActividad({ ...actividad, descripcion: e.target.value })}
                        />
                    </div>

                    {/* Botones */}
                    <div className="col-12 mt-3">
                        <button className="btn btn-primary me-2">Guardar</button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/admin/actividades")}
                        >
                            Cancelar
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}
