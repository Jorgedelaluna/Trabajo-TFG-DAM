/**
 * ============================================================
 *  AUTH CONTEXT: AuthContext.jsx
 * 
 *  Contexto global de autenticación.
 * 
 *  Funcionalidades:
 *    - Gestiona token y usuario autenticado.
 *    - Persiste sesión en localStorage.
 *    - Valida token en el backend mediante /usuarios/me.
 *    - Proporciona login(), logout() e isAuthenticated.
 * 
 *  Este contexto envuelve toda la aplicación desde App.jsx.
 * ============================================================
 */

import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  /**
   * ============================================================
   * ESTADO INICIAL
   * Se carga desde localStorage para mantener la sesión activa
   * incluso tras recargar la página.
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
   *  VALIDACIÓN AUTOMÁTICA DEL TOKEN
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
        const res = await fetch("http://localhost:8080/usuarios/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
        console.warn("Token no válido o aún no cargado. No hacemos logout automático.");
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