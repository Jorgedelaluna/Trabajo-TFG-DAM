import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [usuario, setUsuario] = useState(null);

  // Cargar usuario si ya hay token guardado
  useEffect(() => {
    if (!token) return;

    const cargarUsuario = async () => {
      try {
        const res = await fetch("http://localhost:8080/usuarios/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          // Token caducado o inválido
          logout();
          return;
        }

        const data = await res.json();
        setUsuario(data);
      } catch (err) {
        logout();
      }
    };

    cargarUsuario();
  }, [token]);

  const login = (tokenRecibido, usuarioRecibido) => {
    setToken(tokenRecibido);
    setUsuario(usuarioRecibido);
    localStorage.setItem("token", tokenRecibido);
  };

  const logout = () => {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
