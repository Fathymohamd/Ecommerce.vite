import React from "react";

import { NavLink } from "react-router-dom";

import {
  FaHouse,
  FaBoxOpen,
  FaCartShopping,
  FaUsers,
  FaGear,
  FaPlus,
  FaArrowRightFromBracket,
} from "react-icons/fa6";

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">

      {/* Logo */}
      <div className="admin-logo">
        🛒 <span>MyShop Admin</span>
      </div>

      {/* Navigation */}
      <nav className="admin-nav">

        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            isActive
              ? "admin-link admin-active"
              : "admin-link"
          }
        >
          <FaHouse />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "admin-link admin-active"
              : "admin-link"
          }
        >
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/admin/products/add"
          className={({ isActive }) =>
            isActive
              ? "admin-link admin-active"
              : "admin-link"
          }
        >
          <FaPlus />
          <span>Add Product</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "admin-link admin-active"
              : "admin-link"
          }
        >
          <FaCartShopping />
          <span>Orders</span>
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "admin-link admin-active"
              : "admin-link"
          }
        >
          <FaUsers />
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            isActive
              ? "admin-link admin-active"
              : "admin-link"
          }
        >
          <FaGear />
          <span>Settings</span>
        </NavLink>

      </nav>

      {/* Logout */}
      <button className="admin-logout">
        <FaArrowRightFromBracket />
        <span>Logout</span>
      </button>

    </aside>
  );
}

export default AdminSidebar;