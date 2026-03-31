/**
 * ============================================
 *  PRIVATE LAYOUT: PrivateLayout.jsx
 * 
 *  Layout exclusivo para usuarios autenticados (USER, COACH, ADMIN).
 * 
 *  Funcionalidades:
 *    - Renderiza el SidebarUsuario en el lateral izquierdo.
 *    - Muestra el contenido dinámico mediante <Outlet />.
 *    - Evita que el contenido quede oculto bajo el navbar global.
 * 
 *  Las rutas de administración NO pasan por este layout, ya que
 *  tienen su propio AdminLayout con su sidebar correspondiente.
 * ============================================
 */

import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Sidebar from "../components/user/SidebarUsuario";

export default function PrivateLayout() {
  const { usuario, loading } = useAuth();

  // Esperar a que AuthContext termine
  if (loading) return <p>Cargando...</p>;

  // Si no hay usuario → fuera
  if (!usuario) return <Navigate to="/login" />;

  // Si el rol NO es válido → que PanelRedirect decida
  if (!["USER", "COACH", "ADMIN"].includes(usuario.rol)) {
    return <Navigate to="/panel" />;
  }

  return (
    <div style={{ display: "flex" }}>

      {/* Sidebar del usuario (solo aparece en rutas privadas de usuario) */}
      <Sidebar />

      {/* Contenedor principal donde se renderizan las páginas */}
      <main
        style={{
          marginTop: "80px", // Evita que el contenido quede debajo del navbar
          padding: "20px",
          width: "100%" // Asegura que el contenido ocupa toda la pantalla
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
