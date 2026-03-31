/**
 * ======================================================
 *  COACH LAYOUT: CoachLayout.jsx
 * 
 *  Layout exclusivo para coach.
 * 
 *  - Espera a que el usuario esté cargado
 *  - Verifica que el rol sea COACH
 *  - Renderiza el contenido del coach mediante <Outlet />
 * ======================================================
 */
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import SidebarCoach from "../components/coach/SidebarCoach";

export default function CoachLayout() {
  const { usuario, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;
  if (!usuario) return <Navigate to="/login" />;
  if (usuario.rol !== "COACH") return <Navigate to="/panel" />;

  return (
    <div style={{ display: "flex" }}>
      <SidebarCoach />

      <main
        style={{
          marginTop: "80px",
          padding: "20px",
          flex: 1,
          width: "100%"
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}