package tpigrupo2.bacend.controller;

import org.springframework.web.bind.annotation.*;
import tpigrupo2.bacend.dto.CursoDTO;
import tpigrupo2.bacend.dto.ProductoDTO;
import tpigrupo2.bacend.model.Imagenes;
import tpigrupo2.bacend.model.Producto;
import tpigrupo2.bacend.service.IProductoService;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/search")
public class SearchController {

    private final IProductoService productoService;

    public SearchController(IProductoService productoService) {

        this.productoService = productoService;
    }

    @CrossOrigin("*")
    @GetMapping("/{busqueda}")
    public List<String> autoCompletarNombre(@PathVariable String busqueda){
        Optional<List<String>> nombres = productoService.autoCompletarNombre(busqueda + "%");
        if (nombres.isPresent()){
            return nombres.get();
        }return List.of();
    }

    @CrossOrigin("*")
    @GetMapping
    public List<ProductoDTO> search(@RequestParam HashMap<String, String> params){

        String nombre = params.getOrDefault("nombre", "_");

        Collection<Producto> productos = productoService.listarProductos();
        return productos.stream()
                .filter(producto -> producto.getNombre().startsWith(nombre))
                .map(producto -> {
            Optional<String> primeraImagen = producto.getImagenes().stream()
                    .map(Imagenes::getRuta)
                    .findFirst();

            return new ProductoDTO(
                    producto.getId(),
                    producto.getNombre(),
                    primeraImagen.orElse("NO HAY IMAGEN"),
                    producto.getDescripcion(),
                    producto.getCategoria() !=null ? producto.getCategoria().getNombre():"",
                    producto.getCursos().size() != 0 ?
                            producto.getCursos().stream()
                                    .map(curso -> new CursoDTO(
                                            curso.getFechaInicio(),
                                            curso.getFechaFin(),
                                            curso.getCupos(),
                                            curso.getReservas().size(),
                                            curso.getCupos() - curso.getReservas().size()
                                    ))
                                    .filter(cursoDTO -> cursoDTO.getDisponibles() > 0)
                                    .toList() :
                            List.of()
            );
        }).toList();
    }

}
