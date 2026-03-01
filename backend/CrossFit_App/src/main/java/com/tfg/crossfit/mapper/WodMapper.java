package com.tfg.crossfit.mapper;

import com.tfg.crossfit.config.CentralConfig;
import com.tfg.crossfit.dto.WodDTO;
import com.tfg.crossfit.model.Coach;
import com.tfg.crossfit.model.Wod;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {WodEjercicioMapper.class}, config = CentralConfig.class)
public interface WodMapper {

    @Mapping(source = "coach.id", target = "coachId")
    @Mapping(source = "ejercicios", target = "ejercicios")
    WodDTO toDTO(Wod wod);

    @Mapping(source = "coachId", target = "coach")
    @Mapping(source = "ejercicios", target = "ejercicios")
    Wod toEntity(WodDTO dto);

    default Coach map(Long id) {
        if (id == null) return null;
        Coach c = new Coach();
        c.setId(id);
        return c;
    }
}
