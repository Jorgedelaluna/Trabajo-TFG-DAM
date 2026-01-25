package com.tfg.crossfit.service.impl;

import com.tfg.crossfit.model.Ejercicio;
import com.tfg.crossfit.repository.EjercicioRepository;
import com.tfg.crossfit.service.EjercicioService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EjercicioServiceImpl implements EjercicioService {

    private final EjercicioRepository ejercicioRepository;

    public EjercicioServiceImpl(EjercicioRepository ejercicioRepository) {
        this.ejercicioRepository = ejercicioRepository;
    }

    // <-- Devuelve todos los ejercicios -->
    @Override
    public List<Ejercicio> findAll() {
        return ejercicioRepository.findAll();
    }

    // <-- Devuelve un ejercicio por su ID -->
    @Override
    public Optional<Ejercicio> findById(Long id) {
        return ejercicioRepository.findById(id);
    }

    // <-- Busca un ejercicio por su nombre -->
    @Override
    public Optional<Ejercicio> findByNombre(String nombre) {
        return ejercicioRepository.findByNombre(nombre);
    }

    // <-- Devuelve todos los ejercicios de un tipo concreto -->
    @Override
    public List<Ejercicio> findByTipo(String tipo) {
        return ejercicioRepository.findByTipo(tipo);
    }

    // <-- Evita duplicar ejercicios por nombre -->
    @Override
    public Ejercicio save(Ejercicio ejercicio) {
        // <-- Validación: evitar duplicados por nombre -->
        ejercicioRepository.findByNombre(ejercicio.getNombre())
                .ifPresent(e -> {
                    throw new RuntimeException("Ya existe un ejercicio con ese nombre");
                });

        return ejercicioRepository.save(ejercicio);
    }

    // <-- Actualiza solo los campos permitidos (nombre, descripción, tipo) -->
    @Override
    public Ejercicio update(Long id, Ejercicio ejercicioActualizado) {
        Ejercicio ejercicio = ejercicioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ejercicio no encontrado"));

        ejercicio.setNombre(ejercicioActualizado.getNombre());
        ejercicio.setDescripcion(ejercicioActualizado.getDescripcion());
        ejercicio.setTipo(ejercicioActualizado.getTipo());

        return ejercicioRepository.save(ejercicio);
    }

    // <-- Evita borrar ejercicios que están en un WOD o tienen PRs asociados -->
    @Override
    public void delete(Long id) {
        Ejercicio ejercicio = ejercicioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ejercicio no encontrado"));

        // <-- Validación opcional: evitar borrar ejercicios usados en WODs o PRs -->
        if ((ejercicio.getWodEjercicios() != null && !ejercicio.getWodEjercicios().isEmpty()) ||
                (ejercicio.getPrs() != null && !ejercicio.getPrs().isEmpty())) {

            throw new RuntimeException("No se puede eliminar un ejercicio que está en uso");
        }

        ejercicioRepository.delete(ejercicio);
    }
}
