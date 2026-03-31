/**
 * ============================================================
 *  COMPONENTE: ListaClasesDia.jsx
 * 
 *  Muestra todas las clases correspondientes al día seleccionado.
 *  Este componente se usa dentro de ReservasPage.jsx.
 * 
 *  Funcionalidades:
 *    - Carga todas las clases desde el backend
 *    - Filtra las clases según el día recibido por props
 *    - Muestra hora, actividad y plazas disponibles
 *    - Incluye el botón de reserva (BotonReserva)
 * ============================================================
 */

import { useEffect, useState } from "react";
import { apiGet } from "../../../api/api";
import BotonReserva from "./BotonReserva";

export default function ListaClasesDia({ dia }) {

  // Todas las clases obtenidas del backend
  const [clases, setClases] = useState([]);

    /**
   * ============================================================
   *  Cargar clases desde el backend
   *  - Se ejecuta una sola vez al montar el componente
   *  - Se controla el error para evitar caídas
   * ============================================================
   */
  useEffect(() => {
    const cargarClases = async () => {
      try {
        const data = await apiGet("/clases");
        setClases(data);
      } catch (err) {
        console.error("Error cargando clases:", err);
      }
    };

    cargarClases();
  }, []);
  /**
   * ============================================================
   *  Filtrar clases por día seleccionado
   *  - El backend debe devolver la propiedad "diaSemana"
   * ============================================================
   */
  const clasesDia = clases.filter(c => {
    const diaClase = new Date(c.fechaHora).toLocaleDateString("es-ES", {
      weekday: "long"
    });

    return diaClase.toLowerCase() === dia.toLowerCase();
  });

  return (
    <div className="card clases-card shadow">
      <div className="card-body">

        {/* Título del día */}
        <h4 className="text-light fw-bold mb-4">{dia}</h4>

        {/* Si no hay clases */}
        {clasesDia.length === 0 && (
          <p className="text-light opacity-75">No hay clases disponibles.</p>
        )}

        {/* Lista de clases */}
        <div className="list-group">
          {clasesDia.map((clase) => (
            <div key={clase.id} className="list-group-item clase-item">
              <div>

                {/* Información de la clase */}
                <h5 className="text-light m-0">
                  {clase.fechaHora.substring(11, 16)}
                </h5>
                <p className="text-light opacity-75 m-0">
                  {clase.actividad?.nombre ?? "Sin actividad asignada"}
                </p>
              </div>

              {/* Botón de reserva */}
              <BotonReserva
                claseId={clase.id}
                plazas={clase.aforoMaximo - clase.inscritos}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
