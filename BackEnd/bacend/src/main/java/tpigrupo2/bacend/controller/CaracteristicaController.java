package tpigrupo2.bacend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tpigrupo2.bacend.model.Caracteristica;
import tpigrupo2.bacend.service.ICaracteristicaService;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/caracteristicas")
public class CaracteristicaController {
    @Autowired
    ICaracteristicaService caracteristicaService;

    @CrossOrigin("*")
    @GetMapping
    public List<Caracteristica> listarCaracteristicas(){
        Collection<Caracteristica> caracteristicas = caracteristicaService.listarCaracteristicas();
        return caracteristicas.stream().toList();
    }

    @CrossOrigin("*")
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarCaracteristica(@PathVariable Integer id){
        Caracteristica caracteristica = caracteristicaService.buscarCaracteristica(id);
        if(caracteristica != null){
            return new ResponseEntity<Caracteristica>(caracteristica, HttpStatus.OK);
        }

        return new ResponseEntity<String>("Caracteristica no encontrada", HttpStatus.NOT_FOUND);
    }

    @CrossOrigin("*")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarCaracteristica(@PathVariable Integer id){
        if (caracteristicaService.eliminarCaracteristica(id)){
            return ResponseEntity.ok("Caracteristica eliminada correctamente");
        }
        return ResponseEntity.notFound().build();
    }

    @CrossOrigin("*")
    @PostMapping
    public ResponseEntity<String> crearCaracteristica(@RequestBody Caracteristica caracteristicaRequest) {
        Caracteristica c = caracteristicaService.buscarPorNombre(caracteristicaRequest.getNombre());
        if(c != null){
            return ResponseEntity.badRequest().body("Nombre de Caracteristica existente");
        }
        try {
            String ruta = "";
            if(caracteristicaRequest.getImage() != "" && caracteristicaRequest.getImage() != null) {

                byte[] imageBytes = java.util.Base64.getDecoder().decode(caracteristicaRequest.getImage());
                try {
                    String imageName = UUID.randomUUID().toString() + ".jpg";
                    File imageFile = new File("/var/www/html/images/" + imageName);
                    imageFile.createNewFile();
                    FileOutputStream fos = new FileOutputStream(imageFile);
                    fos.write(imageBytes);
                    fos.close();
                    ruta = "http://3.144.46.39/images/" + imageName;

                } catch (IOException e) {
                    e.printStackTrace(); // para agregar a Logs
                }
            }
            Caracteristica nueva = new Caracteristica(0,caracteristicaRequest.getNombre(),caracteristicaRequest.getDescripcion(), ruta);

            caracteristicaService.crearCaracteristica(nueva);

            return ResponseEntity.ok("Caracteristica creada correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear el caracteristica.");
        }
    }

}
