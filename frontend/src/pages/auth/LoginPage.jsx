// pages/auth/LoginPage.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../authTemp/AuthContext";
import API_URL from "../../api/api";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [cargandoLogin, setCargandoLogin] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setCargandoLogin(true);

        try {
            const res = await fetch(`${API_URL}/usuarios/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                setError("Credenciales incorrectas");
                return;
            }

            const data = await res.json();
            console.log("DATA LOGIN:", data);

            login(data.token, data.usuario);
            console.log("TOKEN GUARDADO:", data.token);

            navigate("/dashboard");
        } catch (err) {
            setError("No se pudo conectar con el servidor");
        } finally {
            setCargandoLogin(false);
        }
    };

    return (
        <section className="auth-section d-flex justify-content-center align-items-center">
            <div className="card auth-card shadow p-4 login-card-glass">
                <h3 className="text-center mb-4 fw-bold">Iniciar sesión</h3>

                <form
                    onSubmit={handleSubmit}
                    className="login-form"
                    aria-busy={cargandoLogin}
                >
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
                            disabled={cargandoLogin}
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
                            disabled={cargandoLogin}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100 mt-2 login-submit-btn"
                        disabled={cargandoLogin}
                        aria-busy={cargandoLogin}
                    >
                        {cargandoLogin ? "Cargando login..." : "Entrar"}
                    </button>

                    {cargandoLogin && (
                        <div
                            className="login-loading-message mt-3"
                            role="status"
                            aria-live="polite"
                        >
                            <span className="login-loading-spinner" aria-hidden="true"></span>
                            <span>Cargando datos de usuario, por favor espere.</span>
                        </div>
                    )}
                </form>

                {error && (
                    <div className="alert alert-danger mt-3 login-error-alert">
                        {error}
                    </div>
                )}

                <p className="text-center mt-3 mb-0">
                    ¿No tienes cuenta?
                    <Link to="/registro" className="fw-bold ms-1 text-primary">
                        Regístrate
                    </Link>
                </p>
            </div>
        </section>
    );
}