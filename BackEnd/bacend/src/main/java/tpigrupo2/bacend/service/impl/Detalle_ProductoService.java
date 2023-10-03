package tpigrupo2.bacend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tpigrupo2.bacend.model.Detalle_Producto;
import tpigrupo2.bacend.repository.iDetalle_ProductoRepository;
import tpigrupo2.bacend.service.IDetalle_ProductoService;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class Detalle_ProductoService implements IDetalle_ProductoService {
    @Autowired
    private iDetalle_ProductoRepository detalleRepository;

    @Override
    public Detalle_Producto crearDetalle_Producto(Detalle_Producto detalle) {
        return null;
    }

    @Override
    public Detalle_Producto buscarDetalle_Producto(Integer id) {
        Optional<Detalle_Producto> detalle = detalleRepository.findById(id);
        if(detalle.isPresent()){
            return detalle.get();
        }
        return null;
    }

    @Override
    public Detalle_Producto editarDetalle_Producto(Detalle_Producto detalle) {
        return null;
    }

    @Override
    public boolean eliminarDetalle_Producto(Integer id) {
        return false;
    }

    @Override
    public Collection<Detalle_Producto> listarDetalle_Productos() {
        List<Detalle_Producto> detalles = detalleRepository.findAll();
        return new HashSet<>(detalles);
    }
}
