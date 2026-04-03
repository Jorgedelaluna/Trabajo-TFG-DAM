package com.tfg.crossfit.service.impl;

import com.tfg.crossfit.dto.ActividadDTO;
import com.tfg.crossfit.mapper.ActividadMapper;
import com.tfg.crossfit.model.Actividad;
import com.tfg.crossfit.repository.ActividadRepository;
import com.tfg.crossfit.service.ActividadService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActividadServiceImpl implements ActividadService {

	private final ActividadRepository actividadRepository;
	private final ActividadMapper actividadMapper;

	public ActividadServiceImpl(ActividadRepository actividadRepository, ActividadMapper actividadMapper) {
		this.actividadRepository = actividadRepository;
		this.actividadMapper = actividadMapper;
	}

	@Override
	public List<Actividad> findAll() {
		return actividadRepository.findAll();
	}

	@Override
	public Optional<Actividad> findById(Long id) {
		return actividadRepository.findById(id);
	}

	@Override
	public Actividad save(Actividad actividad) {
		return actividadRepository.save(actividad);
	}

	@Override
	public Optional<Actividad> update(Long id, ActividadDTO dto) {
		return actividadRepository.findById(id).map(actividadExistente -> {
			actividadMapper.updateEntityFromDto(dto, actividadExistente);
			return actividadRepository.save(actividadExistente);
		});
	}

	@Override
	public boolean delete(Long id) {
		if (!actividadRepository.existsById(id)) {
			return false;
		}

		actividadRepository.deleteById(id);
		return true;
	}
}