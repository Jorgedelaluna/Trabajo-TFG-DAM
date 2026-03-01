package com.tfg.crossfit.dto;

import lombok.Data;

@Data
public class ResultadoDTO {
    private Long id;
    private Long usuarioId;
    private Long wodId;
    private Integer repeticiones;
    private Double peso;
    private String tiempo;
    private String notas;
}
