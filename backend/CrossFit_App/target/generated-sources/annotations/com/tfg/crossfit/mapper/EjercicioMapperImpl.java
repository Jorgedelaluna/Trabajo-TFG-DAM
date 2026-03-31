package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.EjercicioDTO;
import com.tfg.crossfit.model.Ejercicio;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-28T09:35:50+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class EjercicioMapperImpl implements EjercicioMapper {

    @Override
    public EjercicioDTO toDTO(Ejercicio ejercicio) {
        if ( ejercicio == null ) {
            return null;
        }

        EjercicioDTO ejercicioDTO = new EjercicioDTO();

        ejercicioDTO.setId( ejercicio.getId() );
        ejercicioDTO.setNombre( ejercicio.getNombre() );
        ejercicioDTO.setDescripcion( ejercicio.getDescripcion() );
        ejercicioDTO.setTipo( ejercicio.getTipo() );

        return ejercicioDTO;
    }

    @Override
    public Ejercicio toEntity(EjercicioDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Ejercicio ejercicio = new Ejercicio();

        ejercicio.setId( dto.getId() );
        ejercicio.setNombre( dto.getNombre() );
        ejercicio.setDescripcion( dto.getDescripcion() );
        ejercicio.setTipo( dto.getTipo() );

        return ejercicio;
    }
}
