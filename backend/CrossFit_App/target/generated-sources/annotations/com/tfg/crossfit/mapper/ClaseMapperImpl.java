package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.ClaseDTO;
import com.tfg.crossfit.model.Actividad;
import com.tfg.crossfit.model.Clase;
import com.tfg.crossfit.model.Coach;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-28T09:35:50+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class ClaseMapperImpl implements ClaseMapper {

    @Override
    public ClaseDTO toDTO(Clase entity) {
        if ( entity == null ) {
            return null;
        }

        ClaseDTO claseDTO = new ClaseDTO();

        claseDTO.setActividadNombre( entityActividadNombre( entity ) );
        claseDTO.setCoachNombre( entityCoachNombre( entity ) );
        claseDTO.setId( entity.getId() );
        claseDTO.setDescripcion( entity.getDescripcion() );
        claseDTO.setFechaHora( entity.getFechaHora() );
        claseDTO.setAforoMaximo( entity.getAforoMaximo() );

        return claseDTO;
    }

    @Override
    public Clase toEntity(ClaseDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Clase clase = new Clase();

        clase.setId( dto.getId() );
        clase.setDescripcion( dto.getDescripcion() );
        clase.setFechaHora( dto.getFechaHora() );
        clase.setAforoMaximo( dto.getAforoMaximo() );

        return clase;
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
