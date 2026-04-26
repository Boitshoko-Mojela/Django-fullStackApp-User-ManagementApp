import Form from "../components/Form";
import { Link } from "react-router-dom";

function Register() {
    return (
        <div className="auth-page-container">
            <div className="auth-card">
                {/* The main registration form logic */}
                <Form route="/api/user/register/" method="register" />

                {/* The professional footer link */}
                <div className="auth-footer">
                    <p>
                        Already have an account?
                        <Link to="/login" className="auth-link"> Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;