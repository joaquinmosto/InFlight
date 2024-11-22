package tpigrupo2.bacend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import tpigrupo2.bacend.model.Producto;
import tpigrupo2.bacend.model.Producto_Favorito;

import java.util.List;

@Data
@AllArgsConstructor
public class UserDTO
{
    Integer id;

    String username;

    String lastname;

    String firstname;

    String role;
}