package tpigrupo2.bacend.service;

import tpigrupo2.bacend.model.Producto;

import java.util.Collection;
import java.util.List;
import java.util.Optional;


public interface IProductoService {
    public Producto crearProducto(Producto producto);
    public Producto buscarProducto(Integer id);
    public Producto editarProducto(Producto producto);
    public boolean eliminarProducto(Integer id);
    Collection<Producto> listarProductos();

    public Producto buscarPorNombre(String nombre);

    public Optional<List<String>> autoCompletarNombre(String nombre);
}
