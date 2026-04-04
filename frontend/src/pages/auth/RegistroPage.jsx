import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../authTemp/AuthContext";
import API_URL from "../../api/api";

export default function RegistroPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        nombre: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [cargandoRegistro, setCargandoRegistro] = useState(false);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setCargandoRegistro(true);

        try {
            const res = await fetch(`${API_URL}/usuarios/registro`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            if (!res.ok) {
                setError("No se pudo completar el registro");
                return;
            }

            const data = await res.json();

            // Si quieres login automático:
            // login(data.token, data.usuario);

            setSuccess("Registro completado. Redirigiendo…");

            setTimeout(() => navigate("/login"), 1200);
        } catch (err) {
            setError("No se pudo conectar con el servidor");
        } finally {
            setCargandoRegistro(false);
        }
    };

    return (
        <section className="auth-section d-flex justify-content-center align-items-center">
            <div className="card auth-card shadow p-4 login-card-glass">
                <h3 className="text-center mb-4 fw-bold">Registrarse</h3>

                <form
                    onSubmit={handleSubmit}
                    className="login-form"
                    aria-busy={cargandoRegistro}
                >
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            className="form-control form-control-lg login-input"
                            placeholder="Tu nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            required
                            disabled={cargandoRegistro}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Correo electrónico</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control form-control-lg login-input"
                            placeholder="tuemail@ejemplo.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                            disabled={cargandoRegistro}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control form-control-lg login-input"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                            required
                            disabled={cargandoRegistro}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100 mt-2 login-submit-btn"
                        disabled={cargandoRegistro}
                        aria-busy={cargandoRegistro}
                    >
                        {cargandoRegistro ? "Creando cuenta..." : "Registrarse"}
                    </button>

                    {cargandoRegistro && (
                        <div
                            className="login-loading-message mt-3"
                            role="status"
                            aria-live="polite"
                        >
                            <span className="login-loading-spinner" aria-hidden="true"></span>
                            <span>Estamos creando tu cuenta. Puede tardar unos segundos.</span>
                        </div>
                    )}
                </form>

                {error && (
                    <div className="alert alert-danger mt-3 login-error-alert">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="alert alert-success mt-3 login-success-alert">
                        {success}
                    </div>
                )}

                <p className="text-center mt-3 mb-0">
                    ¿Ya tienes cuenta?
                    <Link to="/login" className="fw-bold ms-1 text-primary">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </section>
    );
}