package com.tfg.crossfit.controller;

import com.tfg.crossfit.model.Clase;
import com.tfg.crossfit.model.Inscripcion;
import com.tfg.crossfit.model.Usuario;
import com.tfg.crossfit.service.ClaseService;
import com.tfg.crossfit.service.InscripcionService;
import com.tfg.crossfit.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.tfg.crossfit.dto.InscripcionCrearDTO;
import com.tfg.crossfit.dto.InscripcionDTO;
import com.tfg.crossfit.mapper.InscripcionMapper;
import jakarta.validation.Valid;

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

    // Inscribir usuario en clase
    @PostMapping
    public ResponseEntity<InscripcionDTO> inscribir(@Valid @RequestBody InscripcionCrearDTO dto) {

        System.out.println(">>> DTO recibido:");
        System.out.println("usuarioId = " + dto.getUsuarioId());
        System.out.println("claseId   = " + dto.getClaseId());

        Usuario usuario = usuarioService.buscarPorId(dto.getUsuarioId());
        Clase clase = claseService.obtenerEntidad(dto.getClaseId());

        var inscripcion = inscripcionService.inscribir(usuario, clase);
        var respuesta = inscripcionMapper.toDTO(inscripcion);

        return ResponseEntity.ok(respuesta);
    }

    // Cancelar inscripción
    @PutMapping("/{id}/cancelar")
    public ResponseEntity<InscripcionDTO> cancelar(@PathVariable Long id) {
        var inscripcion = inscripcionService.cancelarInscripcion(id);

        return ResponseEntity.ok(inscripcionMapper.toDTO(inscripcion));
    }

    // Listar inscripciones por usuario
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<InscripcionDTO>> listarPorUsuario(@PathVariable Long usuarioId) {
        Usuario usuario = usuarioService.buscarPorId(usuarioId);

        return ResponseEntity.ok(inscripcionService.listarPorUsuario(usuario));
    }

    // Listar inscripciones por clase
    @GetMapping("/clase/{claseId}")
    public ResponseEntity<List<InscripcionDTO>> listarPorClase(@PathVariable Long claseId) {
        Clase clase = claseService.obtenerEntidad(claseId);

        return ResponseEntity.ok(inscripcionService.listarPorClase(clase));
    }
}