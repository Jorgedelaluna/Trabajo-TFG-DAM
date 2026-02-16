import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:8080/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const msg = await response.text();
        setError(msg || "Error en el login");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setSuccess("Login correcto. Token guardado.");
    } catch (err) {
      setError("Error de conexión con el servidor");
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
        {success && <div className="alert alert-success mt-3">{success}</div>}

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
