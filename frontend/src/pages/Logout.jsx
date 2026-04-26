import { Navigate } from "react-router-dom";

function Logout() {
    // 1. Clear tokens to secure the session
    localStorage.clear();

    // 2. Redirect the user to the login page immediately
    return <Navigate to="/login" />;
}

export default Logout;