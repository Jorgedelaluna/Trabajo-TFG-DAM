package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.PagoCrearDTO;
import com.tfg.crossfit.dto.PagoDTO;
import com.tfg.crossfit.model.Pago;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PagoMapper {

    // DTO → Entidad
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "usuario", ignore = true) // se asigna en el servicio
    @Mapping(target = "fechaPago", ignore = true) // se asigna en el servicio
    Pago toEntity(PagoCrearDTO dto);

    // Entidad → DTO
    @Mapping(source = "usuario.id", target = "usuarioId")
    PagoDTO toDTO(Pago pago);
}
