package com.tfg.crossfit.controller;

import com.tfg.crossfit.model.Clase;
import com.tfg.crossfit.service.ClaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clases")
public class ClaseController {

    private final ClaseService claseService;

    public ClaseController(ClaseService claseService) {
        this.claseService = claseService;
    }

    // Crear clase
    @PostMapping
    public ResponseEntity<?> crearClase(@RequestBody Clase clase) {
        return ResponseEntity.ok(claseService.crearClase(clase));
    }

    // Listar clases
    @GetMapping
    public ResponseEntity<?> listarClases() {
        return ResponseEntity.ok(claseService.listarClases());
    }

    // Obtener clase por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerClase(@PathVariable Long id) {
        return ResponseEntity.ok(claseService.obtenerClase(id));
    }

    // Eliminar clase
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarClase(@PathVariable Long id) {
        claseService.eliminarClase(id);
        return ResponseEntity.ok("Clase eliminada");
    }
}
