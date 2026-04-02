package com.tfg.crossfit.dto;

import lombok.Data;
import java.util.List;

import com.tfg.crossfit.model.Clase;

@Data
public class ActividadDTO {
	private Long id;
	private String Nombre;
	private String descripcion;
	private List<Clase> clases;
}
