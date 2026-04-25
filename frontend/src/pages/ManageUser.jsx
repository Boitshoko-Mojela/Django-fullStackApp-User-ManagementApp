import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/ManageUser.css";

function ManageUser() {
    const [users, setUsers] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'first_name', direction: 'ascending' });
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        api.get("/api/users/all/")
            .then((res) => setUsers(res.data))
            .catch((err) => alert("Error fetching users: " + err));
    };

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        const sortedUsers = [...users].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });
        setUsers(sortedUsers);
    };

    const exportToWord = () => {
        let tableHtml = `
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th><th>Date of Birth</th><th>Province</th><th>Gender</th><th>Facilitator</th>
                    </tr>
                </thead>
                <tbody>
                    ${users.map(u => `
                        <tr>
                            <td>${u.first_name} ${u.last_name}</td>
                            <td>${u.date_of_birth}</td>
                            <td>${u.province}</td>
                            <td>${u.gender}</td>
                            <td>${u.facilitator ? 'Yes' : 'No'}</td>
                        </tr>`).join('')}
                </tbody>
            </table>`;

        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + tableHtml + footer;

        const blob = new Blob(['\ufeff', sourceHTML], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'UserList.doc';
        link.click();
    };

    return (
        <div className="manage-container">
            <div className="dashboard-menu">
                <button onClick={() => navigate("/")}>Dashboard Home</button>
                <button onClick={() => navigate("/add")}>Add User</button>
                <button className="active">Manage Users</button>
                <button onClick={exportToWord} className="word-btn">MS Word Export</button>
            </div>

            <div className="grid-wrapper">
                <table className="user-grid">
                    <thead>
                        <tr>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th onClick={() => sortData('first_name')}>Name ↕</th>
                            <th onClick={() => sortData('date_of_birth')}>Date of Birth ↕</th>
                            <th onClick={() => sortData('province')}>Province ↕</th>
                            <th onClick={() => sortData('gender')}>Gender ↕</th>
                            <th onClick={() => sortData('facilitator')}>Facilitator ↕</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.userdetails_id}>
                                <td>
                                    <button
                                        className="edit-btn"
                                        onClick={() => navigate(`/edit/${user.userdetails_id}`)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="delete-btn"
                                        onClick={() => navigate(`/delete/${user.userdetails_id}`)}
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td>{user.first_name} {user.last_name}</td>
                                <td>{user.date_of_birth}</td>
                                <td>{user.province}</td>
                                <td>{user.gender}</td>
                                <td>{user.facilitator ? "Yes" : "No"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageUser;