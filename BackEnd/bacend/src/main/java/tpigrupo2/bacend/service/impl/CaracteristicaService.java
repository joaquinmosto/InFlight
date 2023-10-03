package tpigrupo2.bacend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tpigrupo2.bacend.model.Caracteristica;
import tpigrupo2.bacend.repository.ICaracteristicaRepository;
import tpigrupo2.bacend.service.ICaracteristicaService;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class CaracteristicaService implements ICaracteristicaService {
    @Autowired
    private ICaracteristicaRepository iCaracteristicaRepository;

    @Override
    public Caracteristica crearCaracteristica(Caracteristica caracteristica) {
        return iCaracteristicaRepository.save(caracteristica);
    }

    @Override
    public Caracteristica buscarCaracteristica(Integer id) {
         Optional<Caracteristica> cat = iCaracteristicaRepository.findById(id);
         if (cat.isPresent()){
             return cat.get();
         }

        return null;
    }

    @Override
    public Caracteristica editarCaracteristica(Caracteristica caracteristica) {
        ;
        Caracteristica cat = buscarCaracteristica(caracteristica.getId());
        if(cat != null)
        {
            cat = iCaracteristicaRepository.save(caracteristica);
        }
        return cat;
    }

    @Override
    public boolean eliminarCaracteristica(Integer id) {

        Caracteristica cat = buscarCaracteristica(id);
        if(cat != null)
        {
            iCaracteristicaRepository.delete(cat);
            return true;
        }

        return false;
    }

    @Override
    public Collection<Caracteristica> listarCaracteristicas() {

        return iCaracteristicaRepository.findAll();
    }

    @Override
    public Caracteristica buscarPorNombre(String nombre) {
        List<Caracteristica> caracteristicas = iCaracteristicaRepository.findByNombre(nombre);
        if (caracteristicas.size()>0)
        {
            return caracteristicas.get(0);
        }

        return null;
    }
}
