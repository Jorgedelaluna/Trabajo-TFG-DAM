package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.WodEjercicioDTO;
import com.tfg.crossfit.model.Ejercicio;
import com.tfg.crossfit.model.WodEjercicio;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-24T22:23:07+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251118-1623, environment: Java 21.0.8 (Eclipse Adoptium)"
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
        wodEjercicioDTO.setOrden( entity.getOrden() );
        wodEjercicioDTO.setPeso( entity.getPeso() );
        wodEjercicioDTO.setRepeticiones( entity.getRepeticiones() );

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
        wodEjercicio.setOrden( dto.getOrden() );
        wodEjercicio.setPeso( dto.getPeso() );
        wodEjercicio.setRepeticiones( dto.getRepeticiones() );

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
