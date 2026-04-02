package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.ActividadDTO;
import com.tfg.crossfit.model.Actividad;
import com.tfg.crossfit.model.Clase;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-03T01:10:16+0200",
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

        actividadDTO.setId( actividad.getId() );
        actividadDTO.setNombre( actividad.getNombre() );
        actividadDTO.setDescripcion( actividad.getDescripcion() );
        List<Clase> list = actividad.getClases();
        if ( list != null ) {
            actividadDTO.setClases( new ArrayList<Clase>( list ) );
        }

        return actividadDTO;
    }

    @Override
    public Actividad toEntity(ActividadDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Actividad actividad = new Actividad();

        actividad.setId( dto.getId() );
        actividad.setNombre( dto.getNombre() );
        actividad.setDescripcion( dto.getDescripcion() );
        List<Clase> list = dto.getClases();
        if ( list != null ) {
            actividad.setClases( new ArrayList<Clase>( list ) );
        }

        return actividad;
    }
}
