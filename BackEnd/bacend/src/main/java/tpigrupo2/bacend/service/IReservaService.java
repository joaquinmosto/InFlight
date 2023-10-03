package tpigrupo2.bacend.service;

import tpigrupo2.bacend.model.Reserva;
import tpigrupo2.bacend.security.User.User;

import java.util.Collection;
import java.util.List;

public interface IReservaService {
    public Reserva crearReserva(Reserva reserva);
    public Reserva buscarReserva(Integer id);
    public Reserva editarReserva(Reserva reserva);
    public boolean eliminarReserva(Integer id);
    Collection<Reserva> listarReservas();

}
