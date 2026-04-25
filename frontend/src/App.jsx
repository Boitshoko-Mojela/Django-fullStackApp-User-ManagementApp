import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import Logout from "./pages/Logout.jsx"
import AddNewUser from "./pages/AddNewUser"
import ManageUser from "./pages/ManageUser"
import EditUser from "./pages/EditUser"
import DeleteUser from "./pages/DeleteUser";


function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The Home Page */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* The Add Page - Keep it separate! */}
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddNewUser />
            </ProtectedRoute>
          }
        />

        {/* The Manage Page - Keep it separate! */}
        <Route
          path="/manage"
          element={
            <ProtectedRoute>
              <ManageUser />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
          <Route path="/edit/:id" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
        <Route path="/delete/:id" element={<ProtectedRoute><DeleteUser /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
export default App