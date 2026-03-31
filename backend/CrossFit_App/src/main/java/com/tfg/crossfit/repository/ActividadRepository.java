package com.tfg.crossfit.repository;

import com.tfg.crossfit.model.Actividad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ActividadRepository extends JpaRepository<Actividad, Long> {

    Optional<Actividad> findByNombreIgnoreCase(String nombre);

}
