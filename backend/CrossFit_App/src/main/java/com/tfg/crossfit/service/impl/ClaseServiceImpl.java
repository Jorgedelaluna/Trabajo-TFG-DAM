package com.tfg.crossfit.service.impl;

import com.tfg.crossfit.dto.ClaseDTO;
import com.tfg.crossfit.mapper.ClaseMapper;
import com.tfg.crossfit.model.Actividad;
import com.tfg.crossfit.model.Clase;
import com.tfg.crossfit.model.HorarioClase;
import com.tfg.crossfit.repository.ActividadRepository;
import com.tfg.crossfit.repository.ClaseRepository;
import com.tfg.crossfit.repository.CoachRepository;
import com.tfg.crossfit.repository.HorarioClaseRepository;
import com.tfg.crossfit.service.ClaseService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class ClaseServiceImpl implements ClaseService {

	private final ClaseRepository claseRepository;
	private final ClaseMapper claseMapper;
	private final HorarioClaseRepository horarioClaseRepository;
	private final CoachRepository coachRepository;
	private final ActividadRepository actividadRepository;

	public ClaseServiceImpl(ClaseRepository claseRepository, ClaseMapper claseMapper,
			HorarioClaseRepository horarioClaseRepository, CoachRepository coachRepository,
			ActividadRepository actividadRepository) {
		this.claseRepository = claseRepository;
		this.claseMapper = claseMapper;
		this.horarioClaseRepository = horarioClaseRepository;
		this.coachRepository = coachRepository;
		this.actividadRepository = actividadRepository;
	}

	@Override
	public ClaseDTO crearClase(ClaseDTO claseDTO) {
		Clase clase = new Clase();

		clase.setFechaHora(claseDTO.getFechaHora());
		clase.setAforoMaximo(claseDTO.getAforoMaximo());

		Actividad actividad = actividadRepository.findById(claseDTO.getActividadId()).orElseThrow(
				() -> new RuntimeException("Actividad no encontrada con id: " + claseDTO.getActividadId()));
		clase.setActividad(actividad);

		var coach = coachRepository.findById(claseDTO.getCoachId())
				.orElseThrow(() -> new RuntimeException("Coach no encontrado con id: " + claseDTO.getCoachId()));
		clase.setCoach(coach);

		Clase guardada = claseRepository.save(clase);
		return claseMapper.toDTO(guardada);
	}

	@Override
	public List<ClaseDTO> listarClases() {
		return claseRepository.findAll().stream().map(claseMapper::toDTO).toList();
	}

	@Override
	public ClaseDTO obtenerClase(Long id) {
		Clase clase = claseRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Clase no encontrada"));
		return claseMapper.toDTO(clase);
	}

	@Override
	public void eliminarClase(Long id) {
		if (!claseRepository.existsById(id)) {
			throw new EntityNotFoundException("Clase no encontrada");
		}
		claseRepository.deleteById(id);
	}

	@Override
	public ClaseDTO actualizarClase(Long id, ClaseDTO claseDTO) {
		Clase clase = claseRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Clase no encontrada"));

		clase.setFechaHora(claseDTO.getFechaHora());
		clase.setAforoMaximo(claseDTO.getAforoMaximo());

		Actividad actividad = actividadRepository.findById(claseDTO.getActividadId()).orElseThrow(
				() -> new RuntimeException("Actividad no encontrada con id: " + claseDTO.getActividadId()));
		clase.setActividad(actividad);

		var coach = coachRepository.findById(claseDTO.getCoachId())
				.orElseThrow(() -> new RuntimeException("Coach no encontrado con id: " + claseDTO.getCoachId()));
		clase.setCoach(coach);

		Clase actualizada = claseRepository.save(clase);
		return claseMapper.toDTO(actualizada);
	}

	@Override
	public Clase obtenerEntidad(Long id) {
		return claseRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Clase no encontrada"));
	}

	@Override
	public void generarClasesDesdeHorario() {
		List<HorarioClase> horarios = horarioClaseRepository.findAll();

		for (HorarioClase h : horarios) {
			try {
				if ("CERRADO".equalsIgnoreCase(h.getTipo())) {
					continue;
				}

				if (h.getHora() == null || h.getHora().equals("--:--")) {
					continue;
				}

				LocalTime hora;
				try {
					hora = LocalTime.parse(h.getHora());
				} catch (Exception e) {
					continue;
				}

				DayOfWeek dia = convertirDia(h.getDiaSemana());

				LocalDate hoy = LocalDate.now();
				int diff = dia.getValue() - hoy.getDayOfWeek().getValue();
				if (diff <= 0)
					diff += 7;

				LocalDate fecha = hoy.plusDays(diff);
				LocalDateTime fechaHora = LocalDateTime.of(fecha, hora);

				Clase clase = new Clase();
				clase.setActividad(h.getActividad());
				clase.setFechaHora(fechaHora);
				clase.setAforoMaximo(20);
				clase.setCoach(h.getCoach());

				claseRepository.save(clase);

			} catch (Exception e) {
				System.out.println("Error generando clase para horario " + h.getId() + ": " + e.getMessage());
			}
		}
	}

	private DayOfWeek convertirDia(String dia) {
		dia = dia.toUpperCase();

		if (dia.equals("LUNES"))
			return DayOfWeek.MONDAY;
		if (dia.equals("MARTES"))
			return DayOfWeek.TUESDAY;
		if (dia.equals("MIERCOLES"))
			return DayOfWeek.WEDNESDAY;
		if (dia.equals("JUEVES"))
			return DayOfWeek.THURSDAY;
		if (dia.equals("VIERNES"))
			return DayOfWeek.FRIDAY;
		if (dia.equals("SABADO"))
			return DayOfWeek.SATURDAY;
		if (dia.equals("DOMINGO"))
			return DayOfWeek.SUNDAY;

		throw new IllegalArgumentException("Día no válido: " + dia);
	}
}