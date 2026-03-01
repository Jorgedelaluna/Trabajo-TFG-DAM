package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.CoachDTO;
import com.tfg.crossfit.model.Coach;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-01T18:01:41+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.9 (Oracle Corporation)"
)
@Component
public class CoachMapperImpl implements CoachMapper {

    @Override
    public CoachDTO toDTO(Coach coach) {
        if ( coach == null ) {
            return null;
        }

        CoachDTO coachDTO = new CoachDTO();

        coachDTO.setId( coach.getId() );
        coachDTO.setNombre( coach.getNombre() );
        coachDTO.setDescripcion( coach.getDescripcion() );
        coachDTO.setCertificaciones( coach.getCertificaciones() );

        return coachDTO;
    }

    @Override
    public Coach toEntity(CoachDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Coach coach = new Coach();

        coach.setId( dto.getId() );
        coach.setNombre( dto.getNombre() );
        coach.setDescripcion( dto.getDescripcion() );
        coach.setCertificaciones( dto.getCertificaciones() );

        return coach;
    }
}
