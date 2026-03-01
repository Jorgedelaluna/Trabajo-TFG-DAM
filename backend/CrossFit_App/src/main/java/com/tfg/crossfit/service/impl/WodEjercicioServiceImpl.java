package com.tfg.crossfit.service.impl;

import com.tfg.crossfit.model.Ejercicio;
import com.tfg.crossfit.model.Wod;
import com.tfg.crossfit.model.WodEjercicio;
import com.tfg.crossfit.repository.EjercicioRepository;
import com.tfg.crossfit.repository.WodEjercicioRepository;
import com.tfg.crossfit.repository.WodRepository;
import com.tfg.crossfit.service.WodEjercicioService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WodEjercicioServiceImpl implements WodEjercicioService {

    private final WodEjercicioRepository wodEjercicioRepository;
    private final WodRepository wodRepository;
    private final EjercicioRepository ejercicioRepository;

    public WodEjercicioServiceImpl(WodEjercicioRepository wodEjercicioRepository,
                                   WodRepository wodRepository,
                                   EjercicioRepository ejercicioRepository) {
        this.wodEjercicioRepository = wodEjercicioRepository;
        this.wodRepository = wodRepository;
        this.ejercicioRepository = ejercicioRepository;
    }

    // <-- Devuelve todos los registros WodEjercicio -->
    @Override
    public List<WodEjercicio> findAll() {
        return wodEjercicioRepository.findAll();
    }

    // <-- Devuelve un WodEjercicio por su ID -->
    @Override
    public Optional<WodEjercicio> findById(Long id) {
        return wodEjercicioRepository.findById(id);
    }

    // <-- Devuelve todos los ejercicios asociados a un WOD -->
    @Override
    public List<WodEjercicio> findByWod(Long wodId) {
        Wod wod = wodRepository.findById(wodId)
                .orElseThrow(() -> new RuntimeException("WOD no encontrado"));

        return wodEjercicioRepository.findByWod(wod);
    }

    // <-- Añade un ejercicio a un WOD con repeticiones, peso y orden -->
    @Override
    public WodEjercicio addEjercicioToWod(Long wodId, Long ejercicioId, WodEjercicio datos) {
        Wod wod = wodRepository.findById(wodId)
                .orElseThrow(() -> new RuntimeException("WOD no encontrado"));

        Ejercicio ejercicio = ejercicioRepository.findById(ejercicioId)
                .orElseThrow(() -> new RuntimeException("Ejercicio no encontrado"));

        WodEjercicio nuevo = new WodEjercicio();
        nuevo.setWod(wod);
        nuevo.setEjercicio(ejercicio);
        nuevo.setRepeticiones(datos.getRepeticiones());
        nuevo.setPeso(datos.getPeso());
        nuevo.setOrden(datos.getOrden());

        return wodEjercicioRepository.save(nuevo);
    }

    // <-- Actualiza repeticiones, peso u orden de un ejercicio dentro del WOD -->
    @Override
    public WodEjercicio update(Long id, WodEjercicio datosActualizados) {
        WodEjercicio we = wodEjercicioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("WodEjercicio no encontrado"));

        we.setRepeticiones(datosActualizados.getRepeticiones());
        we.setPeso(datosActualizados.getPeso());
        we.setOrden(datosActualizados.getOrden());

        return wodEjercicioRepository.save(we);
    }

    // <-- Elimina la relación entre un WOD y un ejercicio -->
    @Override
    public void delete(Long id) {
        WodEjercicio we = wodEjercicioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("WodEjercicio no encontrado"));

        wodEjercicioRepository.delete(we);
    }
}
