package com.tfg.crossfit.service;

import com.tfg.crossfit.dto.UsuarioRegistroDTO;
import com.tfg.crossfit.mapper.UsuarioMapper;
import com.tfg.crossfit.model.EstadoCuota;
import com.tfg.crossfit.model.Usuario;
import com.tfg.crossfit.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final UsuarioMapper usuarioMapper;

    public UsuarioService(UsuarioRepository usuarioRepository,
                          PasswordEncoder passwordEncoder,
                          UsuarioMapper usuarioMapper) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.usuarioMapper = usuarioMapper;
    }

    // <-- Registro de usuario -->
    public Usuario registrarUsuario(UsuarioRegistroDTO dto) {

        // <-- Convertir DTO → entidad -->
        Usuario usuario = usuarioMapper.toEntity(dto);

        // <-- Encriptar contraseña -->
        usuario.setPasswordHash(passwordEncoder.encode(dto.getPassword()));

        // <-- Estado de cuota por defecto -->
        usuario.setEstadoCuota(EstadoCuota.INACTIVA);

        return usuarioRepository.save(usuario);
    }

    // <-- Validar contraseña -->
    public boolean validarPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    // <-- Buscar por email -->
    public Optional<Usuario> buscarPorEmailIgnoreCase(String email) {
        return usuarioRepository.findByEmailIgnoreCase(email);
    }

    // <-- Listar todos -->
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    // <-- Actualizar estado de cuota -->
    public Usuario actualizarEstadoCuota(Long id, EstadoCuota estado) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        usuario.setEstadoCuota(estado);
        return usuarioRepository.save(usuario);
    }

    // <-- Buscar por ID (muy útil para otros servicios) -->
    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));
    }
}

