/**
 * ======================================================
 *  P�GINA ADMIN / COACH: ClaseDetallePage.jsx
 * 
 *  Vista para editar una clase concreta.
 *  Funcionalidades:
 *    - Carga real de la clase desde el backend usando su ID
 *    - Permite modificar actividad, fecha, hora y aforo
 *    - Guarda los cambios en el backend
 *    - Accesible solo para ADMIN y COACH (controlado en App.jsx)
 * 
 *  Esta página forma parte del panel de administración y se
 *  integra con AdminLayout y el estilo glass del dashboard.
 * ======================================================
 */

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/Dashboard.css";
import API_URL from "../../../api/api";

export default function ClaseDetallePage() {

    // ID obtenido de la clase desde la URL
    const { id } = useParams(); // ID de la clase desde la URL
    const navigate = useNavigate();

    // Datos reales de la clase
    const [clase, setClase] = useState(null);

    // Estado de carga inicial
    const [cargando, setCargando] = useState(true);

    /**
     * ======================================================
     * CARGAR DATOS DE LA CLASE
     * - Cargar datos de la clase al entrar en la página
     * ======================================================
     */
    useEffect(() => {
        const cargarClase = async () => {
            try {
                const response = await axios.get(`${API_URL}/clases/${id}`);
                setClase(response.data);
            } catch (error) {
                console.error("Error cargando clase:", error);
                alert("No se pudo cargar la clase");
            } finally {
                setCargando(false);
            }
        };

        cargarClase();
    }, [id]);

    /**
     * ======================================================
     * GUARDAR CAMBIOS
     * - Se guardan los datos en el backend
     * ======================================================
     */
    const guardarCambios = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`${API_URL}/clases/${id}`, clase);
            alert("Clase actualizada correctamente");
            navigate("/admin/clases");
        } catch (error) {
            console.error("Error actualizando clase:", error);
            alert("No se pudo actualizar la clase");
        }
    };

    /**
     * ======================================================
     *  ESTADO DE CARGA
     * ======================================================
     */
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

    /**
     * ======================================================
     *  RENDER PRINCIPAL
     * ======================================================
     */
    return (
        <div className="dashboard-container">

            <h1 className="fw-bold mb-4">Editar Clase</h1>

            <div className="dashboard-card p-4">

                <form onSubmit={guardarCambios} className="row g-3">

                    {/* Actividad */}
                    <div className="col-md-6">
                        <label className="form-label">Actividad</label>
                        <input
                            type="text"
                            className="form-control"
                            value={clase.actividad}
                            onChange={(e) =>
                                setClase({ ...clase, actividad: e.target.value })
                            }
                            required
                        />
                    </div>

                    {/* Fecha */}
                    <div className="col-md-3">
                        <label className="form-label">Fecha</label>
                        <input
                            type="date"
                            className="form-control"
                            value={clase.fechaHora?.split("T")[0]}
                            onChange={(e) => {
                                const nuevaFecha = e.target.value;
                                const hora = clase.fechaHora.split("T")[1];
                                setClase({ ...clase, fechaHora: `${nuevaFecha}T${hora}` });
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
                            value={clase.fechaHora?.split("T")[1].slice(0, 5)}
                            onChange={(e) => {
                                const nuevaHora = e.target.value;
                                const fecha = clase.fechaHora.split("T")[0];
                                setClase({ ...clase, fechaHora: `${fecha}T${nuevaHora}:00` });
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