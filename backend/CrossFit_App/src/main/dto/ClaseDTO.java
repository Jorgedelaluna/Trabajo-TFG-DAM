package com.tfg.crossfit.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ClaseDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private LocalDateTime fechaHora;
    private Integer aforoMaximo;
}
