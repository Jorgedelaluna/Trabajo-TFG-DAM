package com.tfg.crossfit.service;

import com.tfg.crossfit.model.Coach;

import java.util.List;
import java.util.Optional;

public interface CoachService {

    List<Coach> findAll();

    Optional<Coach> findById(Long id);

    Optional<Coach> findByNombre(String nombre);

    Coach save(Coach coach);

    Coach update(Long id, Coach coachActualizado);

    void delete(Long id);
}
