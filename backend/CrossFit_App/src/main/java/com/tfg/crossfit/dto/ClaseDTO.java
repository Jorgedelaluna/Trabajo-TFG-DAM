package com.tfg.crossfit.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ClaseDTO {
	private Long id;
	private Long actividadId;
	private String actividadNombre;
	private String descripcion;
	private LocalDateTime fechaHora;
	private Integer aforoMaximo;	
	private Long coachId;
	private String coachNombre;
}