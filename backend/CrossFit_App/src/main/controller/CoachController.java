package com.tfg.crossfit.controller;

import com.tfg.crossfit.dto.CoachDTO;
import com.tfg.crossfit.mapper.CoachMapper;
import com.tfg.crossfit.model.Coach;
import com.tfg.crossfit.service.CoachService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coaches")
public class CoachController {

    private final CoachService coachService;
    private final CoachMapper coachMapper;

    public CoachController(CoachService coachService, CoachMapper coachMapper) {
        this.coachService = coachService;
        this.coachMapper = coachMapper;
    }

    // <-- Devuelve todos los coaches -->
    @GetMapping
    public ResponseEntity<List<CoachDTO>> getAllCoaches() {
        List<CoachDTO> lista = coachService.findAll()
                .stream()
                .map(coachMapper::toDTO)
                .toList();

        return ResponseEntity.ok(lista);
    }

    // <-- Devuelve un coach por su ID -->
    @GetMapping("/{id}")
    public ResponseEntity<CoachDTO> getCoachById(@PathVariable Long id) {
        return coachService.findById(id)
                .map(coachMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // <-- Crea un nuevo coach -->
    @PostMapping
    public ResponseEntity<CoachDTO> createCoach(@RequestBody CoachDTO dto) {
        Coach coach = coachMapper.toEntity(dto);
        Coach saved = coachService.save(coach);
        return ResponseEntity.ok(coachMapper.toDTO(saved));
    }

    // <-- Actualiza un coach existente -->
    @PutMapping("/{id}")
    public ResponseEntity<CoachDTO> updateCoach(@PathVariable Long id, @RequestBody CoachDTO dto) {
        try {
            Coach updated = coachService.update(id, coachMapper.toEntity(dto));
            return ResponseEntity.ok(coachMapper.toDTO(updated));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // <-- Elimina un coach -->
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoach(@PathVariable Long id) {
        try {
            coachService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
