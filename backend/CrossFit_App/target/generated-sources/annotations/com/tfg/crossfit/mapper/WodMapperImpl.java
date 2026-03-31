package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.WodDTO;
import com.tfg.crossfit.dto.WodEjercicioDTO;
import com.tfg.crossfit.model.Coach;
import com.tfg.crossfit.model.Wod;
import com.tfg.crossfit.model.WodEjercicio;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-31T23:41:33+0200",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251118-1623, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class WodMapperImpl implements WodMapper {

    @Autowired
    private WodEjercicioMapper wodEjercicioMapper;

    @Override
    public WodDTO toDTO(Wod wod) {
        if ( wod == null ) {
            return null;
        }

        WodDTO wodDTO = new WodDTO();

        wodDTO.setCoachId( wodCoachId( wod ) );
        wodDTO.setEjercicios( wodEjercicioListToWodEjercicioDTOList( wod.getEjercicios() ) );
        wodDTO.setDescripcion( wod.getDescripcion() );
        wodDTO.setFecha( wod.getFecha() );
        wodDTO.setId( wod.getId() );
        wodDTO.setNombre( wod.getNombre() );

        return wodDTO;
    }

    @Override
    public Wod toEntity(WodDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Wod wod = new Wod();

        wod.setCoach( map( dto.getCoachId() ) );
        wod.setEjercicios( wodEjercicioDTOListToWodEjercicioList( dto.getEjercicios() ) );
        wod.setDescripcion( dto.getDescripcion() );
        wod.setFecha( dto.getFecha() );
        wod.setId( dto.getId() );
        wod.setNombre( dto.getNombre() );

        return wod;
    }

    private Long wodCoachId(Wod wod) {
        if ( wod == null ) {
            return null;
        }
        Coach coach = wod.getCoach();
        if ( coach == null ) {
            return null;
        }
        Long id = coach.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    protected List<WodEjercicioDTO> wodEjercicioListToWodEjercicioDTOList(List<WodEjercicio> list) {
        if ( list == null ) {
            return null;
        }

        List<WodEjercicioDTO> list1 = new ArrayList<WodEjercicioDTO>( list.size() );
        for ( WodEjercicio wodEjercicio : list ) {
            list1.add( wodEjercicioMapper.toDTO( wodEjercicio ) );
        }

        return list1;
    }

    protected List<WodEjercicio> wodEjercicioDTOListToWodEjercicioList(List<WodEjercicioDTO> list) {
        if ( list == null ) {
            return null;
        }

        List<WodEjercicio> list1 = new ArrayList<WodEjercicio>( list.size() );
        for ( WodEjercicioDTO wodEjercicioDTO : list ) {
            list1.add( wodEjercicioMapper.toEntity( wodEjercicioDTO ) );
        }

        return list1;
    }
}
