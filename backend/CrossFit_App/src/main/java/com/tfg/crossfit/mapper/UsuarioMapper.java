package com.tfg.crossfit.mapper;

import com.tfg.crossfit.config.CentralConfig;
import com.tfg.crossfit.dto.UsuarioDTO;
import com.tfg.crossfit.model.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", config = CentralConfig.class)
public interface UsuarioMapper {

	UsuarioDTO toDTO(Usuario usuario);

	Usuario toEntity(UsuarioDTO dto);

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "passwordHash", ignore = true)
	@Mapping(target = "fechaAlta", ignore = true)
	void updateEntityFromDto(UsuarioDTO dto, @MappingTarget Usuario usuario);
}
