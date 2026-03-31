/**
 * ======================================================
 *  ADMIN LAYOUT: AdminLayout.jsx
 * 
 *  Layout exclusivo para administradores.
 * 
 *  Funcionalidades:
 *    - Renderiza el SidebarAdmin de forma fija en el lateral.
 *    - Muestra el contenido dinámico mediante <Outlet />.
 *    - Aísla completamente la navegación del administrador
 *      respecto a usuarios y visitantes públicos.
 * 
 *  Este layout garantiza una experiencia consistente dentro del
 *  panel de administración, manteniendo el estilo glass del dashboard.
 * ======================================================
 */
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import AdminSidebar from "../components/admin/SidebarAdmin";
import "../styles/Dashboard.css"; // usa tu mismo CSS

export default function AdminLayout() {
  const { usuario, loading } = useAuth();

  // Esperar a que AuthContext termine
  if (loading) return <p>Cargando...</p>;

  // Si no hay usuario → fuera
  if (!usuario) return <Navigate to="/login" />;

  // Si no es admin → que PanelRedirect decida
  if (usuario.rol !== "ADMIN") return <Navigate to="/panel" />;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}