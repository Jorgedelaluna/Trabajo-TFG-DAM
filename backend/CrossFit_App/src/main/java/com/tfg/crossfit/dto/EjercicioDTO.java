package com.tfg.crossfit.dto;

import lombok.Data;

@Data
public class EjercicioDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private String tipo;
}
