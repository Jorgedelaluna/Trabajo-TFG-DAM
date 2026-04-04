/**
 * ======================================================
 *  PÁGINA PRIVADA: ClasesUsuarioPage.jsx
 * 
 *  Muestra todas las clases disponibles para el usuario.
 *  Funcionalidades principales:
 *    - Filtrar clases por fecha mediante un input type="date"
 *    - Agrupar clases por di­a de la semana en un accordion
 *    - Permitir reservar una clase (se guarda en el backend)
 *    - Actualizar automaticamente MisReservas al reservar
 * 
 *  Esta pagina es clave para la experiencia del usuario,
 *  ya que centraliza la busqueda y reserva de clases.
 * ======================================================
 */

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../../styles/ClasesUsuario.css";
import "../../styles/Dashboard.css";
import { FaClock } from "react-icons/fa";
import API_URL from "../../api/api";

export default function ClasesUsuarioPage() {
    const [clases, setClases] = useState([]);
    const [reservasUsuario, setReservasUsuario] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [diaSeleccionado, setDiaSeleccionado] = useState("");

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const usuarioId = usuario?.id;

    const fetchData = useCallback(async () => {
        try {
            const clasesRes = await axios.get(`${API_URL}/clases`);
            setClases(clasesRes.data);

            const reservasRes = await axios.get(
                `${API_URL}/inscripciones/usuario/${usuarioId}`,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );

            setReservasUsuario(reservasRes.data);
        } catch (err) {
            console.error("Error cargando datos:", err);
        }
    }, [usuarioId]);

    useEffect(() => {
        if (usuarioId) fetchData();
    }, [usuarioId, fetchData]);

    useEffect(() => {
        const handleFocus = () => {
            if (usuarioId) fetchData();
        };

        window.addEventListener("focus", handleFocus);
        return () => window.removeEventListener("focus", handleFocus);
    }, [fetchData, usuarioId]);

    const reservarClase = async (claseId) => {
        try {
            await axios.post(
                `${API_URL}/inscripciones`,
                { usuarioId, claseId },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );

            const reservasRes = await axios.get(
                `${API_URL}/inscripciones/usuario/${usuarioId}`,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );

            setReservasUsuario(reservasRes.data);

            setMensaje("Clase reservada con éxito ✔");
            setTimeout(() => setMensaje(""), 3000);
        } catch (error) {
            console.error("Error al reservar:", error);
            setMensaje("Error al reservar la clase ✖");
            setTimeout(() => setMensaje(""), 3000);
        }
    };

    const clasesReservadas = new Set(
        reservasUsuario
            .filter((r) => r.estado === "INSCRITO")
            .map((r) => r.claseId)
    );

    const clasesFiltradas = diaSeleccionado
        ? clases.filter((c) => {
            const fechaClase = new Date(c.fechaHora);
            const fechaISO = fechaClase.toISOString().split("T")[0];
            return fechaISO === diaSeleccionado;
        })
        : clases;

    const clasesPorDia = clasesFiltradas.reduce((acc, clase) => {
        const fecha = new Date(clase.fechaHora);

        const dia = fecha.toLocaleDateString("es-ES", {
            weekday: "long",
        });

        if (!acc[dia]) acc[dia] = [];
        acc[dia].push(clase);

        return acc;
    }, {});

    return (
        <div className="dashboard-container">
            <div className="page-header-admin page-header-left">
                <h1 className="fw-bold">Clases disponibles</h1>
            </div>

            <div className="dashboard-card p-4 mb-4">
                <div className="dashboard-card-header">
                    <span className="dashboard-icon">📅</span>
                    <h5 className="m-0">Filtrar por día</h5>
                </div>

                <div className="row g-3 align-items-end">
                    <div className="col-12 col-md-6">
                        <label className="form-label text-white fw-bold">
                            Selecciona un día
                        </label>
                        <input
                            type="date"
                            className="form-control dashboard-input"
                            value={diaSeleccionado}
                            onChange={(e) => setDiaSeleccionado(e.target.value)}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        {diaSeleccionado && (
                            <button
                                className="btn btn-outline-light"
                                onClick={() => setDiaSeleccionado("")}
                            >
                                Limpiar filtro
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {mensaje && (
                <div className="dashboard-card p-3 mb-4">
                    <div className="alert alert-info text-center mb-0">{mensaje}</div>
                </div>
            )}

            <div className="accordion custom-dashboard-accordion" id="accordionClases">
                {Object.entries(clasesPorDia).map(([dia, clasesDia], index) => (
                    <div className="accordion-item custom-accordion-item mb-3" key={dia}>
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed custom-accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse-${index}`}
                            >
                                {dia.charAt(0).toUpperCase() + dia.slice(1)}
                            </button>
                        </h2>

                        <div
                            id={`collapse-${index}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionClases"
                        >
                            <div className="accordion-body custom-accordion-body">
                                {clasesDia
                                    .sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora))
                                    .map((clase) => (
                                        <div key={clase.id} className="dashboard-card p-3 mb-3">
                                            <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
                                                <h4 className="mb-0">{clase.actividadNombre}</h4>
                                                <span className="badge bg-info text-dark">
                                                    Coach: {clase.coachNombre}
                                                </span>
                                            </div>

                                            <p className="m-0 mb-2">
                                                <FaClock className="me-2" />
                                                {new Date(clase.fechaHora).toLocaleDateString("es-ES", {
                                                    weekday: "long",
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                })}{" "}
                                                —{" "}
                                                {new Date(clase.fechaHora).toLocaleTimeString("es-ES", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>

                                            <p className="m-0 opacity-75">
                                                Aforo máximo: {clase.aforoMaximo}
                                            </p>

                                            {clasesReservadas.has(clase.id) ? (
                                                <button
                                                    className="btn btn-secondary mt-3 w-100"
                                                    disabled
                                                >
                                                    Clase reservada
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-primary mt-3 w-100"
                                                    onClick={() => reservarClase(clase.id)}
                                                >
                                                    Reservar clase
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                {clasesDia.length === 0 && (
                                    <p className="mb-0 opacity-75">No hay clases para este día.</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {Object.keys(clasesPorDia).length === 0 && (
                    <div className="dashboard-card p-4">
                        <p className="mb-0 opacity-75">
                            No hay clases disponibles con el filtro seleccionado.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}