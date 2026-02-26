package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.UsuarioRegistroDTO;
import com.tfg.crossfit.dto.UsuarioRespuestaDTO;
import com.tfg.crossfit.model.Usuario;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-22T18:29:52+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class UsuarioMapperImpl implements UsuarioMapper {

    @Override
    public Usuario toEntity(UsuarioRegistroDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Usuario usuario = new Usuario();

        usuario.setNombre( dto.getNombre() );
        usuario.setEmail( dto.getEmail() );

        return usuario;
    }

    @Override
    public UsuarioRespuestaDTO toDTO(Usuario usuario) {
        if ( usuario == null ) {
            return null;
        }

        UsuarioRespuestaDTO usuarioRespuestaDTO = new UsuarioRespuestaDTO();

        usuarioRespuestaDTO.setId( usuario.getId() );
        usuarioRespuestaDTO.setNombre( usuario.getNombre() );
        usuarioRespuestaDTO.setEmail( usuario.getEmail() );
        usuarioRespuestaDTO.setRol( usuario.getRol() );
        usuarioRespuestaDTO.setEstadoCuota( usuario.getEstadoCuota() );

        return usuarioRespuestaDTO;
    }
}
