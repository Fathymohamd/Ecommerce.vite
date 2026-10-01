import React from "react";

function AdminUsers() {
  const users = [
    {
      id: 1,
      name: "Ahmed Mohamed",
      email: "ahmed@example.com",
      role: "User",
      date: "Sep 20, 2026",
    },
    {
      id: 2,
      name: "Sara Ahmed",
      email: "sara@example.com",
      role: "User",
      date: "Sep 18, 2026",
    },
    {
      id: 3,
      name: "Mohamed Ali",
      email: "mohamed@example.com",
      role: "Admin",
      date: "Sep 15, 2026",
    },
  ];

  return (
    <div>
      <div className="admin-page-title">
        <h1>Users</h1>
        <p>Manage website users</p>
      </div>

      <div className="admin-dashboard-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <strong>{user.name}</strong>
                  </td>

                  <td>{user.email}</td>

                  <td>
                    <span className="admin-role-badge">
                      {user.role}
                    </span>
                  </td>

                  <td>{user.date}</td>

                  <td>
                    <div className="admin-table-actions">
                      <button className="admin-edit-btn">
                        Edit
                      </button>

                      <button className="admin-delete-btn">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;