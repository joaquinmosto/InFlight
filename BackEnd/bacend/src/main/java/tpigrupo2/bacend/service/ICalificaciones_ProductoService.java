package tpigrupo2.bacend.service;

import tpigrupo2.bacend.model.Calificaciones_Producto;

import java.util.List;
import java.util.Map;

public interface ICalificaciones_ProductoService {

    List<Calificaciones_Producto> listarCalificaciones();

    Calificaciones_Producto crearCalificacion(Calificaciones_Producto calificacion);

    List<Map<String, Object>> listarPuntuacionesPromedio();
}
