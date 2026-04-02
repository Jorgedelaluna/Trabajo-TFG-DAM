package com.tfg.crossfit.mapper;

import com.tfg.crossfit.config.CentralConfig;
import com.tfg.crossfit.dto.ActividadDTO;
import com.tfg.crossfit.model.Actividad;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", config = CentralConfig.class)
public interface ActividadMapper {
	ActividadDTO toDTO(Actividad actividad);
	Actividad toEntity(ActividadDTO dto);
}
