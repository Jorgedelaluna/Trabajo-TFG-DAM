package com.tfg.crossfit.service.impl;

import com.tfg.crossfit.dto.InscripcionDTO;
import com.tfg.crossfit.mapper.InscripcionMapper;
import com.tfg.crossfit.model.Clase;
import com.tfg.crossfit.model.EstadoInscripcion;
import com.tfg.crossfit.model.Inscripcion;
import com.tfg.crossfit.model.Usuario;
import com.tfg.crossfit.repository.InscripcionRepository;
import com.tfg.crossfit.service.ClaseService;
import com.tfg.crossfit.service.EstadisticaService;
import com.tfg.crossfit.service.InscripcionService;
import com.tfg.crossfit.service.UsuarioService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class InscripcionServiceImpl implements InscripcionService {

    private final InscripcionRepository inscripcionRepository;
    private final UsuarioService usuarioService;
    private final ClaseService claseService;
    private final EstadisticaService estadisticaService;
    private final InscripcionMapper inscripcionMapper;

    public InscripcionServiceImpl(InscripcionRepository inscripcionRepository,
                                  UsuarioService usuarioService,
                                  ClaseService claseService,
                                  EstadisticaService estadisticaService,
                                  InscripcionMapper inscripcionMapper) {
        this.inscripcionRepository = inscripcionRepository;
        this.usuarioService = usuarioService;
        this.claseService = claseService;
        this.estadisticaService = estadisticaService;
        this.inscripcionMapper = inscripcionMapper;
    }

    @Override
    public Inscripcion inscribir(Usuario usuario, Clase clase) {

        if (inscripcionRepository.existsByUsuarioAndClaseAndEstado(
                usuario, clase, EstadoInscripcion.INSCRITO)) {
            throw new IllegalStateException("El usuario ya está inscrito en esta clase");
        }

        long inscritos = inscripcionRepository.countByClase(clase);
        if (inscritos >= clase.getAforoMaximo()) {
            throw new IllegalStateException("La clase está completa");
        }

        if (clase.getFechaHora().isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("No se puede inscribir en una clase pasada");
        }

        Inscripcion inscripcion = new Inscripcion();
        inscripcion.setUsuario(usuario);
        inscripcion.setClase(clase);
        inscripcion.setEstado(EstadoInscripcion.INSCRITO);
        inscripcion.setFechaInscripcion(LocalDateTime.now());

        estadisticaService.incrementarReservas(usuario);

        return inscripcionRepository.save(inscripcion);
    }

    @Override
    public Inscripcion inscribirPorIds(Long usuarioId, Long claseId) {

        Usuario usuario = usuarioService.buscarPorId(usuarioId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        Clase clase = claseService.obtenerEntidad(claseId);

        return inscribir(usuario, clase);
    }

    @Override
    public Inscripcion cancelarInscripcion(Long id) {
        Inscripcion inscripcion = inscripcionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Inscripción no encontrada"));

        if (inscripcion.getEstado() == EstadoInscripcion.CANCELADO) {
            throw new IllegalStateException("La inscripción ya está cancelada");
        }

        inscripcion.setEstado(EstadoInscripcion.CANCELADO);

        estadisticaService.incrementarCancelaciones(inscripcion.getUsuario());

        return inscripcionRepository.save(inscripcion);
    }

    @Override
    public List<InscripcionDTO> listarPorUsuario(Usuario usuario) {
        return inscripcionRepository.findByUsuario(usuario)
                .stream()
                .map(inscripcionMapper::toDTO)
                .toList();
    }

    @Override
    public List<InscripcionDTO> listarPorClase(Clase clase) {
        return inscripcionRepository.findByClase(clase)
                .stream()
                .map(inscripcionMapper::toDTO)
                .toList();
    }
}