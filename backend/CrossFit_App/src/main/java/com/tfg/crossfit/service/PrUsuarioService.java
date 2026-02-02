package com.tfg.crossfit.service;

import com.tfg.crossfit.model.PrUsuario;

import java.util.List;
import java.util.Optional;

public interface PrUsuarioService {

    List<PrUsuario> findAll();

    Optional<PrUsuario> findById(Long id);

    List<PrUsuario> findByUsuario(Long usuarioId);

    List<PrUsuario> findByEjercicio(Long ejercicioId);

    Optional<PrUsuario> findPrMax(Long usuarioId, Long ejercicioId);

    PrUsuario save(Long usuarioId, Long ejercicioId, PrUsuario pr);

    PrUsuario update(Long id, PrUsuario prActualizado);

    void delete(Long id);
}
