package tpigrupo2.bacend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tpigrupo2.bacend.model.Producto_Favorito;
import tpigrupo2.bacend.repository.IProducto_FavoritoRepository;
import tpigrupo2.bacend.service.IProducto_FavoritoService;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class Producto_FavoritoService implements IProducto_FavoritoService {
    @Autowired
    private IProducto_FavoritoRepository productoFavoritoRepository;
    @Override
    public Producto_Favorito agregarProductoFavorito(Producto_Favorito productoFavorito) {
        return productoFavoritoRepository.save(productoFavorito);
    }



    @Override
    public boolean eliminarProductoFavorito(Integer id) {
        Optional<Producto_Favorito> productoFavorito = productoFavoritoRepository.findById(id);
        if (productoFavorito.isPresent()) {
            productoFavoritoRepository.delete(productoFavorito.get());
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Collection<Producto_Favorito> listarProductosFavoritos() {
        List<Producto_Favorito> listarProductos = productoFavoritoRepository.findAll();

        return new HashSet<>(listarProductos);
    }

}
