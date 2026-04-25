import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Form.css";

function DeleteUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        api.get(`/api/users/detail/${id}/`)
            .then((res) => setUser(res.data))
            .catch(() => navigate("/manage"));
    }, [id, navigate]);

    const handleDelete = async () => {
        try {
            await api.delete(`/api/users/delete/${id}/`);
            alert("User deleted successfully.");
            navigate("/manage");
        } catch (error) {
            alert("Error deleting user.");
        }
    };

    if (!user) return <div className="form-container">Loading...</div>;

    return (
        <div className="form-container">
            <div className="dashboard-menu">
                <button onClick={() => navigate("/")}>Home</button>
                <button onClick={() => navigate("/manage")}>Back to Manage</button>
            </div>

            <div className="user-form-content delete-card">
                <h2>Delete User</h2>
                <p>Are you sure you want to delete this user?</p>

                <div className="user-info-display">
                    <strong>Target User:</strong> {user.first_name} {user.last_name}
                </div>

                <div className="button-group" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button className="form-button" style={{ backgroundColor: '#ef4444' }} onClick={handleDelete}>
                        Yes, Delete
                    </button>
                    <button className="form-button" style={{ backgroundColor: '#64748b' }} onClick={() => navigate("/manage")}>
                        No, Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteUser;