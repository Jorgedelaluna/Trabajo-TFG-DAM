package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.ClaseDTO;
import com.tfg.crossfit.model.Clase;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ClaseMapper {

	ClaseMapper INSTANCE = Mappers.getMapper(ClaseMapper.class);

	@Mapping(source = "actividad.nombre", target = "actividadNombre")
	@Mapping(source = "coach.nombre", target = "coachNombre")
	ClaseDTO toDTO(Clase entity);

	@Mapping(target = "actividad", ignore = true)
	@Mapping(target = "coach", ignore = true)
	Clase toEntity(ClaseDTO dto);

}
