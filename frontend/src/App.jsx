/**
 * ============================================
 *  APP PRINCIPAL
 *  - Define todas las rutas públicas y privadas
 *  - Aplica layouts y protección por roles
 *  - Carga Navbar y Footer globales
 * ============================================
 */

import "./styles/Global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Componentes globales
import Navbar from "./components/Navbar";
import Footer from "./components/home/Footer";

// Layouts
import PublicLayout from "./layout/PublicLayout";
import PrivateLayout from "./layout/PrivateLayout";
import ProtectedRoute from "./authTemp/ProtectedRoute";

// Páginas públicas
import Home from "./pages/homePublic/Home";
import ClasesPage from "./pages/homePublic/ClasesPage";
import HorariosPage from "./pages/homePublic/HorariosPage";
import PreciosPage from "./pages/homePublic/PreciosPage";
import LoginPage from "./pages/auth/LoginPage";
import RegistroPage from "./pages/auth/RegistroPage";

// Páginas privadas
import PerfilPage from "./pages/perfil/PerfilPage";
import MisReservasPage from "./pages/reservas/MisReservasPage";
import UserDashboard from "./pages/dashboard/modules/UserDashboard";

// Administración
import UsuarioListaPage from "./pages/usuario/UsuarioListaPage";
import UsuarioDetallePage from "./pages/usuario/UsuarioDetallePage";
import ClaseListaPage from "./pages/clases/ClaseListaPage";
import ClaseDetallePage from "./pages/clases/ClaseDetallePage";

export default function App() {
  return (
    <BrowserRouter>

      {/* NAVBAR GLOBAL PARA TODAS LAS PAGINAS */}
      <Navbar />

      <Routes>

        {/* ============================
            RUTAS PÚBLICAS (sin login)
        ============================ */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/clases" element={<ClasesPage />} />
          <Route path="/horarios" element={<HorariosPage />} />
          <Route path="/precios" element={<PreciosPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />
        </Route>

        {/* ============================
            RUTAS PRIVADAS (todas requieren login)
        ============================ */}
        <Route
          element={
            <ProtectedRoute roles={["ADMIN", "COACH", "USER"]}>
              <PrivateLayout />
            </ProtectedRoute>
          }
        >

          {/* DASHBOARD GENERAL (todos los roles)*/}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={["ADMIN", "COACH", "USER"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

        {/* ============================
            ADMINISTRACIÓN
        ============================ */}
          
          {/* Gestión de usuarios */}
          <Route
            path="/usuarios"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <UsuarioListaPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/usuarios/:id"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <UsuarioDetallePage />
              </ProtectedRoute>
            }
          />

          {/* Gestión de clases (ADMIN + COACH) */}
          <Route
            path="/clases-admin"
            element={
              <ProtectedRoute roles={["ADMIN", "COACH"]}>
                <ClaseListaPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/clases-admin/:id"
            element={
              <ProtectedRoute roles={["ADMIN", "COACH"]}>
                <ClaseDetallePage />
              </ProtectedRoute>
            }
          />

        {/* ============================
            RESERVAS (todos los roles)
        ============================ */}

          {/* USER + COACH + ADMIN */}
          <Route
            path="/mis-reservas"
            element={
              <ProtectedRoute roles={["USER", "COACH", "ADMIN"]}>
                <MisReservasPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/perfil"
            element={
              <ProtectedRoute roles={["USER", "COACH", "ADMIN"]}>
                <PerfilPage />
              </ProtectedRoute>
            }
          />

        </Route>

      </Routes>
      
     {/* FOOTER GLOBAL PARA TODAS LAS PAGINAS */} 
      <Footer />

    </BrowserRouter>
  );
}
