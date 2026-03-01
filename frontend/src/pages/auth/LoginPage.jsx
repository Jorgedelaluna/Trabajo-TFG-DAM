// pages/auth/LoginPage.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../authTemp/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        // No mostramos mensajes sensibles del backend
        setError("Credenciales incorrectas");
        return;
      }

      const data = await res.json();
      console.log("DATA LOGIN:", data);

      // Guardamos token y usuario en el contexto
      login(data.token, data.usuario);
      console.log("TOKEN GUARDADO:", data.token);

      // Redirigimos al dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("No se pudo conectar con el servidor");
    }
  };

  return (
    <section className="auth-section d-flex justify-content-center align-items-center">
      <div className="card auth-card shadow p-4">

        <h3 className="text-center mb-4 fw-bold">Iniciar sesión</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Correo electrónico</label>
            <input
              type="email"
              name="email"
              className="form-control form-control-lg"
              placeholder="tuemail@ejemplo.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control form-control-lg"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-100 mt-2">
            Entrar
          </button>
        </form>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        <p className="text-center mt-3">
          ¿No tienes cuenta?
          <Link to="/registro" className="fw-bold ms-1 text-primary">
            Regístrate
          </Link>
        </p>

      </div>
    </section>
  );
}
