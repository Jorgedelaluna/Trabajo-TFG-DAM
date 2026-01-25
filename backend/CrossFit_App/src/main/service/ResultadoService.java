package com.tfg.crossfit.service;

import com.tfg.crossfit.model.Resultado;

import java.util.List;
import java.util.Optional;

public interface ResultadoService {

    List<Resultado> findAll();

    Optional<Resultado> findById(Long id);

    List<Resultado> findByUsuario(Long usuarioId);

    List<Resultado> findByWod(Long wodId);

    Resultado save(Long usuarioId, Long wodId, Resultado resultado);

    Resultado update(Long id, Resultado resultadoActualizado);

    void delete(Long id);
}
