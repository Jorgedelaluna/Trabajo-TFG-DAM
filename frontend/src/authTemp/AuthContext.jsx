import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);

function roleToHome(rol) {
  const r = (rol || "").toUpperCase();
  if (r.includes("ADMIN")) return "/dashboard-admin";
  if (r.includes("COACH") || r.includes("PROFESOR")) return "/dashboard-coach";
  return "/dashboard-user";
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [usuario, setUsuario] = useState(() => {
    const raw = localStorage.getItem("usuario");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (usuario) localStorage.setItem("usuario", JSON.stringify(usuario));
    else localStorage.removeItem("usuario");
  }, [usuario]);

  const login = async (email, password) => {
    // Ajusta la ruta si vuestro backend usa otra:
    const data = await api.post("/usuarios/login", { email, password }, { auth: false });

    const newToken = data?.token || data?.jwt || data?.accessToken;
    const newUser = data?.usuario || data?.user || null;

    if (!newToken) throw new Error("Login OK pero no llegó token (token/jwt/accessToken).");

    setToken(newToken);
    setUsuario(newUser);

    return { usuario: newUser, home: roleToHome(newUser?.rol || newUser?.tipoUsuario) };
  };

  const register = async (nombre, email, password) => {
    await api.post("/usuarios/registro", { nombre, email, password }, { auth: false });
  };

  const logout = () => {
    setToken(null);
    setUsuario(null);
  };

  const value = useMemo(
    () => ({
      token,
      usuario,
      isAuthenticated: !!token,
      login,
      register,
      logout,
      roleToHome,
    }),
    [token, usuario]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider />");
  return ctx;
}
