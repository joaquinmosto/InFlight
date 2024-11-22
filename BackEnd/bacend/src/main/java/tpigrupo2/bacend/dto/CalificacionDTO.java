package tpigrupo2.bacend.dto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import tpigrupo2.bacend.model.Producto;
import tpigrupo2.bacend.security.User.User;

@Data
@AllArgsConstructor
public class CalificacionDTO
{
    private String username;

    private int idProducto;

    private Double calificacion;

    private String comentario;

    private String fechaCalificacion;
}