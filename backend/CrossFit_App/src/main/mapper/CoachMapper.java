package com.tfg.crossfit.mapper;

import com.tfg.crossfit.config.CentralConfig;
import com.tfg.crossfit.dto.CoachDTO;
import com.tfg.crossfit.model.Coach;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", config = CentralConfig.class)
public interface CoachMapper {
    CoachDTO toDTO(Coach coach);
    Coach toEntity(CoachDTO dto);
}
