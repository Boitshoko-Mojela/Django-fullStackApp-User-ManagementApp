import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Form.css";

function EditUser() {
    const { id } = useParams(); // Gets the ID from the URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ first_name: "", last_name: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch current data to pre-fill the form
        api.get(`/api/users/detail/${id}/`)
            .then((res) => setFormData({
                first_name: res.data.first_name,
                last_name: res.data.last_name
            }))
            .catch(() => setMessage("Error: Could not fetch user data."));
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // PATCH allows us to update only specific fields
            await api.patch(`/api/users/update/${id}/`, formData);
            setMessage("Success: User details updated successfully!");
            setTimeout(() => navigate("/manage"), 2000);
        } catch (error) {
            setMessage(`Update Failed: ${JSON.stringify(error.response?.data)}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <div className="dashboard-menu">
                <button onClick={() => navigate("/")}>Home</button>
                <button onClick={() => navigate("/manage")}>Back to Manage</button>
            </div>

            <form onSubmit={handleUpdate} className="user-form-content">
                <h2>Edit User Details</h2>
                {message && <div className={`message-banner ${message.includes("Success") ? "success" : "error"}`}>{message}</div>}

                <label className="form-label">First Name</label>
                <input
                    className="form-input"
                    type="text"
                    required
                    value={formData.first_name}
                    onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                />

                <label className="form-label">Last Name</label>
                <input
                    className="form-input"
                    type="text"
                    required
                    value={formData.last_name}
                    onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                />

                <button className="form-button" type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update User"}
                </button>
            </form>
        </div>
    );
}

export default EditUser;