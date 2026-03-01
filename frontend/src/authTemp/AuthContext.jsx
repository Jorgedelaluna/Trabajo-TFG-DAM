import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  // Estado inicial leyendo localStorage
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [usuario, setUsuario] = useState(() => {
    const savedUser = localStorage.getItem("usuario");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  // Validar token y cargar usuario actual
  useEffect(() => {

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
        setUsuario(data);
        localStorage.setItem("usuario", JSON.stringify(data));

      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    cargarUsuario();

  }, [token]);

  // Login
  const login = (tokenRecibido, usuarioRecibido) => {
    setToken(tokenRecibido);
    setUsuario(usuarioRecibido);

    localStorage.setItem("token", tokenRecibido);
    localStorage.setItem("usuario", JSON.stringify(usuarioRecibido));
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUsuario(null);

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  };

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

export function useAuth() {
  return useContext(AuthContext);
}