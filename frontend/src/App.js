import logo from "./logo.svg";
import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/homeTemp/Home";
import LoginPage from "./pages/auth/LoginPage";
import RegistroPage from "./pages/auth/RegistroPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import UsuarioListaPage from "./pages/usuario/UsuarioListaPage";
import UsuarioDetallePage from "./pages/usuario/UsuarioDetallePage";
import ClaseListaPage from "./pages/clase/ClaseListaPage";
import ClaseDetallePage from "./pages/clase/ClaseDetallePage";
import ReservaListaPage from "./pages/reserva/ReservaListaPage";
import PerfilPage from "./pages/perfil/PerfilPage";
import ProtectedRoute from "./authTemp/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />

        {/* Rutas privadas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <UsuarioListaPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuarios/:id"
          element={
            <ProtectedRoute>
              <UsuarioDetallePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clases"
          element={
            <ProtectedRoute>
              <ClaseListaPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clases/:id"
          element={
            <ProtectedRoute>
              <ClaseDetallePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reservas"
          element={
            <ProtectedRoute>
              <ReservaListaPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <PerfilPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
