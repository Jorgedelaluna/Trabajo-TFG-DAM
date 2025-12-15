package com.tfg.crossfit.controller;

import com.tfg.crossfit.model.Clase;
import com.tfg.crossfit.model.Inscripcion;
import com.tfg.crossfit.model.Usuario;
import com.tfg.crossfit.service.ClaseService;
import com.tfg.crossfit.service.InscripcionService;
import com.tfg.crossfit.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inscripciones")
public class InscripcionController {

    private final InscripcionService inscripcionService;
    private final UsuarioService usuarioService;
    private final ClaseService claseService;

    public InscripcionController(
            InscripcionService inscripcionService,
            UsuarioService usuarioService,
            ClaseService claseService
    ) {
        this.inscripcionService = inscripcionService;
        this.usuarioService = usuarioService;
        this.claseService = claseService;
    }

    // Inscribir usuario en clase
    @PostMapping
    public ResponseEntity<?> inscribir(
            @RequestParam Long usuarioId,
            @RequestParam Long claseId
    ) {
        Usuario usuario = usuarioService.buscarPorEmail(
                usuarioService.listarUsuarios().stream()
                        .filter(u -> u.getId().equals(usuarioId))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"))
                        .getEmail()
        ).orElseThrow();

        Clase clase = claseService.obtenerClase(claseId);

        Inscripcion inscripcion = inscripcionService.inscribir(usuario, clase);
        return ResponseEntity.ok(inscripcion);
    }

    // Cancelar inscripción
    @PutMapping("/{id}/cancelar")
    public ResponseEntity<?> cancelar(@PathVariable Long id) {
        return ResponseEntity.ok(inscripcionService.cancelarInscripcion(id));
    }

    // Listar inscripciones por usuario
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> listarPorUsuario(@PathVariable Long usuarioId) {
        Usuario usuario = usuarioService.listarUsuarios().stream()
                .filter(u -> u.getId().equals(usuarioId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return ResponseEntity.ok(inscripcionService.listarPorUsuario(usuario));
    }

    // Listar inscripciones por clase
    @GetMapping("/clase/{claseId}")
    public ResponseEntity<?> listarPorClase(@PathVariable Long claseId) {
        Clase clase = claseService.obtenerClase(claseId);
        return ResponseEntity.ok(inscripcionService.listarPorClase(clase));
    }
}
