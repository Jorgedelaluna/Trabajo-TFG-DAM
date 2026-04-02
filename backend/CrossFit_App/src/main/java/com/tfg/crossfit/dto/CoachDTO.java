package com.tfg.crossfit.dto;

import lombok.Data;

@Data
public class CoachDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private String certificaciones;
    private String email;
}
