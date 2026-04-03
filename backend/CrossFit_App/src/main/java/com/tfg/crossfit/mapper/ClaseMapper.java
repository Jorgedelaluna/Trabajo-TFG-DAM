package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.ClaseDTO;
import com.tfg.crossfit.model.Clase;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ClaseMapper {

    @Mapping(source = "actividad.id", target = "actividadId")
    @Mapping(source = "actividad.nombre", target = "actividadNombre")
    @Mapping(source = "coach.id", target = "coachId")
    @Mapping(source = "coach.nombre", target = "coachNombre")
    ClaseDTO toDTO(Clase entity);

    @Mapping(target = "actividad", ignore = true)
    @Mapping(target = "coach", ignore = true)
    @Mapping(target = "inscripciones", ignore = true)
    Clase toEntity(ClaseDTO dto);
}	