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
                    <div className="alert alert-info clases-usuario-alert text-center mb-0">
                        {mensaje}
                    </div>
                </div>
            )}

            {clasesFiltradas.length === 0 ? (
                <div className="dashboard-card p-4">
                    <p className="mb-0 opacity-75">
                        No hay clases disponibles con el filtro seleccionado.
                    </p>
                </div>
            ) : (
                <div className="clases-lista-moderna">
                    {[...clasesFiltradas]
                        .sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora))
                        .map((clase) => {
                            const fecha = new Date(clase.fechaHora);

                            const hora = fecha.toLocaleTimeString("es-ES", {
                                hour: "2-digit",
                                minute: "2-digit",
                            });

                            const fechaCorta = fecha.toLocaleDateString("es-ES", {
                                weekday: "short",
                                day: "2-digit",
                                month: "2-digit",
                            });

                            const reservada = clasesReservadas.has(clase.id);

                            return (
                                <div
                                    key={clase.id}
                                    className="dashboard-card clase-item-card clase-agenda-card mb-3"
                                >
                                    <div className="clase-agenda-time">
                                        <div className="clase-agenda-hour">
                                            <FaClock className="me-2" />
                                            {hora}
                                        </div>
                                        <div className="clase-agenda-date">
                                            {fechaCorta}
                                        </div>
                                    </div>

                                    <div className="clase-agenda-content">
                                        <h4 className="mb-2">{clase.actividadNombre}</h4>

                                        <p className="mb-1">
                                            <strong>Coach:</strong> {clase.coachNombre}
                                        </p>

                                        <p className="mb-0 opacity-75">
                                            <strong>Aforo máximo:</strong> {clase.aforoMaximo}
                                        </p>
                                    </div>

                                    <div className="clase-agenda-action">
                                        {reservada ? (
                                            <>
                                                <span className="badge bg-success mb-2">
                                                    Reservada
                                                </span>
                                                <button
                                                    className="btn btn-secondary btn-reservar"
                                                    disabled
                                                >
                                                    Clase reservada
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <span className="badge bg-info text-dark mb-2">
                                                    Disponible
                                                </span>
                                                <button
                                                    className="btn btn-primary btn-reservar"
                                                    onClick={() => reservarClase(clase.id)}
                                                >
                                                    Reservar clase
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
}