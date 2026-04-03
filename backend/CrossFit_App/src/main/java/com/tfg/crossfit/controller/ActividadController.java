package com.tfg.crossfit.controller;

import com.tfg.crossfit.dto.ActividadDTO;
import com.tfg.crossfit.mapper.ActividadMapper;
import com.tfg.crossfit.model.Actividad;
import com.tfg.crossfit.service.ActividadService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/actividades")
public class ActividadController {

	private final ActividadService actividadService;
	private final ActividadMapper actividadMapper;

	public ActividadController(ActividadService actividadService, ActividadMapper actividadMapper) {
		this.actividadService = actividadService;
		this.actividadMapper = actividadMapper;
	}

	@GetMapping
	public ResponseEntity<List<ActividadDTO>> getAllActividad() {
		List<ActividadDTO> lista = actividadService.findAll().stream().map(actividadMapper::toDTO).toList();

		return ResponseEntity.ok(lista);
	}

	@GetMapping("/{id}")
	public ResponseEntity<ActividadDTO> getActividadById(@PathVariable Long id) {
		return actividadService.findById(id).map(actividadMapper::toDTO).map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	public ResponseEntity<ActividadDTO> createActividad(@RequestBody ActividadDTO dto) {
		Actividad actividad = actividadMapper.toEntity(dto);
		Actividad saved = actividadService.save(actividad);
		return ResponseEntity.status(HttpStatus.CREATED).body(actividadMapper.toDTO(saved));
	}

	@PutMapping("/{id}")
	public ResponseEntity<ActividadDTO> updateActividad(@PathVariable Long id, @RequestBody ActividadDTO dto) {
		return actividadService.update(id, dto).map(actividadMapper::toDTO).map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteActividad(@PathVariable Long id) {
		boolean deleted = actividadService.delete(id);

		if (deleted) {
			return ResponseEntity.noContent().build();
		}

		return ResponseEntity.notFound().build();
	}
}