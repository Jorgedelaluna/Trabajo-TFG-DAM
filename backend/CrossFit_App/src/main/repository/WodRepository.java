package com.tfg.crossfit.repository;

import com.tfg.crossfit.model.Wod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface WodRepository extends JpaRepository<Wod, Long> {

    List<Wod> findByFecha(LocalDate fecha);

    List<Wod> findByNombreContainingIgnoreCase(String nombre);
}
