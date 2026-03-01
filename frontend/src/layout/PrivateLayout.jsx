/**
 * ============================================
 *  PRIVATE LAYOUT
 *  - Envuelve todas las páginas privadas
 *  - Se muestra solo cuando el usuario está logueado
 *  - Aquí podríamos añadir un sidebar en el futuro
 * ============================================
 */

import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function PrivateLayout() {
  return (
      <div style={{ display: "flex" }}>

      {/* ============================================
          SIDEBAR LATERAL IZQUIERDO
          - Solo visible en páginas privadas
          - Panel para navegación tipo app web
      ============================================ */}
        <Sidebar />

      {/* ============================================
          CONTENIDO PRINCIPAL
          - marginTop deja espacio para el navbar fijo
          - padding para mejora visual
      ============================================ */}
        <main style={{
          marginTop: "80px",
          padding: "20px",
          width: "100%"
          }}>
          
      {/* Outlet renderiza la página privada correspondiente.*/}
          <Outlet />
        </main>
      </div>
  );
}
