/**
 * ======================================================
 *  PÁGINA ADMIN / COACH: ClaseDetallePage.jsx
 * ======================================================
 */

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/Dashboard.css";
import API_URL from "../../../api/api";

export default function ClaseDetallePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [clase, setClase] = useState(null);
    const [actividades, setActividades] = useState([]);
    const [coaches, setCoaches] = useState([]);

    const [cargando, setCargando] = useState(true);
    const [loadingActividades, setLoadingActividades] = useState(true);
    const [loadingCoaches, setLoadingCoaches] = useState(true);

    useEffect(() => {
        cargarDatos();
    }, [id]);

    const cargarDatos = async () => {
        try {
            const [claseRes, actividadesRes, coachesRes] = await Promise.all([
                axios.get(`${API_URL}/clases/${id}`, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }),
                axios.get(`${API_URL}/actividades`, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }),
                axios.get(`${API_URL}/coaches`, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
            ]);

            setClase(claseRes.data);
            setActividades(actividadesRes.data || []);
            setCoaches(coachesRes.data || []);
        } catch (error) {
            console.error("Error cargando datos de la clase:", error);
            alert("No se pudieron cargar los datos de la clase");
        } finally {
            setCargando(false);
            setLoadingActividades(false);
            setLoadingCoaches(false);
        }
    };

    const guardarCambios = async (e) => {
        e.preventDefault();

        try {
            await axios.put(
                `${API_URL}/clases/${id}`,
                {
                    id: clase.id,
                    actividadId: Number(clase.actividadId),
                    coachId: Number(clase.coachId),
                    fechaHora: clase.fechaHora,
                    aforoMaximo: Number(clase.aforoMaximo)
                },
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );

            alert("Clase actualizada correctamente");
            navigate("/admin/clases");
        } catch (error) {
            console.error("Error actualizando clase:", error);
            alert("No se pudo actualizar la clase");
        }
    };

    if (cargando) {
        return (
            <div className="dashboard-container-fluid">
                <div className="dashboard-card p-4 text-center">
                    <h3>Cargando clase...</h3>
                </div>
            </div>
        );
    }

    if (!clase) {
        return (
            <div className="dashboard-container">
                <div className="dashboard-card p-4 text-center">
                    <h3>No se encontró la clase</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <h1 className="fw-bold mb-4">Editar Clase</h1>

            <div className="dashboard-card p-4">
                <form onSubmit={guardarCambios} className="row g-3">

                    {/* Actividad */}
                    <div className="col-md-6">
                        <label className="form-label">Actividad</label>
                        <select
                            className="form-select"
                            value={clase.actividadId ?? ""}
                            onChange={(e) =>
                                setClase({
                                    ...clase,
                                    actividadId: e.target.value
                                })
                            }
                            required
                            disabled={loadingActividades}
                        >
                            <option value="">
                                {loadingActividades
                                    ? "Cargando actividades..."
                                    : "Selecciona una actividad"}
                            </option>

                            {actividades.map((actividad) => (
                                <option key={actividad.id} value={actividad.id}>
                                    {actividad.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Coach */}
                    <div className="col-md-6">
                        <label className="form-label">Coach</label>
                        <select
                            className="form-select"
                            value={clase.coachId ?? ""}
                            onChange={(e) =>
                                setClase({
                                    ...clase,
                                    coachId: e.target.value
                                })
                            }
                            required
                            disabled={loadingCoaches}
                        >
                            <option value="">
                                {loadingCoaches
                                    ? "Cargando coaches..."
                                    : "Selecciona un coach"}
                            </option>

                            {coaches.map((coach) => (
                                <option key={coach.id} value={coach.id}>
                                    {coach.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Fecha */}
                    <div className="col-md-3">
                        <label className="form-label">Fecha</label>
                        <input
                            type="date"
                            className="form-control"
                            value={clase.fechaHora?.split("T")[0] || ""}
                            onChange={(e) => {
                                const nuevaFecha = e.target.value;
                                const hora = clase.fechaHora?.split("T")[1] || "00:00:00";
                                setClase({
                                    ...clase,
                                    fechaHora: `${nuevaFecha}T${hora}`
                                });
                            }}
                            required
                        />
                    </div>

                    {/* Hora */}
                    <div className="col-md-3">
                        <label className="form-label">Hora</label>
                        <input
                            type="time"
                            className="form-control"
                            value={clase.fechaHora?.split("T")[1]?.slice(0, 5) || ""}
                            onChange={(e) => {
                                const nuevaHora = e.target.value;
                                const fecha = clase.fechaHora?.split("T")[0] || "";
                                setClase({
                                    ...clase,
                                    fechaHora: `${fecha}T${nuevaHora}:00`
                                });
                            }}
                            required
                        />
                    </div>

                    {/* Aforo */}
                    <div className="col-md-3">
                        <label className="form-label">Aforo</label>
                        <input
                            type="number"
                            className="form-control"
                            min="1"
                            value={clase.aforoMaximo ?? ""}
                            onChange={(e) =>
                                setClase({
                                    ...clase,
                                    aforoMaximo: Number(e.target.value)
                                })
                            }
                            required
                        />
                    </div>

                    {/* Botones */}
                    <div className="col-12 mt-4">
                        <button type="submit" className="btn btn-primary me-2">
                            Guardar cambios
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/admin/clases")}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}