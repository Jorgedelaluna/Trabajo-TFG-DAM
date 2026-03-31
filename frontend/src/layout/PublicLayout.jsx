/**
 * ============================================
 *  PUBLIC LAYOUT: PublicLayout.jsx
 * 
 *  Layout exclusivo para las páginas públicas de la aplicación.
 * 
 *  Funcionalidades:
 *    - Renderiza el contenido público mediante <Outlet />.
 *    - Mantiene un margen superior para evitar solaparse con el navbar global.
 *    - No incluye sidebar, ya que solo se usa en rutas privadas.
 * 
 *  El Navbar y el Footer se cargan de forma global en App.jsx,
 *  por eso este layout solo gestiona el área central.
 * ============================================
 */

import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <main
      style={{
        marginTop: "80px", // Evita que el contenido quede debajo del navbar
        padding: "20px",
        minHeight: "100vh", // Asegura que el contenido ocupa toda la pantalla
      }}
    >
      {/* Aqui se renderiza la página pública correspondiente.*/}
      <Outlet />
    </main>
  );
}
