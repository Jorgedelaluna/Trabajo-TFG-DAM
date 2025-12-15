package com.tfg.crossfit.controller;

import com.tfg.crossfit.model.Pago;
import com.tfg.crossfit.model.Usuario;
import com.tfg.crossfit.service.PagoService;
import com.tfg.crossfit.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pagos")
public class PagoController {

    private final PagoService pagoService;
    private final UsuarioService usuarioService;

    public PagoController(PagoService pagoService, UsuarioService usuarioService) {
        this.pagoService = pagoService;
        this.usuarioService = usuarioService;
    }

    // Registrar pago
    @PostMapping
    public ResponseEntity<?> registrarPago(@RequestBody Pago pago) {
        return ResponseEntity.ok(pagoService.registrarPago(pago));
    }

    // Listar pagos por usuario
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> listarPorUsuario(@PathVariable Long usuarioId) {
        Usuario usuario = usuarioService.listarUsuarios().stream()
                .filter(u -> u.getId().equals(usuarioId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return ResponseEntity.ok(pagoService.listarPagosPorUsuario(usuario));
    }

    // Listar todos los pagos
    @GetMapping
    public ResponseEntity<?> listarTodos() {
        return ResponseEntity.ok(pagoService.listarTodos());
    }
}
