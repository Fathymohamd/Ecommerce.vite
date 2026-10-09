
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUser } from "../../Redux/getUsers";
import { useTranslation } from "react-i18next";

function AdminUsers() {
  const users = useSelector((state) => state.gitUser.users);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div>
      <div className="admin-page-title">
        <h1>{t("adminUsers.title")}</h1>
        <p>{t("adminUsers.description")}</p>
      </div>

      <div className="admin-dashboard-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>{t("adminUsers.name")}</th>
                <th>{t("adminUsers.email")}</th>
                <th>{t("adminUsers.role")}</th>
                <th>{t("adminUsers.joinedDate")}</th>
                <th>{t("adminUsers.actions")}</th>
              </tr>
            </thead>

            <tbody>
              {users?.map((user) => (
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
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "—"}
                  </td>

                  <td>
                    <div className="admin-table-actions">
                      <button
                        type="button"
                        className="admin-delete-btn"
                        onClick={() => dispatch(deleteUser(user._id))}
                      >
                        {t("adminUsers.delete")}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {(!users || users.length === 0) && (
                <tr>
                  <td colSpan="5" className="admin-empty-message">
                    {t("adminUsers.noUsers")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
