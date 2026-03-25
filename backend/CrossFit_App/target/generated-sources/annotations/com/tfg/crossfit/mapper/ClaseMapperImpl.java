package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.ClaseDTO;
import com.tfg.crossfit.model.Clase;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-25T11:19:28+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251118-1623, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class ClaseMapperImpl implements ClaseMapper {

    @Override
    public Clase toEntity(ClaseDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Clase clase = new Clase();

        clase.setAforoMaximo( dto.getAforoMaximo() );
        clase.setDescripcion( dto.getDescripcion() );
        clase.setFechaHora( dto.getFechaHora() );
        clase.setId( dto.getId() );
        clase.setNombre( dto.getNombre() );

        return clase;
    }

    @Override
    public ClaseDTO toDTO(Clase entity) {
        if ( entity == null ) {
            return null;
        }

        ClaseDTO claseDTO = new ClaseDTO();

        claseDTO.setAforoMaximo( entity.getAforoMaximo() );
        claseDTO.setDescripcion( entity.getDescripcion() );
        claseDTO.setFechaHora( entity.getFechaHora() );
        claseDTO.setId( entity.getId() );
        claseDTO.setNombre( entity.getNombre() );

        return claseDTO;
    }
}
