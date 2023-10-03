package tpigrupo2.bacend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tpigrupo2.bacend.dto.Producto_FavoritoDTO;
import tpigrupo2.bacend.model.Caracteristica;
import tpigrupo2.bacend.model.Producto_Favorito;
import tpigrupo2.bacend.security.User.User;
import tpigrupo2.bacend.security.User.UserRepository;
import tpigrupo2.bacend.service.IProducto_FavoritoService;
import tpigrupo2.bacend.service.IUserService;
import tpigrupo2.bacend.service.impl.ProductoService;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/favoritos")
public class Producto_FavoritoController {
    @Autowired
    IProducto_FavoritoService productoFavoritoService;
    @Autowired
    UserRepository userRep;
    @Autowired
    ProductoService productoService;
    //GET LISTAR
    @CrossOrigin("*")
    @GetMapping("/{usuario}")
    public ResponseEntity<List<Producto_FavoritoDTO>> listarProductosFavoritos(@PathVariable String usuario){
       Optional<User> u = userRep.findByUsername(usuario);
       if(u.isPresent()) {
           User user = u.get();

           Collection<Producto_Favorito> productoFavoritos = user.getFavorites(); //productoFavoritoService
           // .listarProductosFavoritos();
           List<Producto_FavoritoDTO> lista= productoFavoritos.stream().map(p -> new Producto_FavoritoDTO(
                   p.getId(),
                   userRep.findById(p.getId_usuario()).get().getUsername(),
                   p.getProducto().getId(),
                   p.getProducto().getNombre()
           )).toList();

           return new ResponseEntity<List<Producto_FavoritoDTO>>( lista, HttpStatus.OK );

       }else {
           return ResponseEntity.notFound().build();
       }

    }


    //post, agregar un producto por id a favoritos
    @CrossOrigin("*")
    @PostMapping
    public ResponseEntity<?> agregarProductoFavorito(@RequestBody Producto_FavoritoDTO producto){
        String usuario = producto.getUsuario();
        int id_producto = producto.getProducto();

        Producto_Favorito pf;
        try {
            pf = new Producto_Favorito(0, userRep.findByUsername(usuario).get().getId(),
                    productoService.buscarProducto(id_producto));
        }catch (Exception exception){
            return new ResponseEntity<String>(exception.getMessage(), HttpStatus.NOT_FOUND);
        }

        Producto_Favorito productoFavorito = productoFavoritoService.agregarProductoFavorito(pf);

        return new ResponseEntity<Producto_FavoritoDTO>( new Producto_FavoritoDTO(productoFavorito.getId(), usuario,
                id_producto, pf.getProducto().getNombre()),
                HttpStatus.OK);



    }
    //delete borrar un producto por id

    @CrossOrigin("*")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProductofavorito(@PathVariable Integer id){
        if (productoFavoritoService.eliminarProductoFavorito(id)){
            return ResponseEntity.ok("Producto favorito eliminado correctamente");
        }
        return ResponseEntity.notFound().build();
    }


}
