package com.tfg.crossfit.mapper;

import com.tfg.crossfit.config.CentralConfig;
import com.tfg.crossfit.dto.WodEjercicioDTO;
import com.tfg.crossfit.model.Ejercicio;
import com.tfg.crossfit.model.WodEjercicio;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", config = CentralConfig.class)
public interface WodEjercicioMapper {

    @Mapping(source = "ejercicio.id", target = "ejercicioId")
    WodEjercicioDTO toDTO(WodEjercicio entity);

    @Mapping(source = "ejercicioId", target = "ejercicio")
    WodEjercicio toEntity(WodEjercicioDTO dto);

    // <-- Método auxiliar para construir Ejercicio con solo el ID -->
    default Ejercicio map(Long id) {
        if (id == null) return null;
        Ejercicio e = new Ejercicio();
        e.setId(id);
        return e;
    }
}
