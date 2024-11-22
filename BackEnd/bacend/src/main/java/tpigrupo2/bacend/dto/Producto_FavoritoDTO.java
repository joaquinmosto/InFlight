package tpigrupo2.bacend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import tpigrupo2.bacend.model.Producto;

import java.io.Serializable;
@Data
@AllArgsConstructor
public class Producto_FavoritoDTO implements Serializable
{
    private int id;

    private String usuario;

    private int producto;

    private String nombreproducto;
}