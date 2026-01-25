package com.tfg.crossfit.repository;

import com.tfg.crossfit.model.Pago;
import com.tfg.crossfit.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PagoRepository extends JpaRepository<Pago, Long> {

    List<Pago> findByUsuario(Usuario usuario);
}
