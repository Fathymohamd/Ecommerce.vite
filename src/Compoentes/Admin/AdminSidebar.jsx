
import { NavLink } from "react-router-dom";
import { getMe, logout } from "../../Redux/authSlice";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { updateProfile } from "../../Redux/settingsRedux";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
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
    const  dispatch  = useDispatch();

  const [error , setErrors] = useState("")
  const [successMessage , setSuccessMessage] = useState("")

    useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch("https://ecommerce-vite-two.vercel.app/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        dispatch(logout());
      }

      setShowLogoutModal();
    } catch (error) {
      console.log(error);
    }
  };

  const settings = useSelector((state) => state.settings.setting);
  return (
    <aside className="admin-sidebar">

      {/* Logo */}
      <div className="admin-logo">
        <FaCartShopping size={20} /> <span>{settings?.setting || <> <span>MyShop Admin </span></> }</span>
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
          <span >Settings</span>
        </NavLink>

      </nav>

      {/* Logout */}
      <button className="admin-logout">
        <FaArrowRightFromBracket />
        <span onClick={handleDeleteAccount}>Logout</span>
      </button>

    </aside>
  );
}

export default AdminSidebar;