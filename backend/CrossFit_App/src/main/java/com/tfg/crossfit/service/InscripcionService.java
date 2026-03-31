package com.tfg.crossfit.service;

import com.tfg.crossfit.dto.InscripcionDTO;
import com.tfg.crossfit.mapper.InscripcionMapper;
import com.tfg.crossfit.model.*;
import com.tfg.crossfit.repository.InscripcionRepository;
import com.tfg.crossfit.repository.UsuarioRepository;
import com.tfg.crossfit.repository.ClaseRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class InscripcionService {

    private final InscripcionRepository inscripcionRepository;
    private final UsuarioRepository usuarioRepository;
    private final ClaseRepository claseRepository;
    private final EstadisticaService estadisticaService;
    private final InscripcionMapper inscripcionMapper;

    public InscripcionService(InscripcionRepository inscripcionRepository,
                              UsuarioRepository usuarioRepository,
                              ClaseRepository claseRepository,
                              EstadisticaService estadisticaService,
                              InscripcionMapper inscripcionMapper) {
        this.inscripcionRepository = inscripcionRepository;
        this.usuarioRepository = usuarioRepository;
        this.claseRepository = claseRepository;
        this.estadisticaService = estadisticaService;
        this.inscripcionMapper = inscripcionMapper;
    }

    public Inscripcion inscribir(Usuario usuario, Clase clase) {

        // -- 1. Evitar doble inscripción
        if (inscripcionRepository.existsByUsuarioAndClaseAndEstado(usuario, clase, EstadoInscripcion.INSCRITO)) {
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

    public Inscripcion inscribirPorIds(Long usuarioId, Long claseId) {

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        Clase clase = claseRepository.findById(claseId)
                .orElseThrow(() -> new EntityNotFoundException("Clase no encontrada"));

        return inscribir(usuario, clase);
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

    public List<InscripcionDTO> listarPorUsuario(Usuario usuario) {
        return inscripcionRepository.findByUsuario(usuario)
                .stream()
                .map(inscripcionMapper::toDTO)
                .toList();
    }

    public List<InscripcionDTO> listarPorClase(Clase clase) {
        return inscripcionRepository.findByClase(clase)
                .stream()
                .map(inscripcionMapper::toDTO)
                .toList();
    }

}
