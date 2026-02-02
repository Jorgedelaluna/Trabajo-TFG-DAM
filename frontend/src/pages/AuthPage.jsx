import React, { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: ""
  });

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
      const endpoint = isLogin ? "/usuarios/login" : "/usuarios/registro";

      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const msg = await response.text();
        setError(msg || "Error en la operación");
        return;
      }

      const data = await response.json();

      if (isLogin) {
        // Guardar token
        localStorage.setItem("token", data.token);
        setSuccess("Login correcto. Token guardado.");
      } else {
        setSuccess("Usuario registrado correctamente. Ahora puedes iniciar sesión.");
      }

    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{isLogin ? "Iniciar sesión" : "Registrarse"}</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              style={styles.input}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            {isLogin ? "Entrar" : "Registrarse"}
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <p style={styles.toggle}>
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={styles.link}
          >
            {isLogin ? " Regístrate" : " Inicia sesión"}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f4f4"
  },
  card: {
    width: "350px",
    padding: "30px",
    borderRadius: "10px",
    background: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  toggle: {
    marginTop: "15px",
    textAlign: "center"
  },
  link: {
    color: "#007bff",
    cursor: "pointer",
    fontWeight: "bold"
  },
  error: {
    color: "red",
    marginTop: "10px"
  },
  success: {
    color: "green",
    marginTop: "10px"
  }
};
