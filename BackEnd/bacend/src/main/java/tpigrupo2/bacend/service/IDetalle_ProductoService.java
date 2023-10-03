package tpigrupo2.bacend.service;

import tpigrupo2.bacend.model.Detalle_Producto;

import java.util.Collection;

public interface IDetalle_ProductoService {
    public Detalle_Producto crearDetalle_Producto(Detalle_Producto detalle);
    public Detalle_Producto buscarDetalle_Producto(Integer id);
    public Detalle_Producto editarDetalle_Producto(Detalle_Producto detalle);
    public boolean eliminarDetalle_Producto(Integer id);
    Collection<Detalle_Producto> listarDetalle_Productos();
}
