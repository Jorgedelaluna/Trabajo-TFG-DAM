package com.tfg.crossfit.mapper;

import com.tfg.crossfit.config.CentralConfig;
import com.tfg.crossfit.dto.EjercicioDTO;
import com.tfg.crossfit.model.Ejercicio;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", config = CentralConfig.class)
public interface EjercicioMapper {
    EjercicioDTO toDTO(Ejercicio ejercicio);
    Ejercicio toEntity(EjercicioDTO dto);
}
