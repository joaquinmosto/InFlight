package tpigrupo2.bacend.service;

import tpigrupo2.bacend.model.Caracteristica;
import tpigrupo2.bacend.security.User.User;

import java.util.Collection;

public interface ICaracteristicaService {
    public Caracteristica crearCaracteristica(Caracteristica caracteristica);
    public Caracteristica buscarCaracteristica(Integer id);
    public Caracteristica editarCaracteristica(Caracteristica caracteristica);
    public boolean eliminarCaracteristica(Integer id);
    Collection<Caracteristica> listarCaracteristicas();

    public Caracteristica buscarPorNombre(String nombre);


}
