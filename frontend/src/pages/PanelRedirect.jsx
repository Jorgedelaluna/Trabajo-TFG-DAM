import { useAuth } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

export default function PanelRedirect() {
  const { usuario, loading } = useAuth();

  // Mientras carga el usuario
  if (loading) return <p>Cargando...</p>;

  // Si no hay usuario → fuera
  if (!usuario) return <Navigate to="/login" />;

  // Redirección según rol
  switch (usuario.rol) {
    case "ADMIN":
      return <Navigate to="/admin/dashboard" />;
    case "COACH":
      return <Navigate to="/coach/dashboard" />;
    default:
      return <Navigate to="/user/dashboard" />;
  }
}
