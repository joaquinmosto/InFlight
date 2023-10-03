package tpigrupo2.bacend.service;

import tpigrupo2.bacend.model.Categoria;
import tpigrupo2.bacend.security.User.User;

import java.util.Collection;

public interface ICategoriaService {
    public Categoria crearCategoria(Categoria categoria);
    public Categoria buscarCategoria(Integer id);
    public Categoria editarCategoria(Categoria categoria);
    public boolean eliminarCategoria(Integer id);
    Collection<Categoria> listarCategorias();

    public Categoria buscarPorNombre(String nombre);


}
