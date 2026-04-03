package com.tfg.crossfit.controller;

import com.tfg.crossfit.dto.UsuarioDTO;
import com.tfg.crossfit.dto.UsuarioLoginDTO;
import com.tfg.crossfit.dto.UsuarioRegistroDTO;
import com.tfg.crossfit.mapper.UsuarioMapper;
import com.tfg.crossfit.model.EstadoCuota;
import com.tfg.crossfit.model.Usuario;
import com.tfg.crossfit.security.CustomUserDetails;
import com.tfg.crossfit.security.JwtUtil;
import com.tfg.crossfit.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

	private final UsuarioService usuarioService;
	private final UsuarioMapper usuarioMapper;
	private final JwtUtil jwtUtil;

	public UsuarioController(UsuarioService usuarioService, UsuarioMapper usuarioMapper, JwtUtil jwtUtil) {
		this.usuarioService = usuarioService;
		this.usuarioMapper = usuarioMapper;
		this.jwtUtil = jwtUtil;
	}

	// Registro
	@PostMapping("/registro")
	public ResponseEntity<UsuarioDTO> registrar(@Valid @RequestBody UsuarioRegistroDTO dto) {

		if (usuarioService.buscarPorEmailIgnoreCase(dto.getEmail()).isPresent()) {
			return ResponseEntity.badRequest().build();
		}

		Usuario nuevo = usuarioService.registrarUsuario(dto);
		return ResponseEntity.ok(usuarioMapper.toDTO(nuevo));
	}

	// Login con JWT
	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody UsuarioLoginDTO loginDTO) {

		var usuarioOpt = usuarioService.buscarPorEmailIgnoreCase(loginDTO.getEmail());

		if (usuarioOpt.isEmpty()
				|| !usuarioService.validarPassword(loginDTO.getPassword(), usuarioOpt.get().getPasswordHash())) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
		}

		Usuario usuario = usuarioOpt.get();
		String token = jwtUtil.generarToken(usuario);

		return ResponseEntity.ok(Map.of("token", token, "usuario", usuarioMapper.toDTO(usuario)));
	}

	@GetMapping("/me")
	public ResponseEntity<UsuarioDTO> getPerfilUsuario(@AuthenticationPrincipal CustomUserDetails userDetails) {

		if (userDetails == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		String email = userDetails.getUsername();
		var usuarioOpt = usuarioService.buscarPorEmailIgnoreCase(email);

		if (usuarioOpt.isEmpty()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		Usuario usuario = usuarioOpt.get();
		return ResponseEntity.ok(usuarioMapper.toDTO(usuario));
	}

	// Listar usuarios
	@GetMapping
	public ResponseEntity<List<UsuarioDTO>> listarUsuarios() {
		List<UsuarioDTO> usuarios = usuarioService.listarUsuarios().stream().map(usuarioMapper::toDTO).toList();

		return ResponseEntity.ok(usuarios);
	}

	@GetMapping("/{id}")
	public ResponseEntity<UsuarioDTO> obtenerUsuarioPorId(@PathVariable Long id) {
		return usuarioService.buscarPorId(id).map(usuarioMapper::toDTO).map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@PutMapping("/{id}")
	public ResponseEntity<UsuarioDTO> actualizarUsuario(@PathVariable Long id, @RequestBody UsuarioDTO dto) {
		return usuarioService.actualizarUsuario(id, dto).map(usuarioMapper::toDTO).map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	// Cambiar estado de cuota
	@PutMapping("/{id}/cuota")
	public ResponseEntity<UsuarioDTO> actualizarCuota(@PathVariable Long id, @RequestParam EstadoCuota estado) {
		Usuario actualizado = usuarioService.actualizarEstadoCuota(id, estado);
		return ResponseEntity.ok(usuarioMapper.toDTO(actualizado));
	}
}
