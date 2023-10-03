package tpigrupo2.bacend.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tpigrupo2.bacend.dto.ReservaDTO;
import tpigrupo2.bacend.model.Reserva;
import tpigrupo2.bacend.security.User.User;
import tpigrupo2.bacend.service.IReservaService;
import tpigrupo2.bacend.service.IUserService;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@RestController
@RequestMapping("/reservas")
public class ReservaController {
    @Autowired
    IReservaService reservaService;
    @Autowired
    IUserService userService;

    @CrossOrigin("*")
    @GetMapping
    public List<Reserva> listarReservas(){
        Collection<Reserva> reservas = reservaService.listarReservas();
        return reservas.stream().toList();
    }

    @CrossOrigin("*")
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarReserva(@PathVariable Integer id){
        Reserva reserva = reservaService.buscarReserva(id);
        if(reserva != null){
            return new ResponseEntity<Reserva>(reserva, HttpStatus.OK);
        }

        return new ResponseEntity<String>("Reserva no encontrada", HttpStatus.NOT_FOUND);
    }

    @CrossOrigin("*")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarReserva(@PathVariable Integer id){
        if (reservaService.eliminarReserva(id)){
            return ResponseEntity.ok("Reserva eliminada correctamente");
        }
        return ResponseEntity.notFound().build();
    }

    @CrossOrigin("*")
    @PostMapping
    public ResponseEntity<String> crearReserva(@RequestBody ReservaDTO reservaRequest) {

         try{
             User u = userService.buscarUsuario(reservaRequest.getUser());
                Reserva r = new Reserva(0,u,reservaRequest.getFecha_inicio(),
                        reservaRequest.getFecha_fin(),reservaRequest.getHora_inicio(),
                        reservaRequest.getHora_fin(),reservaRequest.getPrecio(),
                        reservaRequest.getId_curso(), reservaRequest.getNombre_producto(),
                        reservaRequest.getPdf(),reservaRequest.getCantidad(), LocalDateTime.now());

             reservaService.crearReserva(r);


            return ResponseEntity.ok("Reserva creada correctamente.");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear el reserva.");
        }
    }



}
