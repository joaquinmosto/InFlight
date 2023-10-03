package tpigrupo2.bacend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tpigrupo2.bacend.model.Imagenes;

@Repository
public interface iImagenesRepository extends JpaRepository<Imagenes, Integer> {
}
