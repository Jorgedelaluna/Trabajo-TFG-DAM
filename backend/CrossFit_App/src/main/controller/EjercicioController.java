package com.tfg.crossfit.controller;

import com.tfg.crossfit.dto.EjercicioDTO;
import com.tfg.crossfit.mapper.EjercicioMapper;
import com.tfg.crossfit.model.Ejercicio;
import com.tfg.crossfit.service.EjercicioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ejercicios")
public class EjercicioController {

    private final EjercicioService ejercicioService;
    private final EjercicioMapper ejercicioMapper;

    public EjercicioController(EjercicioService ejercicioService, EjercicioMapper ejercicioMapper) {
        this.ejercicioService = ejercicioService;
        this.ejercicioMapper = ejercicioMapper;
    }

    // <-- Devuelve todos los ejercicios -->
    @GetMapping
    public ResponseEntity<List<EjercicioDTO>> getAllEjercicios() {
        List<EjercicioDTO> lista = ejercicioService.findAll()
                .stream()
                .map(ejercicioMapper::toDTO)
                .toList();

        return ResponseEntity.ok(lista);
    }

    // <-- Devuelve un ejercicio por ID o 404 si no existe -->
    @GetMapping("/{id}")
    public ResponseEntity<EjercicioDTO> getEjercicioById(@PathVariable Long id) {
        return ejercicioService.findById(id)
                .map(ejercicioMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // <-- Busca un ejercicio por nombre exacto -->
    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<EjercicioDTO> getEjercicioByNombre(@PathVariable String nombre) {
        return ejercicioService.findByNombre(nombre)
                .map(ejercicioMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // <-- Devuelve todos los ejercicios de un tipo -->
    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<EjercicioDTO>> getEjerciciosByTipo(@PathVariable String tipo) {
        List<EjercicioDTO> lista = ejercicioService.findByTipo(tipo)
                .stream()
                .map(ejercicioMapper::toDTO)
                .toList();

        return ResponseEntity.ok(lista);
    }

    // <-- Crea un ejercicio nuevo -->
    @PostMapping
    public ResponseEntity<EjercicioDTO> createEjercicio(@RequestBody EjercicioDTO dto) {
        Ejercicio saved = ejercicioService.save(ejercicioMapper.toEntity(dto));
        return ResponseEntity.ok(ejercicioMapper.toDTO(saved));
    }

    // <-- Actualiza un ejercicio existente -->
    @PutMapping("/{id}")
    public ResponseEntity<EjercicioDTO> updateEjercicio(@PathVariable Long id, @RequestBody EjercicioDTO dto) {
        try {
            Ejercicio updated = ejercicioService.update(id, ejercicioMapper.toEntity(dto));
            return ResponseEntity.ok(ejercicioMapper.toDTO(updated));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // <-- Elimina un ejercicio -->
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEjercicio(@PathVariable Long id) {
        try {
            ejercicioService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
