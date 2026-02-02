import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [rol, setRol] = useState(localStorage.getItem("rol"));

  const login = (token, rol) => {
    localStorage.setItem("token", token);
    localStorage.setItem("rol", rol);
    setToken(token);
    setRol(rol);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    setToken(null);
    setRol(null);
  };

  return (
    <AuthContext.Provider value={{ token, rol, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
