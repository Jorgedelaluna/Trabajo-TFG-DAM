package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.WodEjercicioDTO;
import com.tfg.crossfit.model.Ejercicio;
import com.tfg.crossfit.model.WodEjercicio;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-28T13:45:26+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class WodEjercicioMapperImpl implements WodEjercicioMapper {

    @Override
    public WodEjercicioDTO toDTO(WodEjercicio entity) {
        if ( entity == null ) {
            return null;
        }

        WodEjercicioDTO wodEjercicioDTO = new WodEjercicioDTO();

        wodEjercicioDTO.setEjercicioId( entityEjercicioId( entity ) );
        wodEjercicioDTO.setId( entity.getId() );
        wodEjercicioDTO.setRepeticiones( entity.getRepeticiones() );
        wodEjercicioDTO.setPeso( entity.getPeso() );
        wodEjercicioDTO.setOrden( entity.getOrden() );

        return wodEjercicioDTO;
    }

    @Override
    public WodEjercicio toEntity(WodEjercicioDTO dto) {
        if ( dto == null ) {
            return null;
        }

        WodEjercicio wodEjercicio = new WodEjercicio();

        wodEjercicio.setEjercicio( map( dto.getEjercicioId() ) );
        wodEjercicio.setId( dto.getId() );
        wodEjercicio.setRepeticiones( dto.getRepeticiones() );
        wodEjercicio.setPeso( dto.getPeso() );
        wodEjercicio.setOrden( dto.getOrden() );

        return wodEjercicio;
    }

    private Long entityEjercicioId(WodEjercicio wodEjercicio) {
        if ( wodEjercicio == null ) {
            return null;
        }
        Ejercicio ejercicio = wodEjercicio.getEjercicio();
        if ( ejercicio == null ) {
            return null;
        }
        Long id = ejercicio.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
