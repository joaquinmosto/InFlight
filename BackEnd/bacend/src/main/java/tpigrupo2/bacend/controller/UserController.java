package tpigrupo2.bacend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tpigrupo2.bacend.dto.UserDTO;

import tpigrupo2.bacend.security.User.User;
import tpigrupo2.bacend.service.IUserService;


import java.util.Collection;


@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private final IUserService userService;

    @CrossOrigin("*")
    @GetMapping
    public Collection<UserDTO> getlistarUsuarios() {
        return userService.listarUsuarios();
    }

    @CrossOrigin("*")
    @PutMapping("/modrol")
    public ResponseEntity<String> ModificarRol(@RequestBody User userRequest) {
        User u = userService.buscarUsuario(userRequest.getUsername());
        if(u == null){
            return ResponseEntity.badRequest().body("El Usuario no existe");
        }
        try {
            u.setRole(userRequest.getRole());
            userService.editarUsuario(u);
            return ResponseEntity.ok("Usuario modificado correctamente.");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al modificar el usuario."+ e.getMessage());
        }
    }



}







