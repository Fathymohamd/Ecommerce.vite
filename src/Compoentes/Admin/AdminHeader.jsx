import React from "react";

import { FaBell } from "react-icons/fa6";

function AdminHeader() {
  return (
    <header className="admin-header">
      <div>
        <h2>Admin Dashboard</h2>
        <p>Welcome back, Admin 👋</p>
      </div>

      <div className="admin-header-right">
        <button className="admin-notification-btn">
          <FaBell />
          <span>3</span>
        </button>

        <div className="admin-profile">
          <div className="admin-avatar">
            A
          </div>

          <div>
            <strong>Admin</strong>
            <small>Administrator</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;