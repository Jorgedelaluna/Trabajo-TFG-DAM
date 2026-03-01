// pages/dashboard/Dashboard.jsx

import { useAuth } from "../../authTemp/AuthContext";
import UserDashboardContent from "./modules/UserDashboardContent";
import CoachDashboardContent from "./modules/CoachDashboardContent";
import AdminDashboardContent from "./modules/AdminDashboardContent";
import UserHeader from "../../components/home/UserHeader";

export default function Dashboard() {
  const { usuario } = useAuth();
  const rol = usuario?.rol;

  return (
    <div className="dashboard-container fade-in">

      <UserHeader title="Mi Panel" subtitle={`Bienvenido de nuevo, ${usuario?.nombre}`} />

      {/* Render dinámico según rol */}
      {rol === "USER" && <UserDashboardContent />}
      {rol === "COACH" && <CoachDashboardContent />}
      {rol === "ADMIN" && <AdminDashboardContent />}

    </div>
  );
}
