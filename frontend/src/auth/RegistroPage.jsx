/**
 * ============================================================
 *  PáGINA DE REGISTRO: RegistroPage.jsx
 * 
 *  PÃ¡gina pÃºblica donde un nuevo usuario puede crear su cuenta.
 * 
 *  Funcionalidades:
 *    - Enviar datos del formulario al backend
 *    - Validar respuesta y mostrar mensajes de error/Ã©xito
 *    - Redirigir automÃ¡ticamente al login tras registrarse
 * 
 *  Nota:
 *    - No se realiza login automÃ¡tico para mantener seguridad
 *      y claridad en el flujo de autenticaciÃ³n.
 * ============================================================
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import API_URL from "../api/api";

export default function RegistroPage() {

    const navigate = useNavigate();
    const { login } = useAuth();

    // Estado del formulario
    const [form, setForm] = useState({
        nombre: "",
        email: "",
        password: ""
    });

    // Estados de feedback
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    /**
     * ============================================================
     * ACTUALIZAR FORMULARIO
     * - Actualizar campos del formulario
     * ============================================================
     */
    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    /**
     * ============================================================
     * ENVIAR FORMALARIO REGISTRO
     * - Enviar formulario de registro
     * ============================================================
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const res = await fetch(`${API_URL}/usuarios/registro`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            if (!res.ok) {
                // No mostramos mensajes sensibles del backend
                setError("No se pudo completar el registro");
                return;
            }

            const data = await res.json();
            console.log("REGISTRO:", data);

            // Mensaje de Ã©xito
            setSuccess("Registro completado. Redirigiendoâ€¦");

            // Redirigir al login tras un pequeÃ±o delay
            setTimeout(() => navigate("/login"), 1200);

        } catch (err) {
            setError("No se pudo conectar con el servidor");
        }
    };

    /**
     * ============================================================
     *  RENDER PRINCIPAL
     * ============================================================
     */
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>

                {/* Titulo */}
                <h3 className="text-center mb-4 fw-bold">Registrarse</h3>

                {/* Formulario */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">

                        {/* Nombre */}
                        <label className="form-label fw-semibold">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            className="form-control"
                            placeholder="Tu nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Correo electrónico</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="tuemail@ejemplo.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Contraseña */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="******"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Boton enviar */}
                    <button type="submit" className="btn btn-primary w-100">
                        Registrarse
                    </button>
                </form>

                {/* Mensajes de error o exito */}
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {success && <div className="alert alert-success mt-3">{success}</div>}

                {/* Enlace a login */}
                <p className="text-center mt-3">
                    ¿Ya tienes cuenta?
                    <Link to="/login" className="text-primary fw-bold ms-1">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}
