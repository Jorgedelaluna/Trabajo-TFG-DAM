package com.tfg.crossfit.service;

import com.tfg.crossfit.dto.UsuarioDTO;
import com.tfg.crossfit.dto.UsuarioRegistroDTO;
import com.tfg.crossfit.model.EstadoCuota;
import com.tfg.crossfit.model.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {

    Optional<Usuario> buscarPorEmailIgnoreCase(String email);

    Usuario registrarUsuario(UsuarioRegistroDTO dto);

    boolean validarPassword(String rawPassword, String passwordHash);

    List<Usuario> listarUsuarios();

    Optional<Usuario> buscarPorId(Long id);

    Optional<Usuario> actualizarUsuario(Long id, UsuarioDTO dto);

    Usuario actualizarEstadoCuota(Long id, EstadoCuota estado);

    boolean delete(Long id);
}