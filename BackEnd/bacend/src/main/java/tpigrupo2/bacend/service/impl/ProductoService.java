package tpigrupo2.bacend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tpigrupo2.bacend.model.Producto;
import tpigrupo2.bacend.repository.iProductoRepository;
import tpigrupo2.bacend.service.IProductoService;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class ProductoService implements IProductoService {
    @Autowired
    private iProductoRepository productoRepository;

    @Override
    public Producto crearProducto(Producto producto) {
        try {
            return productoRepository.save(producto);

        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Override
    public Producto buscarProducto(Integer id) {
        Optional<Producto> producto = productoRepository.findById(id);
        if(producto.isPresent()){
            return producto.get();
        }
        return null;
    }

    @Override
    public Producto editarProducto(Producto producto) {

        return productoRepository.save(producto);
    }

    @Override
    public boolean eliminarProducto(Integer id) {
        Optional<Producto> producto = productoRepository.findById(id);
        if(producto.isPresent()){
            productoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Collection<Producto> listarProductos() {
        List<Producto> productos = productoRepository.findAll();
        return productos;
    }

    @Override
    public Producto buscarPorNombre(String nombre) {
        List<Producto> productos = productoRepository.findByNombre(nombre);
        if(productos.size()>0){
            return productos.get(0);
        }
        return null;
    }
    public Optional<List<String>> autoCompletarNombre(String nombre) {
        System.out.println(nombre);
        return Optional.of(productoRepository.findByNombreLike(nombre));

    }
}
