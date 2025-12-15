package com.tfg.crossfit.service;

import com.tfg.crossfit.model.*;
import com.tfg.crossfit.repository.InscripcionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InscripcionService {

    private final InscripcionRepository inscripcionRepository;

    public InscripcionService(InscripcionRepository inscripcionRepository) {
        this.inscripcionRepository = inscripcionRepository;
    }

    public Inscripcion inscribir(Usuario usuario, Clase clase) {

        // Evitar doble inscripción
        inscripcionRepository.findByUsuarioAndClase(usuario, clase)
                .ifPresent(i -> {
                    throw new RuntimeException("El usuario ya está inscrito en esta clase");
                });

        Inscripcion inscripcion = new Inscripcion();
        inscripcion.setUsuario(usuario);
        inscripcion.setClase(clase);
        inscripcion.setEstado(EstadoInscripcion.INSCRITO);

        return inscripcionRepository.save(inscripcion);
    }

    public Inscripcion cancelarInscripcion(Long id) {
        Inscripcion inscripcion = inscripcionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inscripción no encontrada"));

        inscripcion.setEstado(EstadoInscripcion.CANCELADO);
        return inscripcionRepository.save(inscripcion);
    }

    public List<Inscripcion> listarPorUsuario(Usuario usuario) {
        return inscripcionRepository.findByUsuario(usuario);
    }

    public List<Inscripcion> listarPorClase(Clase clase) {
        return inscripcionRepository.findByClase(clase);
    }
}
