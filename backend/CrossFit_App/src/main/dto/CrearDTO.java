package com.tfg.crossfit.dto;

import com.tfg.crossfit.model.EstadoInscripcion;
import lombok.Data;

import java.time.LocalDateTime;

@Data public class InscripcionCrearDTO {
    private Long usuarioId;
    private Long claseId;
}