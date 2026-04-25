import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Form.css";

function AddNewUser() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
        date_of_birth: "",
        province: "",
        gender: "",
        facilitator_status: "No", // Helper state for the radio buttons
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const provinces = [
        "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal",
        "Limpopo", "Mpumalanga", "Northern Cape", "North West", "Western Cape"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            // Map the frontend state to the exact keys defined in your backend Serializer
            const payload = {
                username: formData.username,
                password: formData.password,
                email: formData.email,
                first_name: formData.first_name,
                last_name: formData.last_name,
                date_of_birth: formData.date_of_birth,
                province: formData.province,
                gender: formData.gender,
                facilitator: formData.facilitator_status === "Yes"
            };

            const res = await api.post("/api/user/register/", payload);

            if (res.status === 201 || res.status === 200) {
                setMessage("Success: User and Profile created successfully!");
                // Clear form or redirect
                setTimeout(() => navigate("/"), 2000);
            }
        } catch (error) {
            console.error(error);
            const errorData = error.response?.data;
            // Convert error object to string for display
            setMessage(`Validation Error: ${JSON.stringify(errorData)}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <div className="form-menu-links">
                <button className="link-btn" onClick={() => navigate("/")}>← Back to Home</button>
            </div>

            <form onSubmit={handleSubmit} className="user-form-content">
                <h2>Add New User</h2>
                <p>Register a new account and profile entry.</p>

                {message && (
                    <div className={`message-banner ${message.includes("Success") ? "success" : "error"}`}>
                        {message}
                    </div>
                )}

                {/* --- AUTHENTICATION FIELDS --- */}
                <input
                    className="form-input"
                    type="text"
                    placeholder="Username"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                />

                <input
                    className="form-input"
                    type="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />

                <input
                    className="form-input"
                    type="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />

                <hr style={{width: "100%", margin: "10px 0", border: "0.5px solid #eee"}} />

                {/* --- PROFILE DATA FIELDS (UserDetails Table) --- */}
                <input
                    className="form-input"
                    type="text"
                    placeholder="First Name"
                    required
                    value={formData.first_name}
                    onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                />

                <input
                    className="form-input"
                    type="text"
                    placeholder="Last Name"
                    required
                    value={formData.last_name}
                    onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                />

                <label className="form-label">Date of Birth</label>
                <input
                    className="form-input"
                    type="date"
                    required
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({...formData, date_of_birth: e.target.value})}
                />

                <label className="form-label">Province</label>
                <select
                    className="form-select"
                    required
                    value={formData.province}
                    onChange={(e) => setFormData({...formData, province: e.target.value})}
                >
                    <option value="">-- Select Province --</option>
                    {provinces.map((p) => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>

                <label className="form-label">Gender</label>
                <select
                    className="form-select"
                    required
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                >
                    <option value="">-- Select Gender --</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <label className="form-label">Is this user a Facilitator?</label>
                <div className="radio-group">
                    <label className="radio-option">
                        <input
                            type="radio"
                            name="facilitator"
                            value="Yes"
                            checked={formData.facilitator_status === "Yes"}
                            onChange={(e) => setFormData({...formData, facilitator_status: e.target.value})}
                        /> Yes
                    </label>
                    <label className="radio-option">
                        <input
                            type="radio"
                            name="facilitator"
                            value="No"
                            checked={formData.facilitator_status === "No"}
                            onChange={(e) => setFormData({...formData, facilitator_status: e.target.value})}
                        /> No
                    </label>
                </div>

                <button className="form-button" type="submit" disabled={loading}>
                    {loading ? "Processing..." : "Save New User"}
                </button>
            </form>
        </div>
    );
}

export default AddNewUser;