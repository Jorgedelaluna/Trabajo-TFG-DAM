import { Navigate } from "react-router-dom";
import { useAuth } from "../authTemp/AuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { token, usuario } = useAuth();

  // Si no hay token, no puede entrar
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token pero todavía no se ha cargado el usuario, no renderizamos nada
  // Evita parpadeos o accesos incorrectos
  if (token && !usuario) {
    return null;
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
