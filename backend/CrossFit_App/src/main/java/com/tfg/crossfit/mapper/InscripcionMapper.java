package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.InscripcionDTO;
import com.tfg.crossfit.model.Inscripcion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface InscripcionMapper {

    // Entidad → DTO
    @Mapping(source = "usuario.id", target = "usuarioId")
    @Mapping(source = "clase.id", target = "claseId")
    InscripcionDTO toDTO(Inscripcion entity);

    // DTO → Entidad (Solo si se necesita)
    @Mapping(source = "usuarioId", target = "usuario.id")
    @Mapping(source = "claseId", target = "clase.id")
    Inscripcion toEntity(InscripcionDTO dto);
}
