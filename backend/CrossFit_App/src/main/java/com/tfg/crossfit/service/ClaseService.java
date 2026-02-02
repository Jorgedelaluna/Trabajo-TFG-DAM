package com.tfg.crossfit.service;

import com.tfg.crossfit.dto.ClaseDTO;
import com.tfg.crossfit.mapper.ClaseMapper;
import com.tfg.crossfit.model.Clase;
import com.tfg.crossfit.repository.ClaseRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClaseService {

    private final ClaseRepository claseRepository;
    private final ClaseMapper claseMapper;
    public ClaseService(ClaseRepository claseRepository, ClaseMapper claseMapper) {
        this.claseRepository = claseRepository;
        this.claseMapper = claseMapper; }

    public ClaseDTO crearClase(ClaseDTO claseDTO) {
        Clase clase = claseMapper.toEntity(claseDTO);
        Clase guardada = claseRepository.save(clase);
        return claseMapper.toDTO(guardada);
    }

    public List<ClaseDTO> listarClases() {
        return claseRepository.findAll()
                .stream()
                .map(claseMapper::toDTO)
                .toList(); }

    public ClaseDTO obtenerClase(Long id) {
        Clase clase = claseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Clase no encontrada"));
        return claseMapper.toDTO(clase);
    }

    public void eliminarClase(Long id) {
        if (!claseRepository.existsById(id)) {
            throw new EntityNotFoundException("Clase no encontrada");
        }
        claseRepository.deleteById(id); }

    // Para otros servicios
    public Clase obtenerEntidad(Long id) {
        return claseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Clase no encontrada"));
    }
}
