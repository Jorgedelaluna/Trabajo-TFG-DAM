package com.tfg.crossfit.controller;

import com.tfg.crossfit.model.WodEjercicio;
import com.tfg.crossfit.service.WodEjercicioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wod-ejercicios")
public class WodEjercicioController {

    private final WodEjercicioService wodEjercicioService;

    public WodEjercicioController(WodEjercicioService wodEjercicioService) {
        this.wodEjercicioService = wodEjercicioService;
    }

    // <-- Lista todos los registros WodEjercicio -->
    @GetMapping
    public ResponseEntity<List<WodEjercicio>> getAll() {
        return ResponseEntity.ok(wodEjercicioService.findAll());
    }

    // <-- Devuelve todos los ejercicios asociados a un WOD -->
    @GetMapping("/wod/{wodId}")
    public ResponseEntity<List<WodEjercicio>> getByWod(@PathVariable Long wodId) {
        return ResponseEntity.ok(wodEjercicioService.findByWod(wodId));
    }

    // <-- Devuelve un WodEjercicio por ID -->
    @GetMapping("/{id}")
    public ResponseEntity<WodEjercicio> getById(@PathVariable Long id) {
        return wodEjercicioService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // <-- Añade un ejercicio a un Wod con repeticiones, peso, orden -->
    @PostMapping("/wod/{wodId}/ejercicio/{ejercicioId}")
    public ResponseEntity<WodEjercicio> addEjercicioToWod(
            @PathVariable Long wodId,
            @PathVariable Long ejercicioId,
            @RequestBody WodEjercicio datos) {

        WodEjercicio nuevo = wodEjercicioService.addEjercicioToWod(wodId, ejercicioId, datos);
        return ResponseEntity.ok(nuevo);
    }

    // <-- Actualiza repeticiones, peso u orden -->
    @PutMapping("/{id}")
    public ResponseEntity<WodEjercicio> update(
            @PathVariable Long id,
            @RequestBody WodEjercicio datosActualizados) {

        try {
            WodEjercicio actualizado = wodEjercicioService.update(id, datosActualizados);
            return ResponseEntity.ok(actualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // <-- Elimina la relación entre WOD y ejercicio -->
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            wodEjercicioService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
