package com.tfg.crossfit.repository;

import com.tfg.crossfit.model.PrUsuario;
import com.tfg.crossfit.model.Usuario;
import com.tfg.crossfit.model.Ejercicio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PrUsuarioRepository extends JpaRepository<PrUsuario, Long> {

    List<PrUsuario> findByUsuario(Usuario usuario);

    List<PrUsuario> findByEjercicio(Ejercicio ejercicio);

    Optional<PrUsuario> findTopByUsuarioAndEjercicioOrderByValorDesc(Usuario usuario, Ejercicio ejercicio);
}
