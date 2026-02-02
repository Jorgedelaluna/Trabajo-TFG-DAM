package com.tfg.crossfit.repository;

import com.tfg.crossfit.model.Ejercicio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EjercicioRepository extends JpaRepository<Ejercicio, Long> {

    Optional<Ejercicio> findByNombre(String nombre);

    List<Ejercicio> findByTipo(String tipo);
}
