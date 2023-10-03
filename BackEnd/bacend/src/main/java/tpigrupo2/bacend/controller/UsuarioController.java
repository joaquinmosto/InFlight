package tpigrupo2.bacend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.StreamingHttpOutputMessage;
import org.springframework.web.bind.annotation.*;
import tpigrupo2.bacend.security.User.User;
import tpigrupo2.bacend.service.IUserService;

@RestController
@RequestMapping("/usuario")
@RequiredArgsConstructor
public class UsuarioController {


    @Autowired
    private final IUserService userService;

    @CrossOrigin("*")
    @PutMapping
    public ResponseEntity<String> ModificarUsuario(@RequestBody User userRequest) {
        User u = userService.buscarUsuario(userRequest.getUsername());
        if(u == null){
            return ResponseEntity.badRequest().body("El Usuario no existe");
        }
        try {
            u.setDni(userRequest.getDni());
            u.setPais(userRequest.getPais());
            u.setLocalidad(userRequest.getLocalidad());
            u.setTelefono(userRequest.getTelefono());
            u.setFirstname(userRequest.getFirstname() !=null?userRequest.getFirstname(): u.getFirstname());
            u.setLastname(userRequest.getLastname() !=null?userRequest.getLastname(): u.getLastname());
            userService.editarUsuario(u);
            return ResponseEntity.ok("Usuario modificado correctamente.");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al modificar el usuario."+ e.getMessage());
        }
    }

    @CrossOrigin("*")
    @GetMapping("/{usuario}")
    public ResponseEntity<String> buscarUsuario(@PathVariable String usuario) {
        User u = userService.buscarUsuario(usuario);
        if(u == null){
            return ResponseEntity.badRequest().body("El Usuario no existe");
        }
        try {

            org.json.JSONObject obj = new org.json.JSONObject();
            obj.put("firstname", u.getFirstname());
            obj.put("lastname",u.getLastname());
            obj.put("pais",u.getPais());
            obj.put("localidad", u.getLocalidad());
            obj.put("telefono",u.getTelefono());
            obj.put("dni",u.getDni());

        return ResponseEntity.ok(obj.toString());

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al modificar el usuario."+ e.getMessage());
        }
    }
}
