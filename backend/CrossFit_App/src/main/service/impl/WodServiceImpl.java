package com.tfg.crossfit.service.impl;

import com.tfg.crossfit.model.Wod;
import com.tfg.crossfit.repository.WodRepository;
import com.tfg.crossfit.service.WodService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class WodServiceImpl implements WodService {

    private final WodRepository wodRepository;

    public WodServiceImpl(WodRepository wodRepository) {
        this.wodRepository = wodRepository;
    }

    // <-- Devuelve todos los WODs -->
    @Override
    public List<Wod> findAll() {
        return wodRepository.findAll();
    }

    // <-- Devuelve un WOD por su ID -->
    @Override
    public Optional<Wod> findById(Long id) {
        return wodRepository.findById(id);
    }

    // <-- Devuelve los WODs de una fecha concreta -->
    @Override
    public List<Wod> findByFecha(LocalDate fecha) {
        return wodRepository.findByFecha(fecha);
    }

    // <-- Busca WODs cuyo nombre contenga el texto indicado -->
    @Override
    public List<Wod> findByNombre(String nombre) {
        return wodRepository.findByNombreContainingIgnoreCase(nombre);
    }

    // <-- Evita duplicar WODs con el mismo nombre en la misma fecha -->
    @Override
    public Wod save(Wod wod) {
        // <-- Validación: evitar duplicar WODs en la misma fecha con el mismo nombre -->
        List<Wod> existentes = wodRepository.findByFecha(wod.getFecha());
        boolean duplicado = existentes.stream()
                .anyMatch(w -> w.getNombre().equalsIgnoreCase(wod.getNombre()));

        if (duplicado) {
            throw new RuntimeException("Ya existe un WOD con ese nombre en esa fecha");
        }

        return wodRepository.save(wod);
    }

    // <-- Actualiza solo campos permitidos del WOD -->
    @Override
    public Wod update(Long id, Wod wodActualizado) {
        Wod wod = wodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("WOD no encontrado"));

        wod.setNombre(wodActualizado.getNombre());
        wod.setDescripcion(wodActualizado.getDescripcion());
        wod.setFecha(wodActualizado.getFecha());
        wod.setCoach(wodActualizado.getCoach());

        return wodRepository.save(wod);
    }

    // <-- Evita borrar WODs que ya tienen resultados registrados -->
    @Override
    public void delete(Long id) {
        Wod wod = wodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("WOD no encontrado"));

        // <-- Validación opcional: evitar borrar WODs con resultados -->
        if (wod.getResultados() != null && !wod.getResultados().isEmpty()) {
            throw new RuntimeException("No se puede eliminar un WOD con resultados registrados");
        }

        wodRepository.delete(wod);
    }
}
