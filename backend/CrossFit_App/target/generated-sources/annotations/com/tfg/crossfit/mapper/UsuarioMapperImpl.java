package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.UsuarioDTO;
import com.tfg.crossfit.model.Usuario;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-03T20:21:54+0200",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251118-1623, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class UsuarioMapperImpl implements UsuarioMapper {

    @Override
    public UsuarioDTO toDTO(Usuario usuario) {
        if ( usuario == null ) {
            return null;
        }

        UsuarioDTO usuarioDTO = new UsuarioDTO();

        usuarioDTO.setId( usuario.getId() );
        usuarioDTO.setNombre( usuario.getNombre() );
        usuarioDTO.setEmail( usuario.getEmail() );
        usuarioDTO.setRol( usuario.getRol() );
        usuarioDTO.setEstadoCuota( usuario.getEstadoCuota() );
        usuarioDTO.setFechaAlta( usuario.getFechaAlta() );

        return usuarioDTO;
    }

    @Override
    public Usuario toEntity(UsuarioDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Usuario usuario = new Usuario();

        usuario.setId( dto.getId() );
        usuario.setNombre( dto.getNombre() );
        usuario.setEmail( dto.getEmail() );
        usuario.setRol( dto.getRol() );
        usuario.setEstadoCuota( dto.getEstadoCuota() );
        usuario.setFechaAlta( dto.getFechaAlta() );

        return usuario;
    }

    @Override
    public void updateEntityFromDto(UsuarioDTO dto, Usuario usuario) {
        if ( dto == null ) {
            return;
        }

        usuario.setNombre( dto.getNombre() );
        usuario.setEmail( dto.getEmail() );
        usuario.setRol( dto.getRol() );
        usuario.setEstadoCuota( dto.getEstadoCuota() );
    }
}
