package com.tfg.crossfit.dto;

import lombok.Data;

@Data
public class WodEjercicioDTO {
    private Long id;
    private Long ejercicioId;
    private Integer repeticiones;
    private Double peso;
    private Integer orden;
}
