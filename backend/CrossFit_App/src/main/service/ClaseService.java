package com.tfg.crossfit.service;

import com.tfg.crossfit.model.Clase;
import com.tfg.crossfit.repository.ClaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClaseService {

    private final ClaseRepository claseRepository;

    public ClaseService(ClaseRepository claseRepository) {
        this.claseRepository = claseRepository;
    }

    public Clase crearClase(Clase clase) {
        return claseRepository.save(clase);
    }

    public List<Clase> listarClases() {
        return claseRepository.findAll();
    }

    public Clase obtenerClase(Long id) {
        return claseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Clase no encontrada"));
    }

    public void eliminarClase(Long id) {
        claseRepository.deleteById(id);
    }
}
