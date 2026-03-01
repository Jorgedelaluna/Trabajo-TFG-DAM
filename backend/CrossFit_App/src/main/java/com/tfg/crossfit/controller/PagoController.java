package com.tfg.crossfit.controller;

import com.tfg.crossfit.dto.PagoCrearDTO;
import com.tfg.crossfit.model.Pago;
import com.tfg.crossfit.dto.PagoDTO;
import com.tfg.crossfit.mapper.PagoMapper;
import com.tfg.crossfit.model.Usuario;
import com.tfg.crossfit.service.PagoService;
import com.tfg.crossfit.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pagos")
public class PagoController {

    private final PagoService pagoService;
    private final UsuarioService usuarioService;
    private final PagoMapper pagoMapper;

    public PagoController(PagoService pagoService, UsuarioService usuarioService, PagoMapper pagoMapper) {
        this.pagoService = pagoService;
        this.usuarioService = usuarioService;
        this.pagoMapper = pagoMapper;
    }

    // Registrar pago
    @PostMapping
    public ResponseEntity<PagoDTO> registrarPago(@Valid @RequestBody PagoCrearDTO dto) {
        Usuario usuario = usuarioService.buscarPorId(dto.getUsuarioId());
        Pago pago = pagoMapper.toEntity(dto);
        Pago guardado = pagoService.registrarPago(pago, usuario);

        return ResponseEntity.ok(pagoMapper.toDTO(guardado));
    }

    // Listar pagos por usuario
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<PagoDTO>> listarPorUsuario(@PathVariable Long usuarioId) {
        Usuario usuario = usuarioService.buscarPorId(usuarioId);

        var pagos = pagoService.listarPagosPorUsuario(usuario)
                .stream()
                .map(pagoMapper::toDTO)
                .toList();

        return ResponseEntity.ok(pagos);
    }

    // Listar todos los pagos
    @GetMapping
    public ResponseEntity<List<PagoDTO>> listarTodos() {
        var pagos = pagoService.listarTodos()
                .stream()
                .map(pagoMapper::toDTO)
                .toList();

        return ResponseEntity.ok(pagos);
    }
}

