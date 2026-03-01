// components/home/UserHeader.jsx
// ------------------------------------------------------
// Cabecera reutilizable para páginas internas del usuario.
// Muestra un título, un subtítulo y opcionalmente el nombre
// del usuario logueado desde el AuthContext.
// ------------------------------------------------------

import { useAuth } from "../../authTemp/AuthContext";

export default function UserHeader({ title, subtitle }) {
  const { usuario } = useAuth(); // Obtenemos el usuario logueado

  return (
    <header className="user-header">

      {/* Título principal */}
      <h1 className="user-header-title">{title}</h1>

      {/* Subtítulo opcional */}
      {subtitle && <p className="user-header-subtitle">{subtitle}</p>}

      {/* Nombre del usuario (si existe) */}
      {usuario && (
        <p className="user-header-user">
          Conectado como: <strong>{usuario.nombre}</strong>
        </p>
      )}

    </header>
  );
}
