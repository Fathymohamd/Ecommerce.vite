import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUser } from "../../Redux/getUsers";

function AdminUsers() {
  const users = useSelector((state) => state.gitUser.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

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
                <tr key={user._id}>
                  <td>
                    <strong>{user.name}</strong>
                  </td>

                  <td>{user.email}</td>

                  <td>
                    <span className="admin-role-badge">
                      {user.role}
                    </span>
                  </td>

                  <td>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td>
                    <div className="admin-table-actions">
                    {/*   <button className="admin-edit-btn">
                        Edit
                      </button> */}

                      <button
                        className="admin-delete-btn"
                        onClick={() => {
                        

                          dispatch(deleteUser(user._id));
                        }}
                      >
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