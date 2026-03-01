package com.tfg.crossfit.mapper;

import com.tfg.crossfit.config.CentralConfig;
import com.tfg.crossfit.dto.PrUsuarioDTO;
import com.tfg.crossfit.model.Ejercicio;
import com.tfg.crossfit.model.PrUsuario;
import com.tfg.crossfit.model.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", config = CentralConfig.class)
public interface PrUsuarioMapper {

    @Mapping(source = "usuario.id", target = "usuarioId")
    @Mapping(source = "ejercicio.id", target = "ejercicioId")
    PrUsuarioDTO toDTO(PrUsuario entity);

    @Mapping(source = "usuarioId", target = "usuario")
    @Mapping(source = "ejercicioId", target = "ejercicio")
    PrUsuario toEntity(PrUsuarioDTO dto);

    // <-- Construye Usuario solo con ID -->
    default Usuario mapUsuario(Long id) {
        if (id == null) return null;
        Usuario u = new Usuario();
        u.setId(id);
        return u;
    }

    // <-- Construye Ejercicio solo con ID -->
    default Ejercicio mapEjercicio(Long id) {
        if (id == null) return null;
        Ejercicio e = new Ejercicio();
        e.setId(id);
        return e;
    }
}
