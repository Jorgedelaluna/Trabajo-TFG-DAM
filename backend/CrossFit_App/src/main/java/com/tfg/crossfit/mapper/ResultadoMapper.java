package com.tfg.crossfit.mapper;

import com.tfg.crossfit.config.CentralConfig;
import com.tfg.crossfit.dto.ResultadoDTO;
import com.tfg.crossfit.model.Resultado;
import com.tfg.crossfit.model.Usuario;
import com.tfg.crossfit.model.Wod;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", config = CentralConfig.class)
public interface ResultadoMapper {

    @Mapping(source = "usuario.id", target = "usuarioId")
    @Mapping(source = "wod.id", target = "wodId")
    ResultadoDTO toDTO(Resultado entity);

    @Mapping(source = "usuarioId", target = "usuario")
    @Mapping(source = "wodId", target = "wod")
    Resultado toEntity(ResultadoDTO dto);

    // <-- Construye Usuario solo con ID -->
    default Usuario mapUsuario(Long id) {
        if (id == null) return null;
        Usuario u = new Usuario();
        u.setId(id);
        return u;
    }

    // <-- Construye Wod solo con ID -->
    default Wod mapWod(Long id) {
        if (id == null) return null;
        Wod w = new Wod();
        w.setId(id);
        return w;
    }
}
