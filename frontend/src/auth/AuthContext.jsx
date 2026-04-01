/**
 * ============================================================
 *  AUTH CONTEXT: AuthContext.jsx
 * 
 *  Contexto global de autenticaciÃ³n.
 * 
 *  Funcionalidades:
 *    - Gestiona token y usuario autenticado.
 *    - Persiste sesiÃ³n en localStorage.
 *    - Valida token en el backend mediante /usuarios/me.
 *    - Proporciona login(), logout() e isAuthenticated.
 * 
 *  Este contexto envuelve toda la aplicaciÃ³n desde App.jsx.
 * ============================================================
 */

import { createContext, useContext, useEffect, useState } from "react";
import API_URL from "../api/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    /**
     * ============================================================
     * ESTADO INICIAL
     * Se carga desde localStorage para mantener la sesiÃ³n activa
     * incluso tras recargar la pÃ¡gina.
     * ============================================================
     */
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [usuario, setUsuario] = useState(() => {
        const savedUser = localStorage.getItem("usuario");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Indica si estamos validando el token
    const [loading, setLoading] = useState(true);

    /**
     * ============================================================
     *  VALIDACIÃ“N AUTOMÃ�TICA DEL TOKEN
     *  Cada vez que cambia el token, consultamos /usuarios/me
     *  para obtener el usuario actual.
     * ============================================================
     */
    useEffect(() => {
        console.log(">>> USE EFFECT EJECUTADO. TOKEN =", token);

        // Si no hay token, no intentamos validar nada
        if (!token) {
            setLoading(false);
            return;
        }

        console.log("TOKEN ENVIADO A /me:", token);


        const cargarUsuario = async () => {
            try {
                const res = await fetch(`${API_URL}/usuarios/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    console.warn("Token no vÃ¡lido o aÃºn no cargado. No hacemos logout automÃ¡tico.");
                    setLoading(false);
                    return;
                }

                const data = await res.json();

                // Guardamos usuario actualizado
                setUsuario(data);
                localStorage.setItem("usuario", JSON.stringify(data));

            } catch (error) {
                console.error("Error validando token:", error)
                logout();
            } finally {
                setLoading(false);
            }
        };

        cargarUsuario();

    }, [token]);

    /**
     * ============================================================
     * LOGIN
     * Guarda token y usuario en estado + localStorage.
     * ============================================================
     */
    const login = (tokenRecibido, usuarioRecibido) => {
        localStorage.setItem("token", tokenRecibido);
        setToken(tokenRecibido);

        setUsuario(usuarioRecibido);
        localStorage.setItem("usuario", JSON.stringify(usuarioRecibido));
    };

    /**
     * ============================================================
     * LOGOUT
     * Limpia token, usuario y localStorage.
     * ============================================================
     */
    const logout = () => {
        setToken(null);
        setUsuario(null);

        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
    };

    /**
     * ============================================================
     *  VALOR EXPUESTO AL RESTO DE LA APP
     * ============================================================
     */
    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider
            value={{
                token,
                usuario,
                login,
                logout,
                isAuthenticated,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

/**
 * ============================================================
 * HOOK PERSONALIZADO: useAuth()
 * Permite acceder al contexto desde cualquier componente.
 * ============================================================
 */
export function useAuth() {
    return useContext(AuthContext);
}