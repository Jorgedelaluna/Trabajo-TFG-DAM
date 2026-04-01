package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.ResultadoDTO;
import com.tfg.crossfit.model.Resultado;
import com.tfg.crossfit.model.Usuario;
import com.tfg.crossfit.model.Wod;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-01T11:09:43+0200",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251118-1623, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class ResultadoMapperImpl implements ResultadoMapper {

    @Override
    public ResultadoDTO toDTO(Resultado entity) {
        if ( entity == null ) {
            return null;
        }

        ResultadoDTO resultadoDTO = new ResultadoDTO();

        resultadoDTO.setUsuarioId( entityUsuarioId( entity ) );
        resultadoDTO.setWodId( entityWodId( entity ) );
        resultadoDTO.setId( entity.getId() );

        return resultadoDTO;
    }

    @Override
    public Resultado toEntity(ResultadoDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Resultado resultado = new Resultado();

        resultado.setUsuario( mapUsuario( dto.getUsuarioId() ) );
        resultado.setWod( mapWod( dto.getWodId() ) );
        resultado.setId( dto.getId() );

        return resultado;
    }

    private Long entityUsuarioId(Resultado resultado) {
        if ( resultado == null ) {
            return null;
        }
        Usuario usuario = resultado.getUsuario();
        if ( usuario == null ) {
            return null;
        }
        Long id = usuario.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Long entityWodId(Resultado resultado) {
        if ( resultado == null ) {
            return null;
        }
        Wod wod = resultado.getWod();
        if ( wod == null ) {
            return null;
        }
        Long id = wod.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
