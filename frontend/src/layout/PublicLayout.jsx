/**
 * ============================================
 *  PUBLIC LAYOUT
 *  - Envuelve todas las páginas públicas
 *  - Deja espacio para el navbar fijo superior
 *  - Renderiza el contenido mediante <Outlet />
 * ============================================
 */

import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <main
      style={{
        marginTop: "80px", // evita que el contenido quede debajo del navbar
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      {/* Outlet renderiza la página pública correspondiente.*/}
      <Outlet />
    </main>
  );
}
