package com.tfg.crossfit.repository;

import com.tfg.crossfit.model.WodEjercicio;
import com.tfg.crossfit.model.Wod;
import com.tfg.crossfit.model.Ejercicio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WodEjercicioRepository extends JpaRepository<WodEjercicio, Long> {

    List<WodEjercicio> findByWod(Wod wod);

    List<WodEjercicio> findByEjercicio(Ejercicio ejercicio);
}
