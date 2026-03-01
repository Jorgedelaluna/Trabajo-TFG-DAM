package com.tfg.crossfit.repository;

import com.tfg.crossfit.model.Estadistica;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EstadisticaRepository extends JpaRepository<Estadistica, Long> {

    Optional<Estadistica> findByUsuario_Id(Long usuarioId);
}
