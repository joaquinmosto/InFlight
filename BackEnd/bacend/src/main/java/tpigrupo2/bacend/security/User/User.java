package tpigrupo2.bacend.security.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tpigrupo2.bacend.model.Calificaciones_Producto;
import tpigrupo2.bacend.model.Producto;
import tpigrupo2.bacend.model.Producto_Favorito;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="user", uniqueConstraints = {@UniqueConstraint(columnNames = {"username"})})
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Basic
    @Column(nullable = false)
    String username;
    @Column(nullable = false)
    String lastname;
    String firstname;
    String password;
    @JsonIgnore
    @OneToMany( mappedBy = "id_usuario",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Producto_Favorito> favorites;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Calificaciones_Producto> puntuaciones = new ArrayList<>();
    @Enumerated(EnumType.STRING) 
    Role role;
    private String pais;
    private String localidad;
    private String telefono;
    private String dni;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
      return List.of(new SimpleGrantedAuthority((role.name())));
    }
    @Override
    public boolean isAccountNonExpired() {
       return true;
    }
    @Override
    public boolean isAccountNonLocked() {
       return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @Override
    public boolean isEnabled() {
        return true;
    }
}
