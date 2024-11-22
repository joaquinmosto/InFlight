package tpigrupo2.bacend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tpigrupo2.bacend.model.Producto;

import java.util.List;

@Repository
public interface iProductoRepository extends JpaRepository<Producto, Integer>
{
    List<Producto> findByNombre(String nombre);

    @Query("SELECT nombre FROM Producto p WHERE p.nombre LIKE :nombrePattern")
    List<String> findByNombreLike(@Param("nombrePattern") String nombrePattern);
}