
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function PrivateLayout() {
  return (
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ marginTop: "80px", padding: "20px", width: "100%" }}>
          <Outlet />
        </main>
      </div>
  );
}
