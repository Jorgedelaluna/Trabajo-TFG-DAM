import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../../../styles/Dashboard.css";
import API_URL from "../../../api/api";

export default function CoachDetallePage() {
    const { id } = useParams();
    const [coach, setCoach] = useState(null);

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await axios.get(`${API_URL}/coaches/${id}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setCoach(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        cargar();
    }, [id]);

    if (!coach) {
        return (
            <div className="admin-dashboard-container">
                <div className="dashboard-card p-4 text-center">
                    <h3>Cargando coach...</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard-container">
            <h1 className="fw-bold mb-4">Detalle del Coach</h1>

            <div className="dashboard-card p-4">
                <p><strong>Nombre:</strong> {coach.nombre}</p>
                <p><strong>Email:</strong> {coach.email}</p>
                <p><strong>Descripción:</strong> {coach.descripcion}</p>
                <p><strong>Certificaciones:</strong> {coach.certificaciones}</p>

                <Link to="/admin/coaches" className="btn btn-secondary mt-3">
                    Volver
                </Link>
            </div>
        </div>
    );
}