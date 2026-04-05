package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.EjercicioDTO;
import com.tfg.crossfit.model.Ejercicio;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-04T16:43:39+0200",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251118-1623, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class EjercicioMapperImpl implements EjercicioMapper {

    @Override
    public EjercicioDTO toDTO(Ejercicio ejercicio) {
        if ( ejercicio == null ) {
            return null;
        }

        EjercicioDTO ejercicioDTO = new EjercicioDTO();

        ejercicioDTO.setDescripcion( ejercicio.getDescripcion() );
        ejercicioDTO.setId( ejercicio.getId() );
        ejercicioDTO.setNombre( ejercicio.getNombre() );
        ejercicioDTO.setTipo( ejercicio.getTipo() );

        return ejercicioDTO;
    }

    @Override
    public Ejercicio toEntity(EjercicioDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Ejercicio ejercicio = new Ejercicio();

        ejercicio.setDescripcion( dto.getDescripcion() );
        ejercicio.setId( dto.getId() );
        ejercicio.setNombre( dto.getNombre() );
        ejercicio.setTipo( dto.getTipo() );

        return ejercicio;
    }
}
