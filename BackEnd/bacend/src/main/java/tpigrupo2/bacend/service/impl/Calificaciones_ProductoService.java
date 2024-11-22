package tpigrupo2.bacend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tpigrupo2.bacend.model.Calificaciones_Producto;
import tpigrupo2.bacend.repository.ICalificaciones_Producto;
import tpigrupo2.bacend.service.ICalificaciones_ProductoService;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class Calificaciones_ProductoService implements ICalificaciones_ProductoService {

    @Autowired
    private ICalificaciones_Producto iCalificaciones_ProductoRepository;

    @Override
    public List<Calificaciones_Producto> listarCalificaciones() {
        return iCalificaciones_ProductoRepository.findAll();
    }

    @Override
    public Calificaciones_Producto crearCalificacion(Calificaciones_Producto calificacion) {
        return iCalificaciones_ProductoRepository.save(calificacion);
    }

    @Override
    public List<Map<String, Object>> listarPuntuacionesPromedio() {
        String jdbcUrl = "jdbc:mysql://localhost:3306/dh";
        String usuario = "root";
        String contrasena = "root";

        List<Map<String, Object>> retorno = new ArrayList<>();

        try (Connection conexion = DriverManager.getConnection(jdbcUrl, usuario, contrasena);
             Statement statement = conexion.createStatement()) {

            String consultaSQL = "SELECT producto_id, avg(calificacion) as promedio, count(*) as puntuaciones FROM calificacionesxproducto group by producto_id;";
            ResultSet resultados = statement.executeQuery(consultaSQL);

            while (resultados.next()) {
                int productoId = resultados.getInt("producto_id");
                double promedio = resultados.getDouble("promedio");
                int puntuaciones = resultados.getInt("puntuaciones");

                Map<String, Object> objeto = new HashMap<>();
                objeto.put("producto_id", productoId);
                objeto.put("promedio", promedio);
                objeto.put("puntuaciones", puntuaciones);
                retorno.add(objeto);

            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return retorno;
    }
}
