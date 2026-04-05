package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.ActividadDTO;
import com.tfg.crossfit.model.Actividad;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-04T16:43:39+0200",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251118-1623, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class ActividadMapperImpl implements ActividadMapper {

    @Override
    public ActividadDTO toDTO(Actividad actividad) {
        if ( actividad == null ) {
            return null;
        }

        ActividadDTO actividadDTO = new ActividadDTO();

        actividadDTO.setDescripcion( actividad.getDescripcion() );
        actividadDTO.setId( actividad.getId() );
        actividadDTO.setNombre( actividad.getNombre() );

        return actividadDTO;
    }

    @Override
    public Actividad toEntity(ActividadDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Actividad actividad = new Actividad();

        actividad.setDescripcion( dto.getDescripcion() );
        actividad.setId( dto.getId() );
        actividad.setNombre( dto.getNombre() );

        return actividad;
    }

    @Override
    public void updateEntityFromDto(ActividadDTO dto, Actividad actividad) {
        if ( dto == null ) {
            return;
        }

        actividad.setDescripcion( dto.getDescripcion() );
        actividad.setNombre( dto.getNombre() );
    }
}
