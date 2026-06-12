package com.parcial.arquisoft.repository;

import com.parcial.arquisoft.entity.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProyectoRepository extends JpaRepository<Proyecto, Long> {

    boolean existsByCodigo(String codigo);
}
