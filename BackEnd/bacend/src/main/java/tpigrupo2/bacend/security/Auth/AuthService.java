package tpigrupo2.bacend.security.Auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import tpigrupo2.bacend.security.Jwt.JwtService;
import tpigrupo2.bacend.security.User.Role;
import tpigrupo2.bacend.security.User.User;
import tpigrupo2.bacend.security.User.UserRepository;

import lombok.RequiredArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService
{
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    //private final User user;

    public AuthResponse login(LoginRequest request)
    {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails user=userRepository.findByUsername(request.getUsername()).orElseThrow();
        Optional<User> u = userRepository.findByUsername(request.getUsername());
        User data=new User();

        if (u.isPresent()) {
            data = u.get();
        }
        String token=jwtService.getToken(user);

        return AuthResponse.builder()
            .token(token)
                .username(data.getUsername())
                .firstname(data.getFirstname())
                .lastname(data.getLastname())
                .role(data.getRole().toString())
                .id(data.getId().toString())
            .build();
    }

    public AuthResponse register(RegisterRequest request)
    {
        User user = User.builder()
            .username(request.getUsername())
            .password(passwordEncoder.encode( request.getPassword()))
            .firstname(request.getFirstname())
            .lastname(request.getLastname())
            .role(Role.USER)
            .build();
        userRepository.save(user);

        return AuthResponse.builder()
            .token(jwtService.getToken(user))
                .username(request.getUsername())
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .role(Role.USER.toString())
            .build();
    }
}