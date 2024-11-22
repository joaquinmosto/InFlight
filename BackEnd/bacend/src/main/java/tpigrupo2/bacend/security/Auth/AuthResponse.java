package tpigrupo2.bacend.security.Auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse
{
    String token;

    String username;

    String firstname;

    String lastname;

    String role;

    String id;
}