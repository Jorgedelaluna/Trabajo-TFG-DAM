import { Navigate } from "react-router-dom";
import { useAuth } from "../authTemp/AuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { token, usuario, loading } = useAuth();

  // Mientras carga el usuario desde /me
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si no hay token, no puede entrar
  if (!token) {
    return <Navigate to="/login" replace />;
  }

// Si hay token pero no hay usuario → sesión inválida
  if (!usuario) {
    return ( 
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status"></div>
        </div>
        );
  }

  // Comprobación de roles (si se han definido)
  if (roles && Array.isArray(roles)) {
    const rolUsuario = usuario?.rol;

    if (!roles.includes(rolUsuario)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
