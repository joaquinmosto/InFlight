package tpigrupo2.bacend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import tpigrupo2.bacend.security.User.User;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservaDTO implements Serializable {
    private String user;
    private LocalDate fecha_inicio;
    private LocalDate fecha_fin;
    private LocalTime hora_inicio;
    private LocalTime hora_fin;
    private Double precio;
    private int id_curso;
    private String nombre_producto;
    private String pdf;
    private int cantidad;
    private LocalDateTime fecha_reserva;
}
