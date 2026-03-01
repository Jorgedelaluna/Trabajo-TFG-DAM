import "./styles/Global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/home/Footer";

import PublicLayout from "./layout/PublicLayout";
import PrivateLayout from "./layout/PrivateLayout";
import ProtectedRoute from "./authTemp/ProtectedRoute";

import Home from "./pages/homePublic/Home";
import ClasesPage from "./pages/homePublic/ClasesPage";
import HorariosPage from "./pages/homePublic/HorariosPage";
import PreciosPage from "./pages/homePublic/PreciosPage";
import LoginPage from "./pages/auth/LoginPage";
import RegistroPage from "./pages/auth/RegistroPage";

import UsuarioListaPage from "./pages/usuario/UsuarioListaPage";
import UsuarioDetallePage from "./pages/usuario/UsuarioDetallePage";
import ClaseListaPage from "./pages/clases/ClaseListaPage";
import ClaseDetallePage from "./pages/clases/ClaseDetallePage";
import ReservaListaPage from "./pages/reserva/ReservaListaPage";
import PerfilPage from "./pages/perfil/PerfilPage";

import WodsPage from "./pages/WodsPage";
import ClasesAppPage from "./pages/clases/ClasesAppPage";
import DashboardAdminPage from "./pages/private/DashboardAdminPage";
import DashboardCoachPage from "./pages/private/DashboardCoachPage";
import DashboardUserPage from "./pages/private/DashboardUserPage";

export default function App() {
  return (
    <BrowserRouter>
      {/* NAVBAR ÚNICO */}
      <Navbar />

      <Routes>
        {/* ============================
            RUTAS PÚBLICAS
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
          {/* ✅ NUEVO: Dashboards */}
          <Route
            path="/dashboard-admin"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <DashboardAdminPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard-coach"
            element={
              <ProtectedRoute roles={["COACH"]}>
                <DashboardCoachPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard-user"
            element={
              <ProtectedRoute roles={["USER", "COACH", "ADMIN"]}>
                <DashboardUserPage />
              </ProtectedRoute>
            }
          />

          {/* ADMIN */}
          <Route
            path="/usuarios"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <UsuarioListaPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/pages"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <WodsPage />
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

          {/* ADMIN + COACH */}
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

          {/* USER + COACH + ADMIN */}
          <Route
            path="/reservas"
            element={
              <ProtectedRoute roles={["USER", "COACH", "ADMIN"]}>
                <ReservaListaPage />
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

            <Route
              path="/clases-app"
              element={
                <ProtectedRoute roles={["USER", "COACH", "ADMIN"]}>
                  <ClasesAppPage />
                </ProtectedRoute>
            }
          />

        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
