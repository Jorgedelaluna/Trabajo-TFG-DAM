package com.tfg.crossfit.dto;

import com.tfg.crossfit.model.EstadoCuota;
import com.tfg.crossfit.model.Rol;
import com.tfg.crossfit.model.Sexo;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class UsuarioDTO {

	private Long id;

	@NotBlank
	private String nombre;

	@NotBlank
	@Email
	private String email;
	private EstadoCuota estadoCuota;
	private Rol rol;
	private LocalDateTime fechaAlta;

	// nuevos campos
	@Size(max = 20)
	private String telefono;

	private Sexo sexo;

}