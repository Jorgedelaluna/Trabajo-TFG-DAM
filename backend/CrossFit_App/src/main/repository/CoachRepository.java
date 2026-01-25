package com.tfg.crossfit.repository;

import com.tfg.crossfit.model.Coach;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CoachRepository extends JpaRepository<Coach, Long> {

    Optional<Coach> findByNombre(String nombre);
}
