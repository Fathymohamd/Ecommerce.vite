import React, { useState } from "react";

function AdminSettings() {
  const [adminName, setAdminName] = useState("Admin");

  const [email, setEmail] = useState("admin@example.com");

  const [storeName, setStoreName] = useState("MyShop");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Settings saved successfully");
  };

  return (
    <div>
      {/* Page Title */}
      <div className="admin-page-title">
        <h1>Settings</h1>
        <p>Manage your account and website settings</p>
      </div>

      {/* Settings */}
      <div className="admin-settings-grid">

        {/* Admin Profile */}
        <div className="admin-form-card">
          <h2>Admin Profile</h2>

          <form onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label>Name</label>

              <input
                value={adminName}
                onChange={(e) =>
                  setAdminName(e.target.value)
                }
              />
            </div>

            <div className="admin-form-group">
              <label>Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            <button className="admin-primary-btn">
              Save Profile
            </button>
          </form>
        </div>

        {/* Website Settings */}
        <div className="admin-form-card">
          <h2>Website Settings</h2>

          <form onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label>Store Name</label>

              <input
                value={storeName}
                onChange={(e) =>
                  setStoreName(e.target.value)
                }
              />
            </div>

            <div className="admin-form-group">
              <label>Currency</label>

              <select>
                <option>EGP</option>
                <option>USD</option>
              </select>
            </div>

            <button className="admin-primary-btn">
              Save Settings
            </button>
          </form>
        </div>

      </div>

      {/* Logout */}
      <div className="admin-logout-section">
        <h2>Logout</h2>

        <p>Logout from the admin account.</p>

        <button className="admin-logout-danger">
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminSettings;