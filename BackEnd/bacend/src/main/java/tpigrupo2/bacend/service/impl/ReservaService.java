package tpigrupo2.bacend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tpigrupo2.bacend.model.Reserva;
import tpigrupo2.bacend.repository.IReservaRepository;
import tpigrupo2.bacend.service.IReservaService;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaService implements IReservaService {
    @Autowired
    private IReservaRepository iReservaRepository;

    @Override
    public Reserva crearReserva(Reserva reserva) {

        return iReservaRepository.save(reserva);
    }

    @Override
    public Reserva buscarReserva(Integer id) {
         Optional<Reserva> cat = iReservaRepository.findById(id);
         if (cat.isPresent()){
             return cat.get();
         }

        return null;
    }

    @Override
    public Reserva editarReserva(Reserva reserva) {
        ;
        Reserva cat = buscarReserva(reserva.getId());
        if(cat != null)
        {
            cat = iReservaRepository.save(reserva);
        }
        return cat;
    }

    @Override
    public boolean eliminarReserva(Integer id) {

        Reserva cat = buscarReserva(id);
        if(cat != null)
        {
            iReservaRepository.delete(cat);
            return true;
        }

        return false;
    }

    @Override
    public Collection<Reserva> listarReservas() {

        return iReservaRepository.findAll();
    }

}
