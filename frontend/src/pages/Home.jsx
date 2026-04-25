import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="home-card">
                <div className="brand-icon">🚀</div>
                <h1>Mojela Systems</h1>
                <p className="subtitle">Enterprise User Management Dashboard</p>

                <div className="menu-options">
                    <button className="nav-btn btn-secondary" onClick={() => navigate("/")}>
                        Dashboard Home
                    </button>
                    <button className="nav-btn btn-primary" onClick={() => navigate("/add")}>
                        + Add New User
                    </button>
                    <button className="nav-btn btn-secondary" onClick={() => navigate("/manage")}>
                        ⚙️ Manage Users
                    </button>
                    <button className="nav-btn btn-outline-danger" onClick={() => navigate("/logout")}>
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;