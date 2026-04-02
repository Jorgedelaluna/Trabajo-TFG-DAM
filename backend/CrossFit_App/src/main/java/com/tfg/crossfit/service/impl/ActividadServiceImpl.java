package com.tfg.crossfit.service.impl;

import com.tfg.crossfit.model.Actividad;
import com.tfg.crossfit.repository.ActividadRepository;
import com.tfg.crossfit.service.ActividadService;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActividadServiceImpl implements ActividadService {

    private final ActividadRepository actividadRepository;

    public ActividadServiceImpl(ActividadRepository actividadRepository) {
        this.actividadRepository = actividadRepository;
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
}