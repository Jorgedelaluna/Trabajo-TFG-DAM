/**
 * ============================================
 *  APP PRINCIPAL: App.jsx
 * 
 *  - Define todas las rutas públicas y privadas de la aplicación.
 *  - Aplica los layouts correspondientes (público, usuario, admin).
 *  - Protege rutas según el rol del usuario mediante ProtectedRoute.
 *  - Navbar y Footer se cargan de forma global.
 * ============================================
 */

import "./styles/Global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Componentes globales
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Layouts
import PublicLayout from "./layout/PublicLayout";
import PrivateLayout from "./layout/PrivateLayout";
import CoachLayout from "./layout/CoachLayout";
import AdminLayout from "./layout/AdminLayout";
import ProtectedRoute from "./auth/ProtectedRoute";

// Páginas públicas
import Home from "./pages/public/Home";
import ClasesPage from "./pages/public/ClasesPage";
import HorariosPage from "./pages/public/HorariosPage";
import PreciosPage from "./pages/public/PreciosPage";

// Loginy registro
import LoginPage from "./auth/LoginPage";
import RegistroPage from "./auth/RegistroPage";

// Dashboards
import PanelRedirect from "./pages/PanelRedirect";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CoachDashboard from "./pages/coach/CoachDashboard";

// Páginas privadas USER (USUARIO)
import ClasesUsuarioPage from "./pages/user/ClasesUsuarioPage";
import MisReservasPage from "./pages/user/MisReservasPage";
import PerfilPage from "./pages/user/PerfilPage";
import ReservasPage from "./pages/user/reservas/ReservasPage";

// CLASES (ADMIN)
import ClaseListaPage from "./pages/admin/clases/ClaseListaPage";
import ClaseDetallePage from "./pages/admin/clases/ClaseDetallePage";
import ClaseNuevaPage from "./pages/admin/clases/ClaseNuevaPage";

// CLASES (COACH)
import CoachClaseListaPage from "./pages/coach/clases/CoachClaseListaPage";
import CoachClaseDetallePage from "./pages/coach/clases/CoachClaseDetallePage";

// ACTIVIDADES (ADMIN)
import ActividadListaPage from "./pages/admin/actividades/ActividadListaPage";
import ActividadNuevaPage from "./pages/admin/actividades/ActividadNuevaPage";
import ActividadDetallePage from "./pages/admin/actividades/ActividadDetallePage";

// COACHES (ADMIN)
import CoachListaPage from "./pages/admin/coach/CoachListaPage";
import CoachDetallePage from "./pages/admin/coach/CoachDetallePage";

// USUARIOS (ADMIN)
import UsuarioListaPage from "./pages/admin/usuarios/UsuarioListaPage";
import UsuarioDetallePage from "./pages/admin/usuarios/UsuarioDetallePage";


export default function App() {
    return (
        <BrowserRouter>

            {/* NAVBAR GLOBAL PARA TODAS LAS PAGINAS */}
            <Navbar />

            <Routes>

                {/* ============================
            RUTAS PÚBLICAS (NO REQUIEREN AUTENTICACIÓN)
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
            RUTAS PÚBLICAS (NO REQUIEREN AUTENTICACIÓN)
        ============================ */}
                <Route path="/panel" element={<PanelRedirect />} />


                {/* ============================
            RUTAS PRIVADAS (USUARIO LOGUEADO)
            - Acceso permitido a USER, COACH y ADMIN
            - Usa PrivateLayout (sidebar de usuario)
        ============================ */}
                <Route
                    element={
                        <ProtectedRoute roles={["ADMIN", "COACH", "USER"]}>
                            <PrivateLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/user/dashboard" element={<UserDashboard />} />
                    <Route path="/user/clases" element={<ClasesUsuarioPage />} />
                    <Route path="/user/reservas" element={<MisReservasPage />} />
                    <Route path="/user/perfil" element={<PerfilPage />} />
                </Route>


                {/* ============================================================
            RUTAS COACH (SOLO COACH)
            - Usa el mismo layout que admin o uno propio si lo deseas
        ============================================================ */}
                <Route
                    element={
                        <ProtectedRoute roles={["COACH"]}>
                            <CoachLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/coach/dashboard" element={<CoachDashboard />} />
                    <Route path="/coach/clases" element={<CoachClaseListaPage />} />
                    <Route path="/coach/clases/:id" element={<CoachClaseDetallePage />} />
                </Route>


                {/* ============================
            RUTAS ADMIN (SOLO ADMIN)
            - Usa AdminLayout (sidebar de administrador)
        ============================ */}
                <Route
                    element={
                        <ProtectedRoute roles={["ADMIN"]}>
                            <AdminLayout />   {/* EL SIDEBAR */}
                        </ProtectedRoute>
                    }
                >
                    {/* Dashboard */}
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />

                    {/* Usuarios */}
                    <Route path="/admin/usuarios" element={<UsuarioListaPage />} />
                    <Route path="/admin/usuarios/:id" element={<UsuarioDetallePage />} />

                    {/* Clases */}
                    <Route path="/admin/clases" element={<ClaseListaPage />} />
                    <Route path="/admin/clases/nueva" element={<ClaseNuevaPage />} />
                    <Route path="/admin/clases/:id" element={<ClaseDetallePage />} />

                    {/* Actividades */}
                    <Route path="/admin/actividades" element={<ActividadListaPage />} />
                    <Route path="/admin/actividades/nueva" element={<ActividadNuevaPage />} />
                    <Route path="/admin/actividades/:id" element={<ActividadDetallePage />} />

                    {/* Coaches */}
                    <Route path="/admin/coaches" element={<CoachListaPage />} />
                    <Route path="/admin/coaches/:id" element={<CoachDetallePage />} />

                </Route>

            </Routes>

            {/* FOOTER GLOBAL */}
            <Footer />

        </BrowserRouter>
    );
}
