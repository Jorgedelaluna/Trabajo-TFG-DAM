/**
 * ============================================================
 *  PROTECTED ROUTE: ProtectedRoute.jsx
 * 
 *  Este componente envuelve rutas privadas que requieren:
 *    - Usuario autenticado (token válido)
 *    - Usuario cargado desde el backend (/me)
 *    - Rol permitido (si la ruta lo especifica)
 * 
 *  Si algo no cuadra o falla, redirige al usuario a la ruta adecuada.
 *  Es una capa de seguridad para evitar accesos no autorizados dentro de la aplicación.
 * ============================================================
 */
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// "children" es el contenido que envuelve este componente.
// React lo pasa automáticamente, por eso se llama así por convención.
// En este caso será la página privada que queremos proteger.
export default function ProtectedRoute({ roles, children }) {
  const { token, usuario, loading } = useAuth();

  // Mientras el AuthContext está comprobando el token
  // y cargando los datos del usuario desde "/me", mostramos un spinner.
  // Esto evita parpadeos o errores mientras se resuelve la sesión.
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si no hay token -> el usuario no está autenticado.
  // No puede entrar y es redirigido a la pagina de login.
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token pero no hay usuario -> sesión inválida.
  // Esto puede pasar si el token ha expirado o no es válido.
  // Mostramos un spinner mientras se intenta recuperar la sesión.
  if (!usuario) {
      return <Navigate to="/login" replace />;
  }

  // Comprobación de roles
  // Si la ruta requiere roles específicos (por ejemplo ["ADMIN"]),
  // comprobamos si el rol del usuario está permitido.
  if (roles && Array.isArray(roles)) {
    const rolUsuario = usuario?.rol;

    // Si el rol no está permitido, redirigimos según su rol real a su dashboard correspondiente.
    if (!roles.includes(rolUsuario)) {
      if (rolUsuario === "ADMIN") return <Navigate to="/admin/dashboard" replace />;
      if (rolUsuario === "COACH") return <Navigate to="/coach/dashboard" replace />;
      return <Navigate to="/user/dashboard" replace />;
    }
  }

  // Si todo está correcto, renderizamos la ruta protegida
  return children;
}
