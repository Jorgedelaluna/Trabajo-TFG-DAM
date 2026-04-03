package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.ClaseDTO;
import com.tfg.crossfit.model.Actividad;
import com.tfg.crossfit.model.Clase;
import com.tfg.crossfit.model.Coach;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-03T14:18:33+0200",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251118-1623, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class ClaseMapperImpl implements ClaseMapper {

    @Override
    public ClaseDTO toDTO(Clase entity) {
        if ( entity == null ) {
            return null;
        }

        ClaseDTO claseDTO = new ClaseDTO();

        claseDTO.setActividadId( entityActividadId( entity ) );
        claseDTO.setActividadNombre( entityActividadNombre( entity ) );
        claseDTO.setCoachId( entityCoachId( entity ) );
        claseDTO.setCoachNombre( entityCoachNombre( entity ) );
        claseDTO.setAforoMaximo( entity.getAforoMaximo() );
        claseDTO.setDescripcion( entity.getDescripcion() );
        claseDTO.setFechaHora( entity.getFechaHora() );
        claseDTO.setId( entity.getId() );

        return claseDTO;
    }

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

        return clase;
    }

    private Long entityActividadId(Clase clase) {
        if ( clase == null ) {
            return null;
        }
        Actividad actividad = clase.getActividad();
        if ( actividad == null ) {
            return null;
        }
        Long id = actividad.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String entityActividadNombre(Clase clase) {
        if ( clase == null ) {
            return null;
        }
        Actividad actividad = clase.getActividad();
        if ( actividad == null ) {
            return null;
        }
        String nombre = actividad.getNombre();
        if ( nombre == null ) {
            return null;
        }
        return nombre;
    }

    private Long entityCoachId(Clase clase) {
        if ( clase == null ) {
            return null;
        }
        Coach coach = clase.getCoach();
        if ( coach == null ) {
            return null;
        }
        Long id = coach.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String entityCoachNombre(Clase clase) {
        if ( clase == null ) {
            return null;
        }
        Coach coach = clase.getCoach();
        if ( coach == null ) {
            return null;
        }
        String nombre = coach.getNombre();
        if ( nombre == null ) {
            return null;
        }
        return nombre;
    }
}
