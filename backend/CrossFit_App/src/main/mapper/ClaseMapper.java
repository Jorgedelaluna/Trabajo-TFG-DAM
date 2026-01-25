package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.ClaseDTO;
import com.tfg.crossfit.model.Clase;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ClaseMapper {

    ClaseMapper INSTANCE = Mappers.getMapper(ClaseMapper.class);

    Clase toEntity(ClaseDTO dto);

    ClaseDTO toDTO(Clase entity);
}
