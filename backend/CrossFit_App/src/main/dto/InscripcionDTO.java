package com.tfg.crossfit.dto;

import com.tfg.crossfit.model.EstadoInscripcion;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class InscripcionDTO {
    private Long id;
    private Long usuarioId;
    private Long claseId;
    private EstadoInscripcion estado;
    private LocalDateTime fechaInscripcion;
}
