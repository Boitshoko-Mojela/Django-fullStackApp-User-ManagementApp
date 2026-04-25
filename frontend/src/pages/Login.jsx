import Form from "../components/Form"

function Login() {
    // Change the route from "/api/user/login/" to "/api/token/"
    return <Form route="/api/token/" method="login" />
}

export default Login