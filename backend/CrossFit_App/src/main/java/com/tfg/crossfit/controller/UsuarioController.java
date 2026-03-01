package com.tfg.crossfit.controller;

import com.tfg.crossfit.dto.UsuarioLoginDTO;
import com.tfg.crossfit.dto.UsuarioRegistroDTO;
import com.tfg.crossfit.dto.UsuarioRespuestaDTO;
import com.tfg.crossfit.mapper.UsuarioMapper;
import com.tfg.crossfit.model.EstadoCuota;
import com.tfg.crossfit.model.Usuario;
import com.tfg.crossfit.security.JwtUtil;
import com.tfg.crossfit.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<UsuarioRespuestaDTO> registrar(@Valid @RequestBody UsuarioRegistroDTO dto) {

        if (usuarioService.buscarPorEmail(dto.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        Usuario nuevo = usuarioService.registrarUsuario(dto);
        return ResponseEntity.ok(usuarioMapper.toDTO(nuevo));
    }

    // Login con JWT
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UsuarioLoginDTO loginDTO) {

        var usuarioOpt = usuarioService.buscarPorEmail(loginDTO.getEmail());

        if (usuarioOpt.isEmpty() ||
                !usuarioService.validarPassword(loginDTO.getPassword(), usuarioOpt.get().getPasswordHash())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
        }

        Usuario usuario = usuarioOpt.get();
        String token = jwtUtil.generarToken(usuario.getEmail());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "usuario", usuarioMapper.toDTO(usuario)
        ));
    }

    // Listar usuarios
    @GetMapping
    public ResponseEntity<List<UsuarioRespuestaDTO>> listarUsuarios() {
        List<UsuarioRespuestaDTO> usuarios = usuarioService.listarUsuarios()
                .stream()
                .map(usuarioMapper::toDTO)
                .toList();

        return ResponseEntity.ok(usuarios);
    }

    // Cambiar estado de cuota
    @PutMapping("/{id}/cuota")
    public ResponseEntity<UsuarioRespuestaDTO> actualizarCuota(
            @PathVariable Long id,
            @RequestParam EstadoCuota estado
    ) {
        Usuario actualizado = usuarioService.actualizarEstadoCuota(id, estado);
        return ResponseEntity.ok(usuarioMapper.toDTO(actualizado));
    }
}


