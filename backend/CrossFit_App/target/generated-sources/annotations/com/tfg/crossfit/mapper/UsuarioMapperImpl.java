package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.UsuarioDTO;
import com.tfg.crossfit.model.Usuario;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-04T16:43:38+0200",
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

        usuarioDTO.setEmail( usuario.getEmail() );
        usuarioDTO.setEstadoCuota( usuario.getEstadoCuota() );
        usuarioDTO.setFechaAlta( usuario.getFechaAlta() );
        usuarioDTO.setId( usuario.getId() );
        usuarioDTO.setNombre( usuario.getNombre() );
        usuarioDTO.setRol( usuario.getRol() );
        usuarioDTO.setSexo( usuario.getSexo() );
        usuarioDTO.setTelefono( usuario.getTelefono() );

        return usuarioDTO;
    }

    @Override
    public Usuario toEntity(UsuarioDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Usuario usuario = new Usuario();

        usuario.setEmail( dto.getEmail() );
        usuario.setId( dto.getId() );
        usuario.setNombre( dto.getNombre() );
        usuario.setSexo( dto.getSexo() );
        usuario.setTelefono( dto.getTelefono() );

        return usuario;
    }

    @Override
    public void updateEntityFromDto(UsuarioDTO dto, Usuario usuario) {
        if ( dto == null ) {
            return;
        }

        usuario.setEmail( dto.getEmail() );
        usuario.setNombre( dto.getNombre() );
        usuario.setSexo( dto.getSexo() );
        usuario.setTelefono( dto.getTelefono() );
    }
}
