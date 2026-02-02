package com.tfg.crossfit.service;

import com.tfg.crossfit.model.Ejercicio;

import java.util.List;
import java.util.Optional;

public interface EjercicioService {

    List<Ejercicio> findAll();

    Optional<Ejercicio> findById(Long id);

    Optional<Ejercicio> findByNombre(String nombre);

    List<Ejercicio> findByTipo(String tipo);

    Ejercicio save(Ejercicio ejercicio);

    Ejercicio update(Long id, Ejercicio ejercicioActualizado);

    void delete(Long id);
}
