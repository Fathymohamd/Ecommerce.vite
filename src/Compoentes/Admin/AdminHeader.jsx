
import React from "react";
import { useSelector } from "react-redux";
import { FaBell } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

function AdminHeader() {
  const user = useSelector((state) => state.auth.user);
  const { t } = useTranslation();

  return (
    <header className="admin-header">
      <div>
        <h2>{t("adminHeader.title")}</h2>
        <p>
          {t("adminHeader.welcome")} {user?.name} 👋
        </p>
      </div>

      <div className="admin-header-right">
        {/* <button className="admin-notification-btn">
          <FaBell />
          <span>{user?.length || 2}</span>
        </button> */}

        <div className="admin-profile">
          <div className="admin-avatar">
            {user?.name?.[0]}
          </div>

          <div>
            <strong>{user?.name}</strong>
            <small>{t("adminHeader.administrator")}</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
