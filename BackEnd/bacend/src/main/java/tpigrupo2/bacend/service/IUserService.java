package tpigrupo2.bacend.service;

import tpigrupo2.bacend.dto.UserDTO;
import tpigrupo2.bacend.security.User.User;

import java.util.Set;

public interface IUserService  {
    Set<UserDTO> listarUsuarios();

    public User buscarUsuario(String user);

    public User editarUsuario(User user);
}
