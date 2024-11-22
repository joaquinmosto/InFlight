package tpigrupo2.bacend.dto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class CursoDTO
{
    private LocalDate fechaInicio;

    private LocalDate fechaFin;

    private int cupos;

    private int reservas;

    private int disponibles;
}