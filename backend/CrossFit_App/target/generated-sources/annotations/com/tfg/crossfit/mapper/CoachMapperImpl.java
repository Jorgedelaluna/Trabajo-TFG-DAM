package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.CoachDTO;
import com.tfg.crossfit.model.Coach;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-01T11:09:42+0200",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251118-1623, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class CoachMapperImpl implements CoachMapper {

    @Override
    public CoachDTO toDTO(Coach coach) {
        if ( coach == null ) {
            return null;
        }

        CoachDTO coachDTO = new CoachDTO();

        coachDTO.setCertificaciones( coach.getCertificaciones() );
        coachDTO.setDescripcion( coach.getDescripcion() );
        coachDTO.setId( coach.getId() );
        coachDTO.setNombre( coach.getNombre() );

        return coachDTO;
    }

    @Override
    public Coach toEntity(CoachDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Coach coach = new Coach();

        coach.setCertificaciones( dto.getCertificaciones() );
        coach.setDescripcion( dto.getDescripcion() );
        coach.setId( dto.getId() );
        coach.setNombre( dto.getNombre() );

        return coach;
    }
}
