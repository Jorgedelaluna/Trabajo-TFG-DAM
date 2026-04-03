/**
 * ============================================================
 *  PÁGINA ADMIN / COACH: ClaseNuevaPage.jsx
 *
 *  Vista para crear una nueva clase en el sistema.
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/Dashboard.css";
import API_URL from "../../../api/api";

export default function ClaseNuevaPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [clase, setClase] = useState({
        actividad: "",
        coach: "",
        fecha: "",
        hora: "",
        aforo: 10
    });

    const [actividades, setActividades] = useState([]);
    const [coaches, setCoaches] = useState([]);
    const [loadingActividades, setLoadingActividades] = useState(true);
    const [loadingCoaches, setLoadingCoaches] = useState(true);

    useEffect(() => {
        cargarActividades();
        cargarCoaches();
    }, []);

    const cargarActividades = async () => {
        try {
            const response = await axios.get(`${API_URL}/actividades`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });

            setActividades(response.data || []);
        } catch (error) {
            console.error("Error cargando actividades:", error);
            alert("No se pudieron cargar las actividades");
        } finally {
            setLoadingActividades(false);
        }
    };

    const cargarCoaches = async () => {
        try {
            const response = await axios.get(`${API_URL}/coaches`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });

            setCoaches(response.data || []);
        } catch (error) {
            console.error("Error cargando coaches:", error);
            alert("No se pudieron cargar los coaches");
        } finally {
            setLoadingCoaches(false);
        }
    };

    const crearClase = async (e) => {
        e.preventDefault();

        try {
            const fechaHora = `${clase.fecha}T${clase.hora}:00`;

            await axios.post(
                `${API_URL}/clases`,
                {
                    actividadNombre: clase.actividad,
                    coachId: clase.coach,
                    fechaHora: fechaHora,
                    aforoMaximo: clase.aforo
                },
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );

            alert("Clase creada correctamente");
            navigate("/admin/clases");
        } catch (error) {
            console.error("Error creando clase:", error);
            alert("No se pudo crear la clase");
        }
    };

    return (
        <div className="dashboard-container-fluid">
            <h1 className="fw-bold mb-4">Crear Nueva Clase</h1>

            <div className="dashboard-card p-4">
                <form onSubmit={crearClase} className="row g-3">

                    {/* Actividad */}
                    <div className="col-md-6">
                        <label className="form-label">Actividad</label>
                        <select
                            className="form-select"
                            value={clase.actividad}
                            onChange={(e) =>
                                setClase({ ...clase, actividad: e.target.value })
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
                                <option key={actividad.id} value={actividad.nombre}>
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
                            value={clase.coach}
                            onChange={(e) =>
                                setClase({ ...clase, coach: e.target.value })
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
                            value={clase.fecha}
                            onChange={(e) =>
                                setClase({ ...clase, fecha: e.target.value })
                            }
                            required
                        />
                    </div>

                    {/* Hora */}
                    <div className="col-md-3">
                        <label className="form-label">Hora</label>
                        <input
                            type="time"
                            className="form-control"
                            value={clase.hora}
                            onChange={(e) =>
                                setClase({ ...clase, hora: e.target.value })
                            }
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
                            value={clase.aforo}
                            onChange={(e) =>
                                setClase({ ...clase, aforo: Number(e.target.value) })
                            }
                            required
                        />
                    </div>

                    {/* Botones */}
                    <div className="col-12 mt-4">
                        <button type="submit" className="btn btn-primary me-2">
                            Crear clase
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