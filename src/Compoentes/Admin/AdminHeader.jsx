import React from "react";
import {useSelector} from 'react-redux'
import { FaBell } from "react-icons/fa6";

function AdminHeader() {
const user = useSelector((state) => state.auth.user);
  return (
    <header className="admin-header">
      <div>
        <h2>Admin Dashboard</h2>
        <p>Welcome back, {user?.name} 👋</p>
      </div>

      <div className="admin-header-right">
     {/*    <button className="admin-notification-btn">
          <FaBell />
          <span>{user?.length || 2}</span>
        </button> */}

        <div className="admin-profile">
          <div className="admin-avatar">
           {user?.name[0]} 
          </div>

          <div>
            <strong>{user?.name}</strong>
            <small>Administrator</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;