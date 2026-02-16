
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import ProtectedRoute from "../authTemp/ProtectedRoute";

export default function PrivateLayout() {
  return (
    <ProtectedRoute>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ marginTop: "80px", padding: "20px", width: "100%" }}>
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
}
