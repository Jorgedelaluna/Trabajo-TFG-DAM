package com.tfg.crossfit.controller;

import com.tfg.crossfit.dto.ResultadoDTO;
import com.tfg.crossfit.mapper.ResultadoMapper;
import com.tfg.crossfit.model.Resultado;
import com.tfg.crossfit.service.ResultadoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/resultados")
public class ResultadoController {

    private final ResultadoService resultadoService;
    private final ResultadoMapper resultadoMapper;

    public ResultadoController(ResultadoService resultadoService, ResultadoMapper resultadoMapper) {
        this.resultadoService = resultadoService;
        this.resultadoMapper = resultadoMapper;
    }

    // <-- Devuelve todos los resultados -->
    @GetMapping
    public ResponseEntity<List<ResultadoDTO>> getAllResultados() {
        List<ResultadoDTO> lista = resultadoService.findAll()
                .stream()
                .map(resultadoMapper::toDTO)
                .toList();

        return ResponseEntity.ok(lista);
    }

    // <-- Devuelve un resultado por su ID -->
    @GetMapping("/{id}")
    public ResponseEntity<ResultadoDTO> getResultadoById(@PathVariable Long id) {
        return resultadoService.findById(id)
                .map(resultadoMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // <-- Devuelve todos los resultados de un usuario -->
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<ResultadoDTO>> getResultadosByUsuario(@PathVariable Long usuarioId) {
        List<ResultadoDTO> lista = resultadoService.findByUsuario(usuarioId)
                .stream()
                .map(resultadoMapper::toDTO)
                .toList();

        return ResponseEntity.ok(lista);
    }

    // <-- Devuelve todos los resultados de un WOD -->
    @GetMapping("/wod/{wodId}")
    public ResponseEntity<List<ResultadoDTO>> getResultadosByWod(@PathVariable Long wodId) {
        List<ResultadoDTO> lista = resultadoService.findByWod(wodId)
                .stream()
                .map(resultadoMapper::toDTO)
                .toList();

        return ResponseEntity.ok(lista);
    }

    // <-- Registra un resultado para un usuario en un WOD -->
    @PostMapping("/usuario/{usuarioId}/wod/{wodId}")
    public ResponseEntity<ResultadoDTO> createResultado(
            @PathVariable Long usuarioId,
            @PathVariable Long wodId,
            @RequestBody ResultadoDTO dto) {

        Resultado saved = resultadoService.save(usuarioId, wodId, resultadoMapper.toEntity(dto));
        return ResponseEntity.ok(resultadoMapper.toDTO(saved));
    }

    // <-- Actualiza un resultado existente -->
    @PutMapping("/{id}")
    public ResponseEntity<ResultadoDTO> updateResultado(
            @PathVariable Long id,
            @RequestBody ResultadoDTO dto) {

        try {
            Resultado updated = resultadoService.update(id, resultadoMapper.toEntity(dto));
            return ResponseEntity.ok(resultadoMapper.toDTO(updated));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // <-- Elimina un resultado -->
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResultado(@PathVariable Long id) {
        try {
            resultadoService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
