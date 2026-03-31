package com.tfg.crossfit.config;

import com.tfg.crossfit.security.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.context.SecurityContextHolderFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration corsConfig = new CorsConfiguration();
                    corsConfig.setAllowedOrigins(List.of("http://localhost:8080", "http://localhost:3000",  "https://crossfit-frontend.onrender.com")); // tu frontend
                    corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    corsConfig.setAllowedHeaders(List.of("Authorization", "Content-Type", "*"));
                    corsConfig.setExposedHeaders(List.of("Authorization"));
                    corsConfig.setAllowCredentials(true);
                    return corsConfig;
                }))
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Permitir OPTIONS (CORS)
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Rutas públicas
                        .requestMatchers("/usuarios/registro", "/usuarios/login").permitAll()
                        .requestMatchers("/clases/**").permitAll()
                        .requestMatchers("/clases/generar-semana").permitAll()
                        .requestMatchers("/horarios/**").permitAll()

                        // Rutas accesibles para cualquier usuario autenticado
                        .requestMatchers("/usuarios/me").authenticated()

                        // Inscripciones (USER + ADMIN)
                        .requestMatchers(HttpMethod.POST, "/inscripciones").hasAnyRole("USER", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/inscripciones/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/inscripciones/**").hasAnyRole("USER", "ADMIN")

                        // Rutas ADMIN
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/usuarios/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers("/coaches/**").hasRole("ADMIN")
                        .requestMatchers("/actividades/**").hasRole("ADMIN")

                        // Rutas COACH
                        .requestMatchers("/coach/**").hasAnyRole("COACH", "ADMIN")

                        // Rutas USER
                        .requestMatchers("/user/**").hasAnyRole("USER", "ADMIN")

                        // Cualquier otra ruta requiere autenticación
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable());

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        http.securityContext(security -> security.requireExplicitSave(false));

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }
}