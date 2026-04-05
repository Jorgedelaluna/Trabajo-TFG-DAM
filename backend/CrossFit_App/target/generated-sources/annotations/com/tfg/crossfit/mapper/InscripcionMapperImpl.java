package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.InscripcionDTO;
import com.tfg.crossfit.model.Actividad;
import com.tfg.crossfit.model.Clase;
import com.tfg.crossfit.model.Coach;
import com.tfg.crossfit.model.Inscripcion;
import com.tfg.crossfit.model.Usuario;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-04T16:43:39+0200",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251118-1623, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class InscripcionMapperImpl implements InscripcionMapper {

    @Override
    public InscripcionDTO toDTO(Inscripcion entity) {
        if ( entity == null ) {
            return null;
        }

        InscripcionDTO inscripcionDTO = new InscripcionDTO();

        inscripcionDTO.setUsuarioId( entityUsuarioId( entity ) );
        inscripcionDTO.setClaseId( entityClaseId( entity ) );
        inscripcionDTO.setClaseNombre( entityClaseActividadNombre( entity ) );
        inscripcionDTO.setCoachNombre( entityClaseCoachNombre( entity ) );
        inscripcionDTO.setFechaHora( entityClaseFechaHora( entity ) );
        inscripcionDTO.setEstado( entity.getEstado() );
        inscripcionDTO.setFechaInscripcion( entity.getFechaInscripcion() );
        inscripcionDTO.setId( entity.getId() );

        return inscripcionDTO;
    }

    @Override
    public Inscripcion toEntity(InscripcionDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Inscripcion inscripcion = new Inscripcion();

        inscripcion.setUsuario( inscripcionDTOToUsuario( dto ) );
        inscripcion.setClase( inscripcionDTOToClase( dto ) );
        inscripcion.setEstado( dto.getEstado() );
        inscripcion.setFechaInscripcion( dto.getFechaInscripcion() );
        inscripcion.setId( dto.getId() );

        return inscripcion;
    }

    private Long entityUsuarioId(Inscripcion inscripcion) {
        if ( inscripcion == null ) {
            return null;
        }
        Usuario usuario = inscripcion.getUsuario();
        if ( usuario == null ) {
            return null;
        }
        Long id = usuario.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Long entityClaseId(Inscripcion inscripcion) {
        if ( inscripcion == null ) {
            return null;
        }
        Clase clase = inscripcion.getClase();
        if ( clase == null ) {
            return null;
        }
        Long id = clase.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String entityClaseActividadNombre(Inscripcion inscripcion) {
        if ( inscripcion == null ) {
            return null;
        }
        Clase clase = inscripcion.getClase();
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

    private String entityClaseCoachNombre(Inscripcion inscripcion) {
        if ( inscripcion == null ) {
            return null;
        }
        Clase clase = inscripcion.getClase();
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

    private LocalDateTime entityClaseFechaHora(Inscripcion inscripcion) {
        if ( inscripcion == null ) {
            return null;
        }
        Clase clase = inscripcion.getClase();
        if ( clase == null ) {
            return null;
        }
        LocalDateTime fechaHora = clase.getFechaHora();
        if ( fechaHora == null ) {
            return null;
        }
        return fechaHora;
    }

    protected Usuario inscripcionDTOToUsuario(InscripcionDTO inscripcionDTO) {
        if ( inscripcionDTO == null ) {
            return null;
        }

        Usuario usuario = new Usuario();

        usuario.setId( inscripcionDTO.getUsuarioId() );

        return usuario;
    }

    protected Clase inscripcionDTOToClase(InscripcionDTO inscripcionDTO) {
        if ( inscripcionDTO == null ) {
            return null;
        }

        Clase clase = new Clase();

        clase.setId( inscripcionDTO.getClaseId() );

        return clase;
    }
}
