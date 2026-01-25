package com.tfg.crossfit.service.impl;

import com.tfg.crossfit.model.Resultado;
import com.tfg.crossfit.model.Usuario;
import com.tfg.crossfit.model.Wod;
import com.tfg.crossfit.repository.ResultadoRepository;
import com.tfg.crossfit.repository.UsuarioRepository;
import com.tfg.crossfit.repository.WodRepository;
import com.tfg.crossfit.service.ResultadoService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResultadoServiceImpl implements ResultadoService {

    private final ResultadoRepository resultadoRepository;
    private final UsuarioRepository usuarioRepository;
    private final WodRepository wodRepository;

    public ResultadoServiceImpl(ResultadoRepository resultadoRepository,
                                UsuarioRepository usuarioRepository,
                                WodRepository wodRepository) {
        this.resultadoRepository = resultadoRepository;
        this.usuarioRepository = usuarioRepository;
        this.wodRepository = wodRepository;
    }

    // <-- Devuelve todos los resultados -->
    @Override
    public List<Resultado> findAll() {
        return resultadoRepository.findAll();
    }

    // <-- Devuelve un resultado por su ID -->
    @Override
    public Optional<Resultado> findById(Long id) {
        return resultadoRepository.findById(id);
    }

    // <-- Devuelve todos los resultados de un usuario -->
    @Override
    public List<Resultado> findByUsuario(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return resultadoRepository.findByUsuario(usuario);
    }

    // <-- Devuelve todos los resultados de un WOD -->
    @Override
    public List<Resultado> findByWod(Long wodId) {
        Wod wod = wodRepository.findById(wodId)
                .orElseThrow(() -> new RuntimeException("WOD no encontrado"));

        return resultadoRepository.findByWod(wod);
    }

    // <-- Guarda un resultado evitando duplicados -->
    @Override
    public Resultado save(Long usuarioId, Long wodId, Resultado resultado) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Wod wod = wodRepository.findById(wodId)
                .orElseThrow(() -> new RuntimeException("WOD no encontrado"));

        // Validación: evitar duplicados
        resultadoRepository.findByUsuarioAndWod(usuario, wod)
                .ifPresent(r -> {
                    throw new RuntimeException("El usuario ya tiene un resultado registrado para este WOD");
                });

        resultado.setUsuario(usuario);
        resultado.setWod(wod);

        return resultadoRepository.save(resultado);
    }

    // <-- Actualiza tiempo, reps, peso, notas, etc. -->
    @Override
    public Resultado update(Long id, Resultado resultadoActualizado) {
        Resultado resultado = resultadoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resultado no encontrado"));

        resultado.setTiempo(resultadoActualizado.getTiempo());
        resultado.setRepeticiones(resultadoActualizado.getRepeticiones());
        resultado.setPeso(resultadoActualizado.getPeso());
        resultado.setNotas(resultadoActualizado.getNotas());

        return resultadoRepository.save(resultado);
    }

    // <-- Elimina un resultado -->
    @Override
    public void delete(Long id) {
        Resultado resultado = resultadoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resultado no encontrado"));

        resultadoRepository.delete(resultado);
    }
}
