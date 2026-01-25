package com.tfg.crossfit.dto;

import com.tfg.crossfit.model.EstadoCuota;
import com.tfg.crossfit.model.Rol;
import lombok.Data;

@Data
public class UsuarioRespuestaDTO {
    private Long id;
    private String nombre;
    private String email;
    private Rol rol;
    private EstadoCuota estadoCuota;
}
