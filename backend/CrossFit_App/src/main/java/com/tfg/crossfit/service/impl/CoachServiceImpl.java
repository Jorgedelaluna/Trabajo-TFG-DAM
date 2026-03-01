package com.tfg.crossfit.service.impl;

import com.tfg.crossfit.model.Coach;
import com.tfg.crossfit.repository.CoachRepository;
import com.tfg.crossfit.service.CoachService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CoachServiceImpl implements CoachService {

    private final CoachRepository coachRepository;

    public CoachServiceImpl(CoachRepository coachRepository) {
        this.coachRepository = coachRepository;
    }

    // <-- Devuelve todos los coaches -->
    @Override
    public List<Coach> findAll() {
        return coachRepository.findAll();
    }

    // <-- Busca un coach concreto -->
    @Override
    public Optional<Coach> findById(Long id) {
        return coachRepository.findById(id);
    }

    // <-- Evita duplicados y permite búsquedas rápidas -->
    @Override
    public Optional<Coach> findByNombre(String nombre) {
        return coachRepository.findByNombre(nombre);
    }

    // <-- Incluye validación para evitar coaches con el mismo nombre -->
    @Override
    public Coach save(Coach coach) {
        // <-- Validación: evitar duplicados por nombre -->
        coachRepository.findByNombre(coach.getNombre())
                .ifPresent(c -> {
                    throw new RuntimeException("Ya existe un coach con ese nombre");
                });

        return coachRepository.save(coach);
    }

    // <-- Actualiza solo los campos editables -->
    @Override
    public Coach update(Long id, Coach coachActualizado) {
        Coach coach = coachRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coach no encontrado"));

        coach.setNombre(coachActualizado.getNombre());
        coach.setDescripcion(coachActualizado.getDescripcion());
        coach.setCertificaciones(coachActualizado.getCertificaciones());

        return coachRepository.save(coach);
    }

    // <-- Incluye validación opcional para evitar borrar coaches que tienen clases asignadas -->
    @Override
    public void delete(Long id) {
        Coach coach = coachRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coach no encontrado"));

        // <-- Si quieres evitar borrar coaches con clases asignadas -->
        if (coach.getClases() != null && !coach.getClases().isEmpty()) {
            throw new RuntimeException("No se puede eliminar un coach con clases asignadas");
        }

        coachRepository.delete(coach);
    }
}
