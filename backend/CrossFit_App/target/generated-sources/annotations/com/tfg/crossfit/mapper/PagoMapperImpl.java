package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.PagoCrearDTO;
import com.tfg.crossfit.dto.PagoDTO;
import com.tfg.crossfit.model.Pago;
import com.tfg.crossfit.model.Usuario;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-28T09:35:50+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class PagoMapperImpl implements PagoMapper {

    @Override
    public Pago toEntity(PagoCrearDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Pago pago = new Pago();

        pago.setImporte( dto.getImporte() );
        pago.setTipo( dto.getTipo() );
        pago.setMetodo( dto.getMetodo() );
        pago.setNotas( dto.getNotas() );

        return pago;
    }

    @Override
    public PagoDTO toDTO(Pago pago) {
        if ( pago == null ) {
            return null;
        }

        PagoDTO pagoDTO = new PagoDTO();

        pagoDTO.setUsuarioId( pagoUsuarioId( pago ) );
        pagoDTO.setId( pago.getId() );
        pagoDTO.setImporte( pago.getImporte() );
        pagoDTO.setTipo( pago.getTipo() );
        pagoDTO.setMetodo( pago.getMetodo() );
        pagoDTO.setNotas( pago.getNotas() );
        pagoDTO.setFechaPago( pago.getFechaPago() );

        return pagoDTO;
    }

    private Long pagoUsuarioId(Pago pago) {
        if ( pago == null ) {
            return null;
        }
        Usuario usuario = pago.getUsuario();
        if ( usuario == null ) {
            return null;
        }
        Long id = usuario.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
