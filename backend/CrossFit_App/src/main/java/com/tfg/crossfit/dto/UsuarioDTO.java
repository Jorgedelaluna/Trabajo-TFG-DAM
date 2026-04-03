package com.tfg.crossfit.dto;

import com.tfg.crossfit.model.EstadoCuota;
import com.tfg.crossfit.model.Rol;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO {

	private Long id;
	private String nombre;
	private String email;
	private Rol rol;
	private EstadoCuota estadoCuota;
	private LocalDateTime fechaAlta;
}