package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.PrUsuarioDTO;
import com.tfg.crossfit.model.Ejercicio;
import com.tfg.crossfit.model.PrUsuario;
import com.tfg.crossfit.model.Usuario;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-04T16:43:39+0200",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251118-1623, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class PrUsuarioMapperImpl implements PrUsuarioMapper {

    @Override
    public PrUsuarioDTO toDTO(PrUsuario entity) {
        if ( entity == null ) {
            return null;
        }

        PrUsuarioDTO prUsuarioDTO = new PrUsuarioDTO();

        prUsuarioDTO.setUsuarioId( entityUsuarioId( entity ) );
        prUsuarioDTO.setEjercicioId( entityEjercicioId( entity ) );
        prUsuarioDTO.setFecha( entity.getFecha() );
        prUsuarioDTO.setId( entity.getId() );
        prUsuarioDTO.setValor( entity.getValor() );

        return prUsuarioDTO;
    }

    @Override
    public PrUsuario toEntity(PrUsuarioDTO dto) {
        if ( dto == null ) {
            return null;
        }

        PrUsuario prUsuario = new PrUsuario();

        prUsuario.setUsuario( mapUsuario( dto.getUsuarioId() ) );
        prUsuario.setEjercicio( mapEjercicio( dto.getEjercicioId() ) );
        prUsuario.setFecha( dto.getFecha() );
        prUsuario.setId( dto.getId() );
        prUsuario.setValor( dto.getValor() );

        return prUsuario;
    }

    private Long entityUsuarioId(PrUsuario prUsuario) {
        if ( prUsuario == null ) {
            return null;
        }
        Usuario usuario = prUsuario.getUsuario();
        if ( usuario == null ) {
            return null;
        }
        Long id = usuario.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Long entityEjercicioId(PrUsuario prUsuario) {
        if ( prUsuario == null ) {
            return null;
        }
        Ejercicio ejercicio = prUsuario.getEjercicio();
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
