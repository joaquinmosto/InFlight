package tpigrupo2.bacend.service;

import tpigrupo2.bacend.model.Imagenes;


import java.util.Collection;

public interface IImagenService {
    public Imagenes crearImagenes(Imagenes imagen);
    public Imagenes buscarImagenes(Integer id);
    public Imagenes editarImagenes(Imagenes imagen);
    public boolean eliminarImagenes(Integer id);
    Collection<Imagenes> listarImageness();
}
