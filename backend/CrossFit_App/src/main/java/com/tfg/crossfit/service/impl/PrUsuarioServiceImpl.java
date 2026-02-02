package com.tfg.crossfit.service.impl;

import com.tfg.crossfit.model.Ejercicio;
import com.tfg.crossfit.model.PrUsuario;
import com.tfg.crossfit.model.Usuario;
import com.tfg.crossfit.repository.EjercicioRepository;
import com.tfg.crossfit.repository.PrUsuarioRepository;
import com.tfg.crossfit.repository.UsuarioRepository;
import com.tfg.crossfit.service.PrUsuarioService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrUsuarioServiceImpl implements PrUsuarioService {

    private final PrUsuarioRepository prUsuarioRepository;
    private final UsuarioRepository usuarioRepository;
    private final EjercicioRepository ejercicioRepository;

    public PrUsuarioServiceImpl(PrUsuarioRepository prUsuarioRepository,
                                UsuarioRepository usuarioRepository,
                                EjercicioRepository ejercicioRepository) {
        this.prUsuarioRepository = prUsuarioRepository;
        this.usuarioRepository = usuarioRepository;
        this.ejercicioRepository = ejercicioRepository;
    }

    // <-- Devuelve todos los PRs -->
    @Override
    public List<PrUsuario> findAll() {
        return prUsuarioRepository.findAll();
    }

    // <-- Devuelve un PR por su ID -->
    @Override
    public Optional<PrUsuario> findById(Long id) {
        return prUsuarioRepository.findById(id);
    }

    // <-- Devuelve todos los PRs de un usuario -->
    @Override
    public List<PrUsuario> findByUsuario(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return prUsuarioRepository.findByUsuario(usuario);
    }

    // <-- Devuelve todos los PRs de un ejercicio -->
    @Override
    public List<PrUsuario> findByEjercicio(Long ejercicioId) {
        Ejercicio ejercicio = ejercicioRepository.findById(ejercicioId)
                .orElseThrow(() -> new RuntimeException("Ejercicio no encontrado"));

        return prUsuarioRepository.findByEjercicio(ejercicio);
    }

    // <-- Devuelve el PR más alto de un usuario en un ejercicio -->
    @Override
    public Optional<PrUsuario> findPrMax(Long usuarioId, Long ejercicioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Ejercicio ejercicio = ejercicioRepository.findById(ejercicioId)
                .orElseThrow(() -> new RuntimeException("Ejercicio no encontrado"));

        return prUsuarioRepository.findTopByUsuarioAndEjercicioOrderByValorDesc(usuario, ejercicio);
    }

    // <-- Guarda un nuevo PR -->
    @Override
    public PrUsuario save(Long usuarioId, Long ejercicioId, PrUsuario pr) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Ejercicio ejercicio = ejercicioRepository.findById(ejercicioId)
                .orElseThrow(() -> new RuntimeException("Ejercicio no encontrado"));

        pr.setUsuario(usuario);
        pr.setEjercicio(ejercicio);

        return prUsuarioRepository.save(pr);
    }

    // <-- Actualiza un PR existente -->
    @Override
    public PrUsuario update(Long id, PrUsuario prActualizado) {
        PrUsuario pr = prUsuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PR no encontrado"));

        pr.setValor(prActualizado.getValor());
        pr.setFecha(prActualizado.getFecha());

        return prUsuarioRepository.save(pr);
    }

    // <-- Elimina un PR -->
    @Override
    public void delete(Long id) {
        PrUsuario pr = prUsuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PR no encontrado"));

        prUsuarioRepository.delete(pr);
    }
}
