import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [usuario, setUsuario] = useState(null);

  const login = (token, usuario) => {
    setToken(token);
    setUsuario(usuario);
    localStorage.setItem("token", token);
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
