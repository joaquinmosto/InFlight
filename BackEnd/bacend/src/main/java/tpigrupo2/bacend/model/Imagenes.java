package tpigrupo2.bacend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;


@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name ="imagenes")
public class Imagenes implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String ruta;
    private String image;
}
