package com.tfg.crossfit.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class WodDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private LocalDate fecha;
    private Long coachId;
    private List<WodEjercicioDTO> ejercicios;
}
