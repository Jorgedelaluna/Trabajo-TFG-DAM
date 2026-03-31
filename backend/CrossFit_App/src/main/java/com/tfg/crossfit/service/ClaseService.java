package com.tfg.crossfit.service;

import com.tfg.crossfit.dto.ClaseDTO;
import com.tfg.crossfit.mapper.ClaseMapper;
import com.tfg.crossfit.model.Actividad;
import com.tfg.crossfit.model.Clase;
import com.tfg.crossfit.repository.ClaseRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import com.tfg.crossfit.model.HorarioClase;
import com.tfg.crossfit.repository.HorarioClaseRepository;
import com.tfg.crossfit.repository.CoachRepository;
import com.tfg.crossfit.repository.ActividadRepository;

import java.time.*;
import java.util.List;

@Service
public class ClaseService {

    private final ClaseRepository claseRepository;
    private final ClaseMapper claseMapper;
    private final HorarioClaseRepository horarioClaseRepository;
    private final CoachRepository coachRepository;
    private final ActividadRepository actividadRepository;

    // Constructor con las dependencias necesarias
    public ClaseService(ClaseRepository claseRepository, ClaseMapper claseMapper,
                        HorarioClaseRepository horarioClaseRepository,
                        CoachRepository coachRepository,
                        ActividadRepository actividadRepository) {

        this.claseRepository = claseRepository;
        this.claseMapper = claseMapper;
        this.horarioClaseRepository = horarioClaseRepository;
        this.coachRepository = coachRepository;
        this.actividadRepository = actividadRepository;
    }

    // Método para crear una nueva clase a partir de un DTO
    public ClaseDTO crearClase(ClaseDTO claseDTO) {
        Clase clase = claseMapper.toEntity(claseDTO);
        Clase guardada = claseRepository.save(clase);
        return claseMapper.toDTO(guardada);
    }

    // Método para listar todas las clases guardadas
    public List<ClaseDTO> listarClases() {
        return claseRepository.findAll()
                .stream()
                .map(claseMapper::toDTO)
                .toList(); }

    // Método para buscar una clase por id
    public ClaseDTO obtenerClase(Long id) {
        Clase clase = claseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Clase no encontrada"));
        return claseMapper.toDTO(clase);
    }

    // Método para eliminar una clase por id
    public void eliminarClase(Long id) {
        if (!claseRepository.existsById(id)) {
            throw new EntityNotFoundException("Clase no encontrada");
        }
        claseRepository.deleteById(id); }

    // Método para obtener la entidad Clase
    public Clase obtenerEntidad(Long id) {
        return claseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Clase no encontrada"));
    }

    // Método para generar clases a partir del horario de la base de datos
    public void generarClasesDesdeHorario() {
        System.out.println("=== EJECUTANDO GENERAR CLASES ===");

        List<HorarioClase> horarios = horarioClaseRepository.findAll();
        System.out.println("Horarios encontrados: " + horarios.size());

        for (HorarioClase h : horarios) {

            try{
                // Omitir días marcados como cerrados
                if ("CERRADO".equalsIgnoreCase(h.getTipo())) {
                    System.out.println("Saltando horario cerrado: " + h.getDiaSemana());
                    continue;
                }

                // Calcular la fecha real del próximo día de la semana
                // Saltar horas inválidas como "--:--"
                if (h.getHora() == null || h.getHora().equals("--:--")) {
                    System.out.println("Hora inválida en horario: " + h.getId());
                    continue;
                }

                // Convertir hora
                LocalTime hora;
                try {
                    hora = LocalTime.parse(h.getHora());
                } catch (Exception e) {
                    System.out.println("Formato de hora inválido: " + h.getHora());
                    continue;
                }

                // Convertir día de la semana
                DayOfWeek dia = convertirDia(h.getDiaSemana());

                // Calcular fecha real del próximo día
                LocalDate hoy = LocalDate.now();
                int diff = dia.getValue() - hoy.getDayOfWeek().getValue();
                if (diff <= 0) diff += 7;
                LocalDate fecha = hoy.plusDays(diff);

                LocalDateTime fechaHora = LocalDateTime.of(fecha, hora);

                // Obtener coach dinámicamente
                var coach = h.getCoach();
                System.out.println("Coach en horario: " + h.getCoach().getNombre());

                // Obtener actividad desde la BD
                Actividad actividad = h.getActividad();
                System.out.println("Actividad en horario: " + h.getActividad().getNombre());

                // Crear clase real
                Clase clase = new Clase();
                clase.setActividad(actividad);
                clase.setFechaHora(fechaHora);
                clase.setAforoMaximo(20); // Valor configurable
                clase.setCoach(coach);

                claseRepository.save(clase);
                System.out.println("Clase generada: " + clase.getActividad().getNombre() + " - " + fechaHora);

                } catch (Exception e) {
                System.out.println("Error generando clase para horario " + h.getId() + ": " + e.getMessage());
                }
        }

    }

    // Convertir día de la semana en español de DayOfWeek
    private DayOfWeek convertirDia(String dia) {
        dia = dia.toUpperCase();

        if (dia.equals("LUNES")) return DayOfWeek.MONDAY;
        if (dia.equals("MARTES")) return DayOfWeek.TUESDAY;
        if (dia.equals("MIERCOLES")) return DayOfWeek.WEDNESDAY;
        if (dia.equals("JUEVES")) return DayOfWeek.THURSDAY;
        if (dia.equals("VIERNES")) return DayOfWeek.FRIDAY;
        if (dia.equals("SABADO")) return DayOfWeek.SATURDAY;
        if (dia.equals("DOMINGO")) return DayOfWeek.SUNDAY;

        throw new IllegalArgumentException("Día no válido: " + dia);
    }

}
