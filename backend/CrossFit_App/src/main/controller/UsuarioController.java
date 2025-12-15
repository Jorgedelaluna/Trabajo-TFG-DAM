package com.tfg.crossfit.controller;

import com.tfg.crossfit.model.Usuario;
import com.tfg.crossfit.model.EstadoCuota;
import com.tfg.crossfit.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // Registro
    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@RequestBody Usuario usuario) {
        if (usuarioService.buscarPorEmail(usuario.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("El email ya está registrado");
        }

        Usuario nuevo = usuarioService.registrarUsuario(usuario);
        return ResponseEntity.ok(nuevo);
    }

    // Login simple (sin JWT aún)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        return usuarioService.buscarPorEmail(email)
                .filter(u -> u.getPasswordHash().equals(password))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).body("Credenciales incorrectas"));
    }

    // Listar usuarios
    @GetMapping
    public ResponseEntity<?> listarUsuarios() {
        return ResponseEntity.ok(usuarioService.listarUsuarios());
    }

    // Cambiar estado de cuota
    @PutMapping("/{id}/cuota")
    public ResponseEntity<?> actualizarCuota(
            @PathVariable Long id,
            @RequestParam EstadoCuota estado
    ) {
        Usuario actualizado = usuarioService.actualizarEstadoCuota(id, estado);
        return ResponseEntity.ok(actualizado);
    }
}

