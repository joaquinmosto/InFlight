package tpigrupo2.bacend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tpigrupo2.bacend.security.User.User;

import java.io.Serializable;
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name ="favoritos")
public class Producto_Favorito implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int id_usuario;
    @OneToOne
    @JoinColumn(name = "id_producto")
    private Producto producto;
}
