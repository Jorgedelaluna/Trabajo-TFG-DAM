package com.tfg.crossfit.mapper;

import com.tfg.crossfit.config.CentralConfig;
import com.tfg.crossfit.dto.UsuarioRegistroDTO;
import com.tfg.crossfit.dto.UsuarioRespuestaDTO;
import com.tfg.crossfit.model.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    // DTO de registro → entidad
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "passwordHash", ignore = true) // se asigna en el servicio
    @Mapping(target = "estadoCuota", ignore = true)  // se asigna por defecto
    Usuario toEntity(UsuarioRegistroDTO dto);

    // Entidad → DTO de respuesta
    @Mapping(target = "id", source = "id")
    @Mapping(target = "rol", source = "rol")
    UsuarioRespuestaDTO toDTO(Usuario usuario);

}

