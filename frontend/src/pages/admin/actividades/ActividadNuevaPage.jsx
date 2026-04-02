/**
 * ============================================================
 *  P�GINA ADMIN: ActividadNuevaPage.jsx
 * 
 *  Permite crear una nueva actividad (CrossFit, Yoga…)
 *  Forma parte del panel de administración.
 * ============================================================
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/Dashboard.css";
import API_URL from "../../../api/api";

export default function ActividadNuevaPage() {

    const navigate = useNavigate();

    // Estado del formulario
    const [actividad, setActividad] = useState({
        nombre: "",
        descripcion: ""
    });

    /**
     * ============================================================
     * CREAR ACTIVIDAD
     * - Crear actividad en el backend
     * ============================================================
     */
    const crearActividad = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${API_URL}/actividades`, actividad);
            alert("Actividad creada");
            navigate("/admin/actividades");
        } catch (err) {
            console.error(err);
            alert("No se pudo crear la actividad");
        }
    };

    /**
    * ======================================================
    *  RENDER PRINCIPAL
    * ======================================================
    */
    return (
        <div className="dashboard-container-fluid">

            <h1 className="fw-bold mb-4">Nueva Actividad</h1>

            <div className="dashboard-card p-4">

                <form onSubmit={crearActividad} className="row g-3">

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

                    {/* Descripción */}
                    <div className="col-12">
                        <label className="form-label">Descripcion</label>
                        <textarea
                            className="form-control"
                            rows="3"
                            value={actividad.descripcion}
                            onChange={(e) => setActividad({ ...actividad, descripcion: e.target.value })}
                        />
                    </div>

                    {/* Botones */}
                    <div className="col-12 mt-3">
                        <button className="btn btn-primary me-2">Crear</button>
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
