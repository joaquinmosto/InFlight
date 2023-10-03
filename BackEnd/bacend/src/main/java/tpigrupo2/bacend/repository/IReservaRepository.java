package tpigrupo2.bacend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tpigrupo2.bacend.model.Reserva;

import java.util.List;

@Repository
public interface IReservaRepository extends JpaRepository<Reserva, Integer> {

}
