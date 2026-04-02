package com.tfg.crossfit.service;

import com.tfg.crossfit.model.Actividad;
import com.tfg.crossfit.model.Coach;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public interface ActividadService {
	List<Actividad> findAll();

	Optional<Actividad> findById(Long id);

	Actividad save(Actividad Actividad);
}
