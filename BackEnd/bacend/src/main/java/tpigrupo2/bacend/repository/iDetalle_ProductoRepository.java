package tpigrupo2.bacend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tpigrupo2.bacend.model.Detalle_Producto;

@Repository
public interface iDetalle_ProductoRepository extends JpaRepository<Detalle_Producto, Integer> {
}
