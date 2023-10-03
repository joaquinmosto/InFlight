package tpigrupo2.bacend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tpigrupo2.bacend.model.Categoria;
import tpigrupo2.bacend.repository.ICategoriaRepository;
import tpigrupo2.bacend.service.ICategoriaService;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService implements ICategoriaService {
    @Autowired
    private ICategoriaRepository iCategoriaRepository;

    @Override
    public Categoria crearCategoria(Categoria categoria) {

        return iCategoriaRepository.save(categoria);
    }

    @Override
    public Categoria buscarCategoria(Integer id) {
         Optional<Categoria> cat = iCategoriaRepository.findById(id);
         if (cat.isPresent()){
             return cat.get();
         }

        return null;
    }

    @Override
    public Categoria editarCategoria(Categoria categoria) {
        ;
        Categoria cat = buscarCategoria(categoria.getId());
        if(cat != null)
        {
            cat = iCategoriaRepository.save(categoria);
        }
        return cat;
    }

    @Override
    public boolean eliminarCategoria(Integer id) {

        Categoria cat = buscarCategoria(id);
        if(cat != null)
        {
            iCategoriaRepository.delete(cat);
            return true;
        }

        return false;
    }

    @Override
    public Collection<Categoria> listarCategorias() {

        return iCategoriaRepository.findAll();
    }

    @Override
    public Categoria buscarPorNombre(String nombre) {
        List<Categoria> categorias = iCategoriaRepository.findByNombre(nombre);
        if (categorias.size()>0)
        {
            return categorias.get(0);
        }

        return null;
    }
}
