package com.tfg.crossfit.repository;

import com.tfg.crossfit.model.Inscripcion;
import com.tfg.crossfit.model.Usuario;
import com.tfg.crossfit.model.Clase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface InscripcionRepository extends JpaRepository<Inscripcion, Long> {

    Optional<Inscripcion> findByUsuarioAndClase(Usuario usuario, Clase clase);

    List<Inscripcion> findByUsuario(Usuario usuario);

    List<Inscripcion> findByClase(Clase clase);
}
