package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.ClaseDTO;
import com.tfg.crossfit.model.Clase;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-08T15:50:30+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class ClaseMapperImpl implements ClaseMapper {

    @Override
    public Clase toEntity(ClaseDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Clase clase = new Clase();

        clase.setId( dto.getId() );
        clase.setNombre( dto.getNombre() );
        clase.setDescripcion( dto.getDescripcion() );
        clase.setFechaHora( dto.getFechaHora() );
        clase.setAforoMaximo( dto.getAforoMaximo() );

        return clase;
    }

    @Override
    public ClaseDTO toDTO(Clase entity) {
        if ( entity == null ) {
            return null;
        }

        ClaseDTO claseDTO = new ClaseDTO();

        claseDTO.setId( entity.getId() );
        claseDTO.setNombre( entity.getNombre() );
        claseDTO.setDescripcion( entity.getDescripcion() );
        claseDTO.setFechaHora( entity.getFechaHora() );
        claseDTO.setAforoMaximo( entity.getAforoMaximo() );

        return claseDTO;
    }
}
