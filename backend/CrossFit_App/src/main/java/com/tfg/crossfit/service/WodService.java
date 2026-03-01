package com.tfg.crossfit.service;

import com.tfg.crossfit.model.Wod;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface WodService {

    List<Wod> findAll();

    Optional<Wod> findById(Long id);

    List<Wod> findByFecha(LocalDate fecha);

    List<Wod> findByNombre(String nombre);

    Wod save(Wod wod);

    Wod update(Long id, Wod wodActualizado);

    void delete(Long id);
}
