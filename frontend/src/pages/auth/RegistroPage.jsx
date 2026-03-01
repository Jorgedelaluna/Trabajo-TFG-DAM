import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../authTemp/AuthContext";

export default function RegistroPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await register(form.nombre, form.email, form.password);
      setSuccess("Registro completado. Redirigiendo…");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err?.message || "No se pudo completar el registro");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4 fw-bold">Registrarse</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Nombre</label>
            <input type="text" name="nombre" className="form-control" value={form.nombre} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Correo electrónico</label>
            <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Contraseña</label>
            <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-primary w-100">Registrarse</button>
        </form>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}

        <p className="text-center mt-3">
          ¿Ya tienes cuenta?
          <Link to="/login" className="text-primary fw-bold ms-1">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}
