package com.tfg.crossfit.security;

import com.tfg.crossfit.service.UsuarioService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UsuarioService usuarioService;

    public JwtFilter(JwtUtil jwtUtil, UsuarioService usuarioService) {
        this.jwtUtil = jwtUtil;
        this.usuarioService = usuarioService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        //System.out.println("PATH = " + request.getServletPath());
        System.out.println(">>> METHOD = " + request.getMethod());
        System.out.println(">>> RAW URI = " + request.getRequestURI());
        System.out.println(">>> SERVLET PATH = " + request.getServletPath());
        System.out.println(">>> CONTEXT PATH = " + request.getContextPath());
        System.out.println(">>> AUTH HEADER = " + request.getHeader("Authorization"));

        // 1. Deja pasar siempre las OPTIONS (preflight CORS)
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2. Obtener la ruta real de la petición
        String path = request.getRequestURI();

        // 3. Rutas públicas que no requieren JWT
        List<String> publicEndpoints = List.of(
                "/usuarios/registro",
                "/usuarios/login"
        );

        if (path.equals("/usuarios/login") ||
                path.equals("/usuarios/registro") ||
                path.startsWith("/clases/generar-semana") ||
                path.startsWith("/clases") ||
                path.startsWith("/horarios")) {

            filterChain.doFilter(request, response);
            return;
        }

        // 4. Resto del filtro (JWT)
        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);

            try {
                if (jwtUtil.validarToken(token)) {

                    String email = jwtUtil.obtenerEmail(token);

                    var usuarioOpt = usuarioService.buscarPorEmailIgnoreCase(email);

                    if (usuarioOpt.isPresent()) {
                        var usuario = usuarioOpt.get();

                        // Convertir rol a autoridad de Spring
                        var userDetails = new CustomUserDetails(usuario);

                        var auth = new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities()
                        );

                        System.out.println(">>> AUTHENTICATED PRINCIPAL = " + auth.getPrincipal());
                        System.out.println(">>> AUTHORITIES = " + auth.getAuthorities());

                        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                        SecurityContextHolder.getContext().setAuthentication(auth);
                    }
                }

            } catch (Exception e) {
                // Token inválido → limpiar contexto
                SecurityContextHolder.clearContext();
            }
        }

        filterChain.doFilter(request, response);
    }
}