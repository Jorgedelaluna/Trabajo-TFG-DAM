package com.tfg.crossfit.controller;

import com.tfg.crossfit.dto.InscripcionCrearDTO;
import com.tfg.crossfit.dto.InscripcionDTO;
import com.tfg.crossfit.mapper.InscripcionMapper;
import com.tfg.crossfit.model.Clase;
import com.tfg.crossfit.model.Usuario;
import com.tfg.crossfit.service.ClaseService;
import com.tfg.crossfit.service.InscripcionService;
import com.tfg.crossfit.service.UsuarioService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inscripciones")
public class InscripcionController {

    private final InscripcionService inscripcionService;
    private final UsuarioService usuarioService;
    private final ClaseService claseService;
    private final InscripcionMapper inscripcionMapper;

    public InscripcionController(
            InscripcionService inscripcionService,
            UsuarioService usuarioService,
            ClaseService claseService,
            InscripcionMapper inscripcionMapper
    ) {
        this.inscripcionService = inscripcionService;
        this.usuarioService = usuarioService;
        this.claseService = claseService;
        this.inscripcionMapper = inscripcionMapper;
    }

    @PostMapping
    public ResponseEntity<InscripcionDTO> inscribir(@Valid @RequestBody InscripcionCrearDTO dto) {

        Usuario usuario = usuarioService.buscarPorId(dto.getUsuarioId())
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        Clase clase = claseService.obtenerEntidad(dto.getClaseId());

        var inscripcion = inscripcionService.inscribir(usuario, clase);
        var respuesta = inscripcionMapper.toDTO(inscripcion);

        return ResponseEntity.ok(respuesta);
    }

    @PutMapping("/{id}/cancelar")
    public ResponseEntity<InscripcionDTO> cancelar(@PathVariable Long id) {
        var inscripcion = inscripcionService.cancelarInscripcion(id);
        return ResponseEntity.ok(inscripcionMapper.toDTO(inscripcion));
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<InscripcionDTO>> listarPorUsuario(@PathVariable Long usuarioId) {
        Usuario usuario = usuarioService.buscarPorId(usuarioId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        return ResponseEntity.ok(inscripcionService.listarPorUsuario(usuario));
    }

    @GetMapping("/clase/{claseId}")
    public ResponseEntity<List<InscripcionDTO>> listarPorClase(@PathVariable Long claseId) {
        Clase clase = claseService.obtenerEntidad(claseId);

        return ResponseEntity.ok(inscripcionService.listarPorClase(clase));
    }
}