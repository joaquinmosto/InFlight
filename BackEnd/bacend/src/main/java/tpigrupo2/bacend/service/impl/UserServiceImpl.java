package tpigrupo2.bacend.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tpigrupo2.bacend.dto.UserDTO;
import tpigrupo2.bacend.security.User.User;
import tpigrupo2.bacend.security.User.UserRepository;
import tpigrupo2.bacend.service.IUserService;

import java.util.*;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class UserServiceImpl implements IUserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    ObjectMapper mapper;

    @Override

    public Set<UserDTO> listarUsuarios() {
        List<User> usuarios = userRepository.findAll();

        // Si la lista de usuarios está vacía, devolvemos un conjunto vacío
        if (usuarios.isEmpty()) {
            return Collections.emptySet();
        }

        Set<UserDTO> usuariosDto = new HashSet<>();

        for (User usuario : usuarios) {
            usuariosDto.add(mapper.convertValue(usuario, UserDTO.class));
        }

        return usuariosDto;
    }

    @Override
    public User buscarUsuario(String user) {
        Optional<User> buscado = userRepository.findByUsername(user);
        if(buscado.isPresent()){
            return buscado.get();
        }
        return null;
    }

    @Override
    public User editarUsuario(User user) {
        return userRepository.save(user);
    }


}
//    public Set<UserDTO> listarUsuarios() {
//        List<User> usuarios = userRepository.findAll();
//
//        // Si la lista de usuarios está vacía, devolvemos un conjunto vacío
//        if (usuarios.isEmpty()) {
//            return Collections.emptySet();
//        }
//
//        Set<UserDTO> usuariosDto = new HashSet<>();
//
//        for (User usuario : usuarios) {
//            usuariosDto.add(mapper.convertValue(usuario, UserDTO.class));
//        }
//
//        return usuariosDto;
//    }

