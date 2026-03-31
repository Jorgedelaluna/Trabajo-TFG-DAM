/**
 * ============================================================
 *  PÃ�GINA DE LOGIN: LoginPage.jsx
 * 
 *  PÃ¡gina pÃºblica donde el usuario introduce sus credenciales.
 *  Funcionalidades:
 *    - Enviar email y contraseÃ±a al backend
 *    - Validar respuesta y guardar token + usuario en AuthContext
 *    - Redirigir al dashboard correspondiente segÃºn el rol
 * 
 *  Forma parte del flujo de autenticaciÃ³n general.
 * ============================================================
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import API_URL from "../api/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Estado del formulario
  const [form, setForm] = useState({ email: "", password: "" });

  // Estado para mostrar errores al usuario
  const [error, setError] = useState("");

  /**
   * ============================================================
   *  Actualizar campos del formulario
   * ============================================================
   */
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * ============================================================
   *  Enviar formulario de login
   * ============================================================
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/usuarios/login`, {
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

      /**
       * ============================================================
       * Redirigir segÃºn el rol del usuario
       * - Se redirige al usuario a su dashboard correspondiente
       * ============================================================
       */
      if (data.usuario.rol === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (data.usuario.rol === "COACH") {
        navigate("/coach/dashboard");
      } else {
        navigate("/user/dashboard");
      }

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
    <section className="auth-section d-flex justify-content-center align-items-center">
      <div className="card auth-card shadow p-4">

        {/* TÃ­tulo */}
        <h3 className="text-center mb-4 fw-bold">Iniciar sesiÃ³n</h3>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            
            {/* Email */}
            <label className="form-label fw-semibold">Correo electrÃ³nico</label>
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

          {/* ContraseÃ±a */}
          <div className="mb-3">
            <label className="form-label fw-semibold">ContraseÃ±a</label>
            <input
              type="password"
              name="password"
              className="form-control form-control-lg"
              placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* BotÃ³n entrar */}
          <button type="submit" className="btn btn-primary btn-lg w-100 mt-2">
            Entrar
          </button>
        </form>

        {/* Mensaje de error */}
        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {/* Enlace a registro */}
        <p className="text-center mt-3">
          Â¿No tienes cuenta?
          <Link to="/registro" className="fw-bold ms-1 text-primary">
            RegÃ­strate
          </Link>
        </p>

      </div>
    </section>
  );
}
