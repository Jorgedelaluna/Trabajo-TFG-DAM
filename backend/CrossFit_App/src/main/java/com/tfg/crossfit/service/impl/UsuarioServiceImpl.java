package com.tfg.crossfit.service.impl;

import com.tfg.crossfit.dto.UsuarioDTO;
import com.tfg.crossfit.dto.UsuarioRegistroDTO;
import com.tfg.crossfit.mapper.UsuarioMapper;
import com.tfg.crossfit.model.EstadoCuota;
import com.tfg.crossfit.model.Usuario;
import com.tfg.crossfit.repository.UsuarioRepository;
import com.tfg.crossfit.service.UsuarioService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {

	private final UsuarioRepository usuarioRepository;
	private final UsuarioMapper usuarioMapper;
	private final PasswordEncoder passwordEncoder;

	public UsuarioServiceImpl(UsuarioRepository usuarioRepository, UsuarioMapper usuarioMapper,
			PasswordEncoder passwordEncoder) {
		this.usuarioRepository = usuarioRepository;
		this.usuarioMapper = usuarioMapper;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public Optional<Usuario> buscarPorEmailIgnoreCase(String email) {
		return usuarioRepository.findByEmailIgnoreCase(email);
	}

	@Override
	public Usuario registrarUsuario(UsuarioRegistroDTO dto) {
		Usuario usuario = new Usuario();
		usuario.setNombre(dto.getNombre());
		usuario.setEmail(dto.getEmail());
		usuario.setPasswordHash(passwordEncoder.encode(dto.getPassword()));

		return usuarioRepository.save(usuario);
	}

	@Override
	public boolean validarPassword(String rawPassword, String passwordHash) {
		return passwordEncoder.matches(rawPassword, passwordHash);
	}

	@Override
	public List<Usuario> listarUsuarios() {
		return usuarioRepository.findAll();
	}

	@Override
	public Optional<Usuario> buscarPorId(Long id) {
		return usuarioRepository.findById(id);
	}

	@Override
	public Optional<Usuario> actualizarUsuario(Long id, UsuarioDTO dto) {
		return usuarioRepository.findById(id).map(usuarioExistente -> {
			usuarioMapper.updateEntityFromDto(dto, usuarioExistente);
			return usuarioRepository.save(usuarioExistente);
		});
	}

	@Override
	public Usuario actualizarEstadoCuota(Long id, EstadoCuota estado) {
		Usuario usuario = usuarioRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

		usuario.setEstadoCuota(estado);
		return usuarioRepository.save(usuario);
	}

	@Override
	public boolean delete(Long id) {
		if (!usuarioRepository.existsById(id)) {
			return false;
		}

		usuarioRepository.deleteById(id);
		return true;
	}
}