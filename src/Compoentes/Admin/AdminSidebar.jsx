import { NavLink } from "react-router-dom";
import { getMe, logout } from "../../Redux/authSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  FaBoxOpen,
  FaCartShopping,
  FaUsers,
  FaGear,
  FaHouse,
  FaPlus,
  FaArrowRightFromBracket,
} from "react-icons/fa6";

function AdminSidebar() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch(
        "https://ecommerce-vite-two.vercel.app/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (res.ok) {
        dispatch(logout());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const settings = useSelector((state) => state.settings.setting);

  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        <FaCartShopping size={20} />
        <span>{settings?.setting || t("adminSidebar.logo")}</span>
      </div>

      <nav className="admin-nav">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            isActive ? "admin-link admin-active" : "admin-link"
          }
        >
          <FaHouse />
          <span>{t("adminSidebar.dashboard")}</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive ? "admin-link admin-active" : "admin-link"
          }
        >
          <FaBoxOpen />
          <span>{t("adminSidebar.products")}</span>
        </NavLink>

        <NavLink
          to="/admin/products/add"
          className={({ isActive }) =>
            isActive ? "admin-link admin-active" : "admin-link"
          }
        >
          <FaPlus />
          <span>{t("adminSidebar.addProduct")}</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive ? "admin-link admin-active" : "admin-link"
          }
        >
          <FaCartShopping />
          <span>{t("adminSidebar.orders")}</span>
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive ? "admin-link admin-active" : "admin-link"
          }
        >
          <FaUsers />
          <span>{t("adminSidebar.users")}</span>
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            isActive ? "admin-link admin-active" : "admin-link"
          }
        >
          <FaGear />
          <span>{t("adminSidebar.settings")}</span>
        </NavLink>
      </nav>

      <button className="admin-logout" onClick={handleDeleteAccount}>
        <FaArrowRightFromBracket />
        <span>{t("adminSidebar.logout")}</span>
      </button>
    </aside>
  );
}

export default AdminSidebar;