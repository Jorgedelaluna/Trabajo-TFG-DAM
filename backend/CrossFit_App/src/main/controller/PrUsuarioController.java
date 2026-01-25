package com.tfg.crossfit.controller;

import com.tfg.crossfit.dto.PrUsuarioDTO;
import com.tfg.crossfit.mapper.PrUsuarioMapper;
import com.tfg.crossfit.model.PrUsuario;
import com.tfg.crossfit.service.PrUsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prs")
public class PrUsuarioController {

    private final PrUsuarioService prUsuarioService;
    private final PrUsuarioMapper prUsuarioMapper;

    public PrUsuarioController(PrUsuarioService prUsuarioService, PrUsuarioMapper prUsuarioMapper) {
        this.prUsuarioService = prUsuarioService;
        this.prUsuarioMapper = prUsuarioMapper;
    }

    // <-- Devuelve todos los PRs -->
    @GetMapping
    public ResponseEntity<List<PrUsuarioDTO>> getAllPrs() {
        List<PrUsuarioDTO> lista = prUsuarioService.findAll()
                .stream()
                .map(prUsuarioMapper::toDTO)
                .toList();

        return ResponseEntity.ok(lista);
    }

    // <-- Devuelve un PR por su ID -->
    @GetMapping("/{id}")
    public ResponseEntity<PrUsuarioDTO> getPrById(@PathVariable Long id) {
        return prUsuarioService.findById(id)
                .map(prUsuarioMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // <-- Devuelve todos los PRs de un usuario -->
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<PrUsuarioDTO>> getPrsByUsuario(@PathVariable Long usuarioId) {
        List<PrUsuarioDTO> lista = prUsuarioService.findByUsuario(usuarioId)
                .stream()
                .map(prUsuarioMapper::toDTO)
                .toList();

        return ResponseEntity.ok(lista);
    }

    // <-- Devuelve todos los PRs de un ejercicio -->
    @GetMapping("/ejercicio/{ejercicioId}")
    public ResponseEntity<List<PrUsuarioDTO>> getPrsByEjercicio(@PathVariable Long ejercicioId) {
        List<PrUsuarioDTO> lista = prUsuarioService.findByEjercicio(ejercicioId)
                .stream()
                .map(prUsuarioMapper::toDTO)
                .toList();

        return ResponseEntity.ok(lista);
    }

    // <-- Devuelve el PR más alto de un usuario en un ejercicio -->
    @GetMapping("/max/usuario/{usuarioId}/ejercicio/{ejercicioId}")
    public ResponseEntity<PrUsuarioDTO> getPrMax(
            @PathVariable Long usuarioId,
            @PathVariable Long ejercicioId) {

        return prUsuarioService.findPrMax(usuarioId, ejercicioId)
                .map(prUsuarioMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // <-- Registra un nuevo PR -->
    @PostMapping("/usuario/{usuarioId}/ejercicio/{ejercicioId}")
    public ResponseEntity<PrUsuarioDTO> createPr(
            @PathVariable Long usuarioId,
            @PathVariable Long ejercicioId,
            @RequestBody PrUsuarioDTO dto) {

        PrUsuario saved = prUsuarioService.save(usuarioId, ejercicioId, prUsuarioMapper.toEntity(dto));
        return ResponseEntity.ok(prUsuarioMapper.toDTO(saved));
    }

    // <-- Actualiza un PR existente -->
    @PutMapping("/{id}")
    public ResponseEntity<PrUsuarioDTO> updatePr(
            @PathVariable Long id,
            @RequestBody PrUsuarioDTO dto) {

        try {
            PrUsuario updated = prUsuarioService.update(id, prUsuarioMapper.toEntity(dto));
            return ResponseEntity.ok(prUsuarioMapper.toDTO(updated));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // <-- Elimina un PR -->
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePr(@PathVariable Long id) {
        try {
            prUsuarioService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
