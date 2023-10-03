package tpigrupo2.bacend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tpigrupo2.bacend.model.Imagenes;
import tpigrupo2.bacend.repository.iImagenesRepository;
import tpigrupo2.bacend.service.IImagenService;

import java.util.*;

@Service
public class ImagenesService implements IImagenService {
    @Autowired
    private iImagenesRepository imagenRepository;

    @Override
    public Imagenes crearImagenes(Imagenes imagen) {
        return imagenRepository.save(imagen);
    }

    @Override
    public Imagenes buscarImagenes(Integer id) {
        Optional<Imagenes> imagen = imagenRepository.findById(id);
        if(imagen.isPresent()){
            return imagen.get();
        }
        return null;
    }

    @Override
    public Imagenes editarImagenes(Imagenes imagen) {
        return null;
    }

    @Override
    public boolean eliminarImagenes(Integer id) {
        return false;
    }

    @Override
    public Collection<Imagenes> listarImageness() {
        List<Imagenes> imagenes = imagenRepository.findAll();
        return new HashSet<>(imagenes);
    }
}
