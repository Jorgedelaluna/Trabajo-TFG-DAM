import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { token, rol } = useAuth();

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  if (roles && !roles.includes(rol)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
