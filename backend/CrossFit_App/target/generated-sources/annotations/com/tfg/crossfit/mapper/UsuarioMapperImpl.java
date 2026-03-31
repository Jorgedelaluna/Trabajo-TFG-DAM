package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.UsuarioRegistroDTO;
import com.tfg.crossfit.dto.UsuarioRespuestaDTO;
import com.tfg.crossfit.model.Usuario;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-31T23:07:50+0200",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251118-1623, environment: Java 21.0.8 (Eclipse Adoptium)"
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
        usuarioRespuestaDTO.setRol( usuario.getRol() );
        usuarioRespuestaDTO.setNombre( usuario.getNombre() );
        usuarioRespuestaDTO.setEmail( usuario.getEmail() );
        usuarioRespuestaDTO.setEstadoCuota( usuario.getEstadoCuota() );

        return usuarioRespuestaDTO;
    }
}
