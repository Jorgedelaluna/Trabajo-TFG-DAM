package com.tfg.crossfit.controller;

import com.tfg.crossfit.dto.ClaseDTO;
import com.tfg.crossfit.service.ClaseService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/clases")
public class ClaseController {

    private final ClaseService claseService;

    public ClaseController(ClaseService claseService) {
        this.claseService = claseService;
    }

    // Crear clase
    @PostMapping
    public ResponseEntity<ClaseDTO> crearClase(@Valid @RequestBody ClaseDTO claseDTO) {
        ClaseDTO creada = claseService.crearClase(claseDTO);
        return ResponseEntity
                .created(URI.create("/clases/" + creada.getId()))
                .body(creada);
    }

    // Listar clases
    @GetMapping
    public ResponseEntity<List<ClaseDTO>> listarClases() {
        return ResponseEntity.ok(claseService.listarClases());
    }

    // Obtener clase por ID
    @GetMapping("/{id}")
    public ResponseEntity<ClaseDTO> obtenerClase(@PathVariable Long id) {
        return ResponseEntity.ok(claseService.obtenerClase(id));
    }

    // Eliminar clase
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarClase(@PathVariable Long id) {
        claseService.eliminarClase(id);
        return ResponseEntity.noContent().build();
    }
}
