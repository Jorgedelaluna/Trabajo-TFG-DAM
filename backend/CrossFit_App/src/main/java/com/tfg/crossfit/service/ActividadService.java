package com.tfg.crossfit.service;

import com.tfg.crossfit.dto.ActividadDTO;
import com.tfg.crossfit.model.Actividad;

import java.util.List;
import java.util.Optional;

public interface ActividadService {

	List<Actividad> findAll();

	Optional<Actividad> findById(Long id);

	Actividad save(Actividad actividad);

	Optional<Actividad> update(Long id, ActividadDTO dto);

	boolean delete(Long id);
}