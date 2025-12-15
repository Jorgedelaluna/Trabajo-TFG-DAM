package com.tfg.crossfit.dto;

import com.tfg.crossfit.model.TipoPago;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PagoDTO {
    private Long id;
    private Long usuarioId;
    private Double importe;
    private TipoPago tipo;
    private String metodo;
    private String notas;
    private LocalDateTime fechaPago;
}
