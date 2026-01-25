package com.tfg.crossfit.repository;

import com.tfg.crossfit.model.Resultado;
import com.tfg.crossfit.model.Usuario;
import com.tfg.crossfit.model.Wod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ResultadoRepository extends JpaRepository<Resultado, Long> {

    List<Resultado> findByUsuario(Usuario usuario);

    List<Resultado> findByWod(Wod wod);

    Optional<Resultado> findByUsuarioAndWod(Usuario usuario, Wod wod);
}
