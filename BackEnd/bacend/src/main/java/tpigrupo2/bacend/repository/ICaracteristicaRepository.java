package tpigrupo2.bacend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tpigrupo2.bacend.model.Caracteristica;

import java.util.List;

@Repository
public interface ICaracteristicaRepository extends JpaRepository<Caracteristica, Integer>
{
    List<Caracteristica> findByNombre(String nombre);
}