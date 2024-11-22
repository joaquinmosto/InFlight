package tpigrupo2.bacend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tpigrupo2.bacend.security.User.User;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name ="CalificacionesXProducto")
public class Calificaciones_Producto
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private User usuario;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;

    private Double calificacion;

    private String comentario;

    private String fechaCalificacion;
}