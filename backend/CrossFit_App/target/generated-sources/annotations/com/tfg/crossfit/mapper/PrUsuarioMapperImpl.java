package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.PrUsuarioDTO;
import com.tfg.crossfit.model.Ejercicio;
import com.tfg.crossfit.model.PrUsuario;
import com.tfg.crossfit.model.Usuario;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-02T00:19:39+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
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
        prUsuarioDTO.setId( entity.getId() );
        prUsuarioDTO.setValor( entity.getValor() );
        prUsuarioDTO.setFecha( entity.getFecha() );

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
        prUsuario.setId( dto.getId() );
        prUsuario.setValor( dto.getValor() );
        prUsuario.setFecha( dto.getFecha() );

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
