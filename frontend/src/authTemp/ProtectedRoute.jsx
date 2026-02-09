import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext, useAuth } from "./AuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { token, usuario } = useAuth();
  const rol = usuario?.rol;

  // Si no hay token, fuera
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si se han definido roles permitidos y el rol del usuario no está entre ellos
  if (roles && usuario && !roles.includes(rol)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
