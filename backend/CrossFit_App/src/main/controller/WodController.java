package com.tfg.crossfit.controller;

import com.tfg.crossfit.dto.WodDTO;
import com.tfg.crossfit.mapper.WodMapper;
import com.tfg.crossfit.model.Wod;
import com.tfg.crossfit.service.WodService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/wods")
public class WodController {

    private final WodService wodService;
    private final WodMapper wodMapper;

    public WodController(WodService wodService, WodMapper wodMapper) {
        this.wodService = wodService;
        this.wodMapper = wodMapper;
    }

    // <-- Devuelve todos los WODs -->
    @GetMapping
    public ResponseEntity<List<WodDTO>> getAllWods() {
        List<WodDTO> lista = wodService.findAll()
                .stream()
                .map(wodMapper::toDTO)
                .toList();

        return ResponseEntity.ok(lista);
    }

    // <-- Devuelve un WOD por ID o 404 si no existe -->
    @GetMapping("/{id}")
    public ResponseEntity<WodDTO> getWodById(@PathVariable Long id) {
        return wodService.findById(id)
                .map(wodMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // <-- Busca WODs por fecha -->
    @GetMapping("/fecha/{fecha}")
    public ResponseEntity<List<WodDTO>> getWodsByFecha(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {

        List<WodDTO> lista = wodService.findByFecha(fecha)
                .stream()
                .map(wodMapper::toDTO)
                .toList();

        return ResponseEntity.ok(lista);
    }

    // <-- Búsqueda flexible por nombre -->
    @GetMapping("/buscar")
    public ResponseEntity<List<WodDTO>> searchWodsByNombre(@RequestParam String nombre) {
        List<WodDTO> lista = wodService.findByNombre(nombre)
                .stream()
                .map(wodMapper::toDTO)
                .toList();

        return ResponseEntity.ok(lista);
    }

    // <-- Crea un nuevo WOD -->
    @PostMapping
    public ResponseEntity<WodDTO> createWod(@RequestBody WodDTO dto) {
        Wod saved = wodService.save(wodMapper.toEntity(dto));
        return ResponseEntity.ok(wodMapper.toDTO(saved));
    }

    // <-- Actualiza un WOD existente -->
    @PutMapping("/{id}")
    public ResponseEntity<WodDTO> updateWod(@PathVariable Long id, @RequestBody WodDTO dto) {
        try {
            Wod updated = wodService.update(id, wodMapper.toEntity(dto));
            return ResponseEntity.ok(wodMapper.toDTO(updated));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // <-- Elimina un WOD (si no tiene resultados asociados) -->
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWod(@PathVariable Long id) {
        try {
            wodService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
