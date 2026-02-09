import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegistroPage() {
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
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
      const response = await fetch("http://localhost:8080/usuarios/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const msg = await response.text();
        setError(msg || "Error en el registro");
        return;
      }

      setSuccess("Usuario registrado correctamente. Ahora puedes iniciar sesión.");

    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        
        <h3 className="text-center mb-4">Registrarse</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
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

          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
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

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Registrarse
          </button>
        </form>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}

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
