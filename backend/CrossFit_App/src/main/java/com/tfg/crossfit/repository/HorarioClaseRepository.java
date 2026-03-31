package com.tfg.crossfit.repository;

import com.tfg.crossfit.model.HorarioClase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HorarioClaseRepository extends JpaRepository<HorarioClase, Long> {

    List<HorarioClase> findByDiaSemana(String diaSemana);

}
