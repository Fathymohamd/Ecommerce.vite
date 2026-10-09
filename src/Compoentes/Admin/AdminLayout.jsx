import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { useSelector } from "react-redux";
function AdminLayout() {
  const darkMode = useSelector((state) => state.darkMode);
  return (
    <div className={`admin-layout ${darkMode ? "dark-mode" : "light-mode"}`}>
      <AdminSidebar />

      <div className="admin-main">
        <AdminHeader />

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;