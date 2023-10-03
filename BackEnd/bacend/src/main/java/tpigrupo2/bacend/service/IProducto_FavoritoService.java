package tpigrupo2.bacend.service;

import tpigrupo2.bacend.model.Producto_Favorito;

import java.util.Collection;

public interface IProducto_FavoritoService {
    public Producto_Favorito agregarProductoFavorito(Producto_Favorito productoFavorito);


    public boolean eliminarProductoFavorito(Integer id);
    Collection<Producto_Favorito> listarProductosFavoritos();


}
