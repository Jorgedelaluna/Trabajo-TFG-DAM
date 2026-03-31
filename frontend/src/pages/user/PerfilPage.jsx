/**
 * ======================================================
 *  PERFIL DEL USUARIO
 *  - Muestra la información personal del usuario logueado
 *  - Permite editar algunos datos básicos (opcional)
 *  - Página sencilla y clara para el TFG
 * ======================================================
 */

import "../../styles/Dashboard.css";

import { useAuth } from "../../auth/AuthContext";
import { useState } from "react";
import API_URL from "../../api/api";
import axios from "axios";

export default function PerfilPage() {
  const { usuario, setUsuario } = useAuth();

  // Estado local para edición
  const [telefono, setTelefono] = useState(usuario?.telefono || "");
  const [guardando, setGuardando] = useState(false);

  /**
   * ======================================================
   *  GUARDAR CAMBIOS DE PERFIL
   *  - Solo actualiza teléfono (ejemplo simple para TFG)
   * ======================================================
   */
  const guardarCambios = async (e) => {
    e.preventDefault();
    setGuardando(true);

    try {
      const response = await axios.put(
		  `${API_URL}/usuarios/${usuario.id}`,
		  { ...usuario, telefono }
		);

      // Actualizar usuario en contexto
      setUsuario(response.data);

      alert("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error actualizando perfil:", error);
      alert("No se pudo actualizar el perfil");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <section className="container mt-4 text-light">

      <h1 className="fw-bold mb-4">Mi Perfil</h1>

      <div className="dashboard-card p-4 fade-in-up">

        {/* Datos del usuario */}
        <div className="row mb-4">
          <div className="col-md-6">
            <p><strong>Nombre:</strong> {usuario?.nombre}</p>
            <p><strong>Email:</strong> {usuario?.email}</p>
          </div>

          <div className="col-md-6">
            <p><strong>Rol:</strong> {usuario?.rol}</p>
            <p><strong>Estado de cuota:</strong> Activa</p>
          </div>
        </div>

        {/* Formulario de edición */}
        <form onSubmit={guardarCambios} className="row g-3">

          <div className="col-md-6">
            <label className="form-label">Teléfono</label>
            <input
              type="text"
              className="form-control"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>

          <div className="col-12 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={guardando}
            >
              {guardando ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>

        </form>

      </div>
    </section>
  );
}
