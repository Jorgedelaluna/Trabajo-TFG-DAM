package com.tfg.crossfit.service;

import com.tfg.crossfit.model.WodEjercicio;

import java.util.List;
import java.util.Optional;

public interface WodEjercicioService {

    List<WodEjercicio> findAll();

    Optional<WodEjercicio> findById(Long id);

    List<WodEjercicio> findByWod(Long wodId);

    WodEjercicio addEjercicioToWod(Long wodId, Long ejercicioId, WodEjercicio datos);

    WodEjercicio update(Long id, WodEjercicio datosActualizados);

    void delete(Long id);
}
