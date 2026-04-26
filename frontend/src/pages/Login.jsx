import Form from "../components/Form";
import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="auth-page-container">
            <div className="auth-card">
                <Form route="/api/token/" method="login" />
                <div className="auth-footer">
                    <p>
                        Don't have an account?
                        <Link to="/register" className="auth-link"> Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;