package tpigrupo2.bacend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ProductoDTO {
    private int id;
    private String nombre;
    private String imagen;
    private String descripcion;
    private String categoria;
    private List<CursoDTO> cursos;
}
