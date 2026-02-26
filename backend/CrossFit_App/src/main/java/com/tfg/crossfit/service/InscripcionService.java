package com.tfg.crossfit.service;

import com.tfg.crossfit.model.*;
import com.tfg.crossfit.repository.InscripcionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class InscripcionService {

    private final InscripcionRepository inscripcionRepository;
    private final EstadisticaService estadisticaService;

    public InscripcionService(InscripcionRepository inscripcionRepository,
                              EstadisticaService estadisticaService) {
        this.inscripcionRepository = inscripcionRepository;
        this.estadisticaService = estadisticaService;
    }

    public Inscripcion inscribir(Usuario usuario, Clase clase) {

        // -- 1. Evitar doble inscripción
        if (inscripcionRepository.existsByUsuarioAndClase(usuario, clase)) {
            throw new IllegalStateException("El usuario ya está inscrito en esta clase");
        }

        // -- 2. Validar aforo
        long inscritos = inscripcionRepository.countByClase(clase);
        if (inscritos >= clase.getAforoMaximo()) {
            throw new IllegalStateException("La clase está completa");
        }

        // -- 3. Validar fecha de la clase
        if (clase.getFechaHora().isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("No se puede inscribir en una clase pasada");
        }

        // -- 4. Crear inscripción
        Inscripcion inscripcion = new Inscripcion();
        inscripcion.setUsuario(usuario);
        inscripcion.setClase(clase);
        inscripcion.setEstado(EstadoInscripcion.INSCRITO);
        inscripcion.setFechaInscripcion(LocalDateTime.now());

        // -- 5. Actualizar estadísticas
        estadisticaService.incrementarReservas(usuario);

        return inscripcionRepository.save(inscripcion);
    }

    public Inscripcion cancelarInscripcion(Long id) {
        Inscripcion inscripcion = inscripcionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Inscripción no encontrada"));

        if (inscripcion.getEstado() == EstadoInscripcion.CANCELADO) {
            throw new IllegalStateException("La inscripción ya está cancelada");
        }

        inscripcion.setEstado(EstadoInscripcion.CANCELADO);

        // -- Actualizar estadísticas
        estadisticaService.incrementarCancelaciones(inscripcion.getUsuario());

        return inscripcionRepository.save(inscripcion);
    }

    public List<Inscripcion> listarPorUsuario(Usuario usuario) {
        return inscripcionRepository.findByUsuario(usuario);
    }

    public List<Inscripcion> listarPorClase(Clase clase) {
        return inscripcionRepository.findByClase(clase);
    }
}
