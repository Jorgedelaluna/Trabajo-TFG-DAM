package com.tfg.crossfit.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class PrUsuarioDTO {
    private Long id;
    private Long usuarioId;
    private Long ejercicioId;
    private Double valor;
    private LocalDate fecha;
}
