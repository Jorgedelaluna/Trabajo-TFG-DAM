package com.tfg.crossfit.mapper;

import com.tfg.crossfit.dto.PagoCrearDTO;
import com.tfg.crossfit.dto.PagoDTO;
import com.tfg.crossfit.model.Pago;
import com.tfg.crossfit.model.Usuario;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-24T22:23:07+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251118-1623, environment: Java 21.0.8 (Eclipse Adoptium)"
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
        pago.setMetodo( dto.getMetodo() );
        pago.setNotas( dto.getNotas() );
        pago.setTipo( dto.getTipo() );

        return pago;
    }

    @Override
    public PagoDTO toDTO(Pago pago) {
        if ( pago == null ) {
            return null;
        }

        PagoDTO pagoDTO = new PagoDTO();

        pagoDTO.setUsuarioId( pagoUsuarioId( pago ) );
        pagoDTO.setFechaPago( pago.getFechaPago() );
        pagoDTO.setId( pago.getId() );
        pagoDTO.setImporte( pago.getImporte() );
        pagoDTO.setMetodo( pago.getMetodo() );
        pagoDTO.setNotas( pago.getNotas() );
        pagoDTO.setTipo( pago.getTipo() );

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
