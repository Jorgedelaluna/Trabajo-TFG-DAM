import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

function normalizeRole(usuario) {
  const r = (usuario?.rol || usuario?.tipoUsuario || "").toUpperCase();
  if (r.includes("ADMIN")) return "ADMIN";
  if (r.includes("COACH") || r.includes("PROFESOR")) return "COACH";
  return "USER";
}

function roleHomePath(usuario) {
  const rol = normalizeRole(usuario);
  if (rol === "ADMIN") return "/dashboard-admin";
  if (rol === "COACH") return "/dashboard-coach";
  return "/dashboard-user";
}

export default function ProtectedRoute({ roles, allowedRoles, children }) {
  const { isAuthenticated, usuario } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const required = roles ?? allowedRoles;
  if (required && required.length) {
    const userRole = normalizeRole(usuario);
    const allowed = required.map((r) => r.toUpperCase());
    if (!allowed.includes(userRole)) {
      return <Navigate to={roleHomePath(usuario)} replace />;
    }
  }

  return children ? children : <Outlet />;
}
