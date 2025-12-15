package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.UsuarioRespuestaDTO;
import com.tfg.crossfit.model.Usuario;

public class UsuarioMapper {

    public static UsuarioRespuestaDTO toDTO(Usuario usuario) {
        UsuarioRespuestaDTO dto = new UsuarioRespuestaDTO();
        dto.setId(usuario.getId());
        dto.setNombre(usuario.getNombre());
        dto.setEmail(usuario.getEmail());
        dto.setRol(usuario.getRol());
        dto.setEstadoCuota(usuario.getEstadoCuota());
        return dto;
    }
}
