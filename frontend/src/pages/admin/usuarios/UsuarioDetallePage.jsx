/**
 * ======================================================
 *  PÃ�GINA ADMIN: UsuarioDetallePage.jsx
 * 
 *  Muestra la informaciÃ³n completa de un usuario concreto.
 *  Funcionalidades:
 *    - Obtiene los datos reales desde el backend usando su ID
 *    - Protegida por rol ADMIN desde App.jsx
 *    - Forma parte del panel de administraciÃ³n (AdminLayout)
 * 
 *  Esta vista permite al administrador consultar datos clave
 *  antes de realizar acciones de gestiÃ³n.
 * ======================================================
 */

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../../../styles/Dashboard.css";
import API_URL from "../../../api/api";

export default function UsuarioDetallePage() {

    // Obtener el ID del usuario desde la URL
    const { id } = useParams();

    // Estado donde guardamos los datos reales del usuario
    const [usuario, setUsuario] = useState(null);

    /**
     * ============================================================
     *  Cargar datos del usuario al entrar en la pÃ¡gina
     * ============================================================
     */
    useEffect(() => {
        cargarUsuario();
    }, []);

    const cargarUsuario = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No hay token");
                return;
            }

            const res = await axios.get(
                `${API_URL}/usuarios/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUsuario(res.data);
        } catch (error) {
            console.error("Error cargando usuario:", error);
        }
    };
    /**
     * ============================================================
     *  Estado de carga
     * ============================================================
     */
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

            {/* TÃ­tulo principal */}
            <h1 className="fw-bold mb-4">Detalle del Usuario</h1>

            {/* Tarjeta con estilo glass */}
            <div className="dashboard-card p-4">

                <p><strong>Nombre:</strong> {usuario.nombre}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>Rol:</strong> {usuario.rol}</p>
                <p><strong>Cuota:</strong> {usuario.cuota}</p>

                {/* BotÃ³n para volver */}
                <Link to="/admin/usuarios" className="btn btn-secondary mt-3">
                    Volver
                </Link>
            </div>

        </div>
    );
}